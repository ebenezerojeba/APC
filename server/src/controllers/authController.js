import Admin from '../models/Admin.js';
import ActivityLog from '../models/ActivityLog.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';
import crypto from 'crypto';


const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const sendTokens = (admin, statusCode, res) => {
  const payload = { id: admin._id, role: admin.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Store hashed refresh token in DB
  const hashedRefresh = crypto.createHash('sha256').update(refreshToken).digest('hex');
  Admin.findByIdAndUpdate(admin._id, {
    refreshToken: hashedRefresh,
    lastLogin: new Date(),
  }).catch(() => {});

  res.status(statusCode).json({
    status: 'success',
    data: {
      accessToken,
      refreshToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        assignedLGA: admin.assignedLGA,
      },
    },
  });
};

// POST /api/auth/login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select('+password');

  if (!admin || !(await admin.comparePassword(password))) {
    return next(new AppError('Invalid email or password.', 401));
  }

  if (!admin.isActive) {
    return next(new AppError('Your account has been deactivated. Contact a super admin.', 403));
  }

  // Audit log
  ActivityLog.create({
    admin: admin._id,
    adminName: admin.name,
    action: 'LOGIN',
    ipAddress: req.ip,
  }).catch(() => {});

  logger.info(`Admin login: ${admin.email} (${admin.role})`);
  sendTokens(admin, 200, res);
});

// POST /api/auth/refresh
const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken: token } = req.body;

  if (!token) return next(new AppError('Refresh token is required.', 400));

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    return next(new AppError('Invalid or expired refresh token.', 401));
  }

  const hashed = crypto.createHash('sha256').update(token).digest('hex');
  const admin = await Admin.findOne({ _id: decoded.id, refreshToken: hashed });

  if (!admin) return next(new AppError('Refresh token is invalid or has been revoked.', 401));

  sendTokens(admin, 200, res);
});

// POST /api/auth/logout
const logout = catchAsync(async (req, res) => {
  await Admin.findByIdAndUpdate(req.admin._id, { refreshToken: null });

  ActivityLog.create({
    admin: req.admin._id,
    adminName: req.admin.name,
    action: 'LOGOUT',
    ipAddress: req.ip,
  }).catch(() => {});

  res.json({ status: 'success', message: 'Logged out successfully.' });
});

// GET /api/auth/me
const getMe = catchAsync(async (req, res) => {
  res.json({
    status: 'success',
    data: {
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
        assignedLGA: req.admin.assignedLGA,
        lastLogin: req.admin.lastLogin,
      },
    },
  });
});

// POST /api/auth/change-password
const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new password.', 400));
  }

  if (newPassword.length < 8) {
    return next(new AppError('New password must be at least 8 characters.', 422));
  }

  const admin = await Admin.findById(req.admin._id).select('+password');
  if (!(await admin.comparePassword(currentPassword))) {
    return next(new AppError('Current password is incorrect.', 401));
  }

  admin.password = newPassword;
  await admin.save();

  sendTokens(admin, 200, res);
});

// --- Admin Management (super_admin only) ---

// GET /api/auth/admins
const getAdmins = catchAsync(async (req, res) => {
  const admins = await Admin.find().select('-refreshToken -passwordResetToken');
  res.json({ status: 'success', data: { admins } });
});

// POST /api/auth/admins
const createAdmin = catchAsync(async (req, res, next) => {
  const { name, email, password, role, assignedLGA } = req.body;

  const { ROLES } = require('../models/Admin');

  if (role === ROLES.LGA_ADMIN && !assignedLGA) {
    return next(new AppError('LGA admin must have an assigned LGA.', 422));
  }

  const admin = await Admin.create({ name, email, password, role, assignedLGA });
  logger.info(`Admin created: ${admin.email} (${admin.role}) by ${req.admin.email}`);

  res.status(201).json({
    status: 'success',
    data: {
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, assignedLGA: admin.assignedLGA },
    },
  });
});

// PATCH /api/auth/admins/:id
const updateAdmin = catchAsync(async (req, res, next) => {
  const { name, role, assignedLGA, isActive } = req.body;

  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { name, role, assignedLGA, isActive },
    { new: true, runValidators: true }
  );

  if (!admin) return next(new AppError('Admin not found', 404));

  res.json({ status: 'success', data: { admin } });
});

// DELETE /api/auth/admins/:id
const deleteAdmin = catchAsync(async (req, res, next) => {
  if (req.params.id === req.admin._id.toString()) {
    return next(new AppError('You cannot delete your own account.', 400));
  }

  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) return next(new AppError('Admin not found', 404));

  res.json({ status: 'success', message: 'Admin deleted', data: null });
});

export {
  login,
  refreshToken,
  logout,
  getMe,
  changePassword,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};