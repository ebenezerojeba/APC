import Admin from '../models/Admin.js';
import ActivityLog from '../models/ActivityLog.js';
import { verifyAccessToken } from '../utils/jwt.js';
import { AppError } from './errorHandler.js';
import {ROLES} from '../models/Admin.js';

// Protect routes — verify JWT
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in. Please log in to access this resource.', 401));
    }

    // Verify token
    const decoded = verifyAccessToken(token);

    // Check admin still exists and is active
    const admin = await Admin.findById(decoded.id).select('+password');
    if (!admin || !admin.isActive) {
      return next(new AppError('This account no longer exists or has been deactivated.', 401));
    }

    // Check if password was changed after token was issued
    if (admin.changedPasswordAfter(decoded.iat)) {
      return next(new AppError('Password was recently changed. Please log in again.', 401));
    }

    // Grant access
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

// Role-based access control
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }
    next();
  };
};

// LGA restriction for lga_admin role
const restrictToLGA = (req, res, next) => {
  // const { ROLES } = require('../models/Admin');

  // Super admins bypass LGA restrictions
  if (req.admin.role === ROLES.SUPER_ADMIN) return next();

  // LGA admins can only access their assigned LGA
  if (req.admin.role === ROLES.LGA_ADMIN && req.admin.assignedLGA) {
    req.lgaFilter = req.admin.assignedLGA; // Attach LGA filter to request
    return next();
  }

  return next(new AppError('LGA admin must have an assigned LGA.', 403));
};

// Audit log middleware — logs actions after successful route execution
const auditLog = (action, resourceType = null) => {
  return async (req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res);

    res.json = async function (body) {
      // Only log on success responses
      if (res.statusCode < 400 && req.admin) {
        try {
          await ActivityLog.create({
            admin: req.admin._id,
            adminName: req.admin.name,
            action,
            resourceType,
            resourceId: req.params?.id || body?.data?._id || null,
            details: {
              method: req.method,
              path: req.path,
              query: req.query,
              statusCode: res.statusCode,
            },
            ipAddress: req.ip,
          });
        } catch (_) {
          // Never let audit logging crash the response
        }
      }
      return originalJson(body);
    };

    next();
  };
};


export { protect, restrictTo, restrictToLGA, auditLog };