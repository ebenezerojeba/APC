// src/controllers/memberController.js
import { query, getClient } from '../db/pool.js'
import { normalizeNigerianPhone } from '../utils/phone.js'
import { sendWelcomeEmail } from '../utils/email.js'
import logger from '../utils/logger.js'
import { Parser } from 'json2csv'
const VALID_LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
];

const VALID_INTERESTS = ['Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC'];

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/members/register
// Public endpoint — rate limited at the router level
// ─────────────────────────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  const {
    firstName, lastName, email, phone,
    lga, ward, interests = [], message, referralSource
  } = req.body;

  // Normalize phone for deduplication
  const phoneNormalized = normalizeNigerianPhone(phone);
  if (!phoneNormalized) {
    return res.status(422).json({ 
      success: false, 
      message: 'Invalid Nigerian phone number. Please use format 0812 345 6789.' 
    });
  }

  // Validate LGA
  if (!VALID_LGAS.includes(lga)) {
    return res.status(422).json({ success: false, message: 'Invalid LGA selected' });
  }

  // Validate interests
  const validInterests = interests.filter(i => VALID_INTERESTS.includes(i));

  const client = await getClient();
  try {
    await client.query('BEGIN');

    // ── Deduplication check ──────────────────────────────────────────────────
    const dupCheck = await client.query(
      `SELECT id, status, phone_normalized, email FROM members 
       WHERE phone_normalized = $1 OR (email IS NOT NULL AND email = $2)`,
      [phoneNormalized, email || null]
    );

    if (dupCheck.rows.length > 0) {
      const existing = dupCheck.rows[0];
      await client.query('ROLLBACK');
      logger.info('Duplicate registration attempt', { phoneNormalized, lga });
      return res.status(409).json({
        success: false,
        message: 'A registration with this phone number or email already exists. Our team will contact you shortly.',
        // Don't expose internal member ID publicly
      });
    }

    // ── Insert member ────────────────────────────────────────────────────────
    const memberResult = await client.query(
      `INSERT INTO members 
         (first_name, last_name, email, phone, phone_normalized, lga, ward, message, 
          status, ip_address, user_agent, referral_source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9::inet, $10, $11)
       RETURNING id, first_name, last_name, lga, status, registered_at`,
      [
        firstName.trim(),
        lastName.trim(),
        email?.trim().toLowerCase() || null,
        phone.trim(),
        phoneNormalized,
        lga,
        ward?.trim() || null,
        message?.trim() || null,
        req.ip,
        req.headers['user-agent']?.substring(0, 200) || null,
        referralSource || null,
      ]
    );

    const member = memberResult.rows[0];

    // ── Insert interests ─────────────────────────────────────────────────────
    if (validInterests.length > 0) {
      const interestValues = validInterests
        .map((_, i) => `($1, $${i + 2}::interest_type)`)
        .join(', ');
      await client.query(
        `INSERT INTO member_interests (member_id, interest) VALUES ${interestValues}
         ON CONFLICT (member_id, interest) DO NOTHING`,
        [member.id, ...validInterests]
      );
    }

    await client.query('COMMIT');

    // ── Post-registration side effects (async, non-blocking) ─────────────────
    if (email) {
      sendWelcomeEmail({ email, firstName: firstName.trim(), lga }).catch(() => {});
    }

    logger.info('New member registered', { memberId: member.id, lga, interests: validInterests });

    return res.status(201).json({
      success: true,
      message: `Registration successful! Welcome to Lagos APC, ${firstName}. A party representative from ${lga} LGA will contact you soon.`,
      data: {
        id: member.id,
        registeredAt: member.registered_at,
      },
    });

  } catch (err) {
    await client.query('ROLLBACK');
    logger.error('Member registration error', { error: err.message, stack: err.stack });
    return res.status(500).json({ 
      success: false, 
      message: 'Registration failed. Please try again or contact support.' 
    });
  } finally {
    client.release();
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/admin/members
// Protected: super_admin, lga_admin, viewer
// ─────────────────────────────────────────────────────────────────────────────
exports.listMembers = async (req, res) => {
  const {
    page = 1,
    limit = 25,
    search = '',
    lga,
    status,
    interest,
    sortBy = 'registered_at',
    sortDir = 'DESC',
    dateFrom,
    dateTo,
  } = req.query;

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  // LGA scope enforcement for lga_admin role
  const effectiveLga = req.lgaFilter || lga;

  // Whitelist sort columns to prevent injection
  const SORTABLE = ['registered_at', 'first_name', 'last_name', 'lga', 'status'];
  const safeSortBy = SORTABLE.includes(sortBy) ? sortBy : 'registered_at';
  const safeSortDir = sortDir.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  // Build dynamic WHERE clause
  const conditions = [];
  const params = [];
  let paramIdx = 1;

  if (search) {
    conditions.push(`(first_name || ' ' || last_name) ILIKE $${paramIdx++}`);
    params.push(`%${search}%`);
  }
  if (effectiveLga) {
    conditions.push(`lga = $${paramIdx++}`);
    params.push(effectiveLga);
  }
  if (status) {
    conditions.push(`status = $${paramIdx++}::member_status`);
    params.push(status);
  }
  if (dateFrom) {
    conditions.push(`registered_at >= $${paramIdx++}`);
    params.push(new Date(dateFrom));
  }
  if (dateTo) {
    conditions.push(`registered_at <= $${paramIdx++}`);
    params.push(new Date(dateTo));
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Interest filter via subquery (avoids row duplication from JOIN)
  let interestSubquery = '';
  if (interest && VALID_INTERESTS.includes(interest)) {
    interestSubquery = `AND m.id IN (
      SELECT member_id FROM member_interests WHERE interest = $${paramIdx++}::interest_type
    )`;
    params.push(interest);
  }

  try {
    const [membersResult, countResult] = await Promise.all([
      query(
        `SELECT 
           m.id, m.first_name, m.last_name, m.email, m.phone, m.lga, m.ward,
           m.status, m.registered_at, m.updated_at, m.verified_at,
           COALESCE(
             json_agg(mi.interest ORDER BY mi.interest) FILTER (WHERE mi.interest IS NOT NULL),
             '[]'
           ) AS interests
         FROM members m
         LEFT JOIN member_interests mi ON mi.member_id = m.id
         ${whereClause} ${interestSubquery}
         GROUP BY m.id
         ORDER BY m.${safeSortBy} ${safeSortDir}
         LIMIT $${paramIdx++} OFFSET $${paramIdx++}`,
        [...params, limitNum, offset]
      ),
      query(
        `SELECT COUNT(*) FROM members m ${whereClause} ${interestSubquery}`,
        params.slice(0, interest ? -1 : undefined) // don't double-add interest param for count
      ),
    ]);

    const total = parseInt(countResult.rows[0].count);

    return res.json({
      success: true,
      data: {
        members: membersResult.rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
          hasNext: pageNum * limitNum < total,
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (err) {
    logger.error('List members error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Failed to fetch members' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/admin/members/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.getMember = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `SELECT m.*, 
         COALESCE(
           json_agg(mi.interest ORDER BY mi.interest) FILTER (WHERE mi.interest IS NOT NULL),
           '[]'
         ) AS interests,
         u.full_name AS verified_by_name
       FROM members m
       LEFT JOIN member_interests mi ON mi.member_id = m.id
       LEFT JOIN admin_users u ON u.id = m.verified_by
       WHERE m.id = $1
       GROUP BY m.id, u.full_name`,
      [id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // Enforce LGA scope
    if (req.lgaFilter && result.rows[0].lga !== req.lgaFilter) {
      return res.status(403).json({ success: false, message: 'Access denied to this member' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    logger.error('Get member error', { error: err.message, id });
    return res.status(500).json({ success: false, message: 'Failed to fetch member' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/v1/admin/members/:id/status
// ─────────────────────────────────────────────────────────────────────────────
exports.updateMemberStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const VALID_STATUSES = ['pending', 'active', 'verified', 'suspended', 'duplicate'];
  if (!VALID_STATUSES.includes(status)) {
    return res.status(422).json({ success: false, message: 'Invalid status value' });
  }

  try {
    const setVerified = status === 'verified'
      ? ', verified_at = NOW(), verified_by = $4'
      : '';
    
    const params = status === 'verified'
      ? [status, notes || null, id, req.admin.id]
      : [status, notes || null, id];

    const result = await query(
      `UPDATE members 
       SET status = $1::member_status, notes = COALESCE($2, notes) ${setVerified}
       WHERE id = $3
       RETURNING id, status, notes, updated_at`,
      params
    );

    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    return res.json({ success: true, data: result.rows[0], message: 'Status updated' });
  } catch (err) {
    logger.error('Update status error', { error: err.message, id });
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/v1/admin/members/:id
// Only super_admin
// ─────────────────────────────────────────────────────────────────────────────
exports.deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      'DELETE FROM members WHERE id = $1 RETURNING id, first_name, last_name',
      [id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    logger.info('Member deleted', { memberId: id, adminId: req.admin.id });
    return res.json({ success: true, message: 'Member deleted successfully' });
  } catch (err) {
    logger.error('Delete member error', { error: err.message, id });
    return res.status(500).json({ success: false, message: 'Failed to delete member' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/admin/members/export/csv
// ─────────────────────────────────────────────────────────────────────────────
exports.exportCsv = async (req, res) => {
  const { lga, status, dateFrom, dateTo } = req.query;
  const effectiveLga = req.lgaFilter || lga;

  const conditions = [];
  const params = [];
  let idx = 1;

  if (effectiveLga) { conditions.push(`m.lga = $${idx++}`); params.push(effectiveLga); }
  if (status) { conditions.push(`m.status = $${idx++}::member_status`); params.push(status); }
  if (dateFrom) { conditions.push(`m.registered_at >= $${idx++}`); params.push(new Date(dateFrom)); }
  if (dateTo) { conditions.push(`m.registered_at <= $${idx++}`); params.push(new Date(dateTo)); }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const result = await query(
      `SELECT 
         m.first_name, m.last_name, m.email, m.phone, m.lga, m.ward,
         m.status, m.registered_at,
         STRING_AGG(mi.interest::TEXT, ', ' ORDER BY mi.interest) AS interests
       FROM members m
       LEFT JOIN member_interests mi ON mi.member_id = m.id
       ${where}
       GROUP BY m.id
       ORDER BY m.registered_at DESC`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'No records to export' });
    }

    const fields = [
      { label: 'First Name', value: 'first_name' },
      { label: 'Last Name', value: 'last_name' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'LGA', value: 'lga' },
      { label: 'Ward', value: 'ward' },
      { label: 'Interests', value: 'interests' },
      { label: 'Status', value: 'status' },
      { label: 'Registered At', value: 'registered_at' },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(result.rows);

    const filename = `lagos-apc-members-${new Date().toISOString().split('T')[0]}.csv`;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(csv);

  } catch (err) {
    logger.error('CSV export error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Export failed' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/admin/analytics
// ─────────────────────────────────────────────────────────────────────────────
exports.getAnalytics = async (req, res) => {
  const effectiveLga = req.lgaFilter;

  try {
    const [overview, lgaBreakdown, registrationTrend, interestBreakdown] = await Promise.all([
      // Overview stats
      effectiveLga
        ? query(
            `SELECT 
               COUNT(*) AS total_members,
               COUNT(*) FILTER (WHERE status = 'active') AS active_members,
               COUNT(*) FILTER (WHERE status = 'pending') AS pending_members,
               COUNT(*) FILTER (WHERE status = 'verified') AS verified_members,
               COUNT(*) FILTER (WHERE registered_at >= NOW() - INTERVAL '7 days') AS new_this_week,
               COUNT(*) FILTER (WHERE registered_at >= NOW() - INTERVAL '30 days') AS new_this_month,
               COUNT(*) FILTER (WHERE registered_at >= CURRENT_DATE) AS new_today
             FROM members WHERE lga = $1 AND status != 'duplicate'`,
            [effectiveLga]
          )
        : query('SELECT * FROM member_analytics'),

      // LGA breakdown (filtered if lga_admin)
      effectiveLga
        ? query('SELECT * FROM lga_member_counts WHERE lga = $1', [effectiveLga])
        : query('SELECT * FROM lga_member_counts'),

      // Daily registrations over last 30 days
      query(
        `SELECT 
           DATE(registered_at) AS date,
           COUNT(*) AS count
         FROM members
         WHERE registered_at >= NOW() - INTERVAL '30 days'
           AND status != 'duplicate'
           ${effectiveLga ? "AND lga = $1" : ""}
         GROUP BY DATE(registered_at)
         ORDER BY date ASC`,
        effectiveLga ? [effectiveLga] : []
      ),

      // Interest distribution
      query(
        `SELECT 
           interest,
           COUNT(*) AS count
         FROM member_interests mi
         JOIN members m ON m.id = mi.member_id
         WHERE m.status != 'duplicate'
           ${effectiveLga ? "AND m.lga = $1" : ""}
         GROUP BY interest
         ORDER BY count DESC`,
        effectiveLga ? [effectiveLga] : []
      ),
    ]);

    return res.json({
      success: true,
      data: {
        overview: overview.rows[0],
        lgaBreakdown: lgaBreakdown.rows,
        registrationTrend: registrationTrend.rows,
        interestBreakdown: interestBreakdown.rows,
      },
    });
  } catch (err) {
    logger.error('Analytics error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Failed to load analytics' });
  }
};