import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { query, getClient } from '../db/pool.js'
import logger from '../utils/logger.js'

const SALT_ROUNDS = 12;

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/login
// ─────────────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ success: false, message: 'Email and password required' });
  }

  try {
    const result = await query(
      `SELECT id, email, password_hash, full_name, role, lga_scope, is_active 
       FROM admin_users WHERE email = $1`,
      [email.trim().toLowerCase()]
    );

    const admin = result.rows[0];

    // Constant-time comparison — prevents timing attacks
    const dummyHash = '$2a$12$invalidhashfortimingprotection000000000000000000000000';
    const isValid = admin
      ? await bcrypt.compare(password, admin.password_hash)
      : await bcrypt.compare(password, dummyHash);

    if (!admin || !isValid || !admin.is_active) {
      logger.warn('Failed login attempt', { email, ip: req.ip });
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials or account deactivated' 
      });
    }

    // Issue access token (short-lived)
    const accessToken = jwt.sign(
      { adminId: admin.id, role: admin.role, lgaScope: admin.lga_scope },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    // Issue refresh token (long-lived, stored in DB)
    const rawRefresh = crypto.randomBytes(64).toString('hex');
    const refreshHash = crypto.createHash('sha256').update(rawRefresh).digest('hex');
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await query(
      `INSERT INTO refresh_tokens (admin_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
      [admin.id, refreshHash, refreshExpiry]
    );

    // Update last_login_at
    await query('UPDATE admin_users SET last_login_at = NOW() WHERE id = $1', [admin.id]);

    logger.info('Admin login', { adminId: admin.id, email: admin.email, ip: req.ip });

    return res.json({
      success: true,
      data: {
        accessToken,
        refreshToken: rawRefresh,
        expiresIn: process.env.JWT_EXPIRES_IN || '8h',
        admin: {
          id: admin.id,
          email: admin.email,
          fullName: admin.full_name,
          role: admin.role,
          lgaScope: admin.lga_scope,
        },
      },
    });
  } catch (err) {
    logger.error('Login error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Login failed' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/refresh
// ─────────────────────────────────────────────────────────────────────────────
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token required' });
  }

  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  try {
    const result = await query(
      `SELECT rt.id, rt.admin_id, rt.expires_at, rt.revoked_at,
              a.email, a.full_name, a.role, a.lga_scope, a.is_active
       FROM refresh_tokens rt
       JOIN admin_users a ON a.id = rt.admin_id
       WHERE rt.token_hash = $1`,
      [tokenHash]
    );

    const token = result.rows[0];

    if (!token || token.revoked_at || new Date() > new Date(token.expires_at) || !token.is_active) {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
    }

    // Rotate refresh token (invalidate old, issue new)
    const newRaw = crypto.randomBytes(64).toString('hex');
    const newHash = crypto.createHash('sha256').update(newRaw).digest('hex');
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = $1', [token.id]);
    await query(
      'INSERT INTO refresh_tokens (admin_id, token_hash, expires_at) VALUES ($1, $2, $3)',
      [token.admin_id, newHash, newExpiry]
    );

    const accessToken = jwt.sign(
      { adminId: token.admin_id, role: token.role, lgaScope: token.lga_scope },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    return res.json({
      success: true,
      data: { accessToken, refreshToken: newRaw },
    });
  } catch (err) {
    logger.error('Token refresh error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Token refresh failed' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/auth/logout
// ─────────────────────────────────────────────────────────────────────────────
exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) {
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    await query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE token_hash = $1', [tokenHash]);
  }
  return res.json({ success: true, message: 'Logged out successfully' });
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/auth/me
// ─────────────────────────────────────────────────────────────────────────────
exports.getMe = async (req, res) => {
  return res.json({ success: true, data: req.admin });
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/v1/auth/change-password
// ─────────────────────────────────────────────────────────────────────────────
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(422).json({ success: false, message: 'Both current and new password required' });
  }
  if (newPassword.length < 8) {
    return res.status(422).json({ success: false, message: 'New password must be at least 8 characters' });
  }

  try {
    const result = await query('SELECT password_hash FROM admin_users WHERE id = $1', [req.admin.id]);
    const isValid = await bcrypt.compare(currentPassword, result.rows[0].password_hash);

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await query('UPDATE admin_users SET password_hash = $1 WHERE id = $2', [newHash, req.admin.id]);

    // Revoke all refresh tokens for security
    await query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE admin_id = $1', [req.admin.id]);

    logger.info('Password changed', { adminId: req.admin.id });
    return res.json({ success: true, message: 'Password updated. Please log in again.' });
  } catch (err) {
    logger.error('Change password error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Failed to change password' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/admin/users  — super_admin only
// ─────────────────────────────────────────────────────────────────────────────
exports.listAdminUsers = async (req, res) => {
  try {
    const result = await query(
      `SELECT id, email, full_name, role, lga_scope, is_active, last_login_at, created_at
       FROM admin_users ORDER BY created_at DESC`
    );
    return res.json({ success: true, data: result.rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch admin users' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/v1/admin/users  — super_admin only
// ─────────────────────────────────────────────────────────────────────────────
exports.createAdminUser = async (req, res) => {
  const { email, password, fullName, role, lgaScope } = req.body;

  if (!email || !password || !fullName || !role) {
    return res.status(422).json({ success: false, message: 'All fields required' });
  }

  const VALID_ROLES = ['super_admin', 'lga_admin', 'viewer'];
  if (!VALID_ROLES.includes(role)) {
    return res.status(422).json({ success: false, message: 'Invalid role' });
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await query(
      `INSERT INTO admin_users (email, password_hash, full_name, role, lga_scope)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, email, full_name, role, lga_scope, created_at`,
      [email.toLowerCase(), hash, fullName, role, lgaScope || null]
    );

    logger.info('Admin user created', { newUserId: result.rows[0].id, createdBy: req.admin.id });
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }
    logger.error('Create admin user error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/v1/admin/users/:id  — super_admin only
// ─────────────────────────────────────────────────────────────────────────────
exports.updateAdminUser = async (req, res) => {
  const { id } = req.params;
  const { role, lgaScope, isActive } = req.body;

  try {
    const result = await query(
      `UPDATE admin_users 
       SET role = COALESCE($1::admin_role, role),
           lga_scope = COALESCE($2, lga_scope),
           is_active = COALESCE($3, is_active)
       WHERE id = $4
       RETURNING id, email, full_name, role, lga_scope, is_active`,
      [role || null, lgaScope || null, isActive ?? null, id]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ success: false, message: 'Admin user not found' });
    }

    return res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    logger.error('Update admin user error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/v1/admin/audit-logs  — super_admin only
// ─────────────────────────────────────────────────────────────────────────────
exports.getAuditLogs = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const result = await query(
      `SELECT al.*, a.full_name AS admin_name, a.email AS admin_email
       FROM audit_logs al
       LEFT JOIN admin_users a ON a.id = al.admin_id
       ORDER BY al.created_at DESC
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), offset]
    );

    return res.json({ success: true, data: result.rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch audit logs' });
  }
};