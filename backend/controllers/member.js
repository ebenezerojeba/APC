import { prisma } from '../config/db.js';
import { sendConfirmationEmail } from '../services/emailServices.js';
import pkg from 'json2csv';

const { Parser } = pkg;

// POST /api/members/register
export async function registerMember(req, res) {
  try {
    const { firstName, lastName, email, phone, lga, ward, interests, message } = req.body;

    const existing = await prisma.member.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }


    const member = await prisma.member.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        lga,
        ward: ward?.trim() || null,
        interests,
        message: message?.trim() || null,
      },
    });

    // Fire and forget — don't block the response
    sendConfirmationEmail({
      email: member.email,
      firstName: member.firstName,
      lga: member.lga,
      interests: member.interests,
    }).catch(err => console.error('Email failed:', err));

    return res.status(201).json({
      success: true,
      message: `Welcome to the movement, ${member.firstName}! A representative from ${member.lga} LGA will contact you.`,
      memberId: member.id,
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
}

// GET /api/admin/members
export async function getMembers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const { lga, status, search } = req.query;

    const where = {};
    if (lga) where.lga = lga;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.member.count({ where }),
    ]);

    return res.json({
      data: members,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get members error:', error);
    return res.status(500).json({ error: 'Failed to fetch members' });
  }
}

// GET /api/admin/members/stats
export async function getMemberStats(req, res) {
  try {
    const [total, byLga, byStatus] = await Promise.all([
      prisma.member.count(),
      prisma.member.groupBy({
        by: ['lga'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
      }),
      prisma.member.groupBy({
        by: ['status'],
        _count: { id: true },
      }),
    ]);

    return res.json({
      total,
      byLga: byLga.map(l => ({ lga: l.lga, count: l._count.id })),
      byStatus: byStatus.map(s => ({ status: s.status, count: s._count.id })),
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}

// PATCH /api/admin/members/:id/status
export async function updateMemberStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['PENDING', 'VERIFIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const member = await prisma.member.update({
      where: { id },
      data: { status },
    });

    return res.json({ success: true, member });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update status' });
  }
}

// GET /api/admin/members/export
export async function exportMembers(req, res) {
  try {
    const { lga, status } = req.query;

    const members = await prisma.member.findMany({
      where: {
        ...(lga && { lga }),
        ...(status && { status }),
      },
      orderBy: { createdAt: 'desc' },
    });

    const fields = [
      'id', 'firstName', 'lastName', 'email',
      'phone', 'lga', 'ward', 'interests', 'status', 'createdAt'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(
      members.map(m => ({ ...m, interests: m.interests.join(', ') }))
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="lagos-apc-members-${Date.now()}.csv"`);
    return res.send(csv);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to export members' });
  }
}