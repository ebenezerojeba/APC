import { body, query, param, validationResult } from 'express-validator';
import Member from '../models/Member.js';

// Reusable validation result handler
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// Member registration validation
const validateMemberRegistration = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2–50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('First name contains invalid characters'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be 2–50 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Last name contains invalid characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^(\+234|0)[789][01]\d{8}$/).withMessage('Please provide a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)'),

  body('lga')
    .trim()
    .notEmpty().withMessage('Local Government Area is required')
    .isIn(Member.VALID_LGAS).withMessage('Please select a valid Lagos LGA'),

  body('ward')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Ward name cannot exceed 100 characters'),

  body('interests')
    .optional()
    .isArray().withMessage('Interests must be an array')
    .custom((arr) => {
      if (arr.some(i => !Member.VALID_INTERESTS.includes(i))) {
        throw new Error('One or more interests are invalid');
      }
      return true;
    }),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),

  validate,
];

// Admin login validation
const validateAdminLogin = [
  body('email').trim().notEmpty().isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Update member status
const validateStatusUpdate = [
  param('id').isMongoId().withMessage('Invalid member ID'),
  body('status')
    .isIn(['pending', 'contacted', 'active', 'inactive'])
    .withMessage('Invalid status value'),
  body('adminNotes')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Admin notes cannot exceed 2000 characters'),
  validate,
];

// Query params for member listing
const validateMemberQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1–100'),
  query('status').optional().isIn(['pending', 'contacted', 'active', 'inactive', '']),
  query('lga').optional().isIn([...Member.VALID_LGAS, '']),
  validate,
];

export {
  validateMemberRegistration,
  validateAdminLogin,
  validateStatusUpdate,
  validateMemberQuery,
};