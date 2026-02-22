import Member from '../models/Member.js';
import emailService from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

// Helper to wrap async routes
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// POST /api/members/register
const registerMember = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, lga, ward, interests, message } = req.body;

  // Check for duplicate email with a helpful message
  const existing = await Member.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return next(new AppError('This email address is already registered. If you think this is an error, contact us.', 409));
  }

  const member = await Member.create({
    firstName,
    lastName,
    email,
    phone,
    lga,
    ward: ward || undefined,
    interests: interests || [],
    message: message || undefined,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    referralSource: req.headers.referer || req.query.utm_source || null,
  });

  // Send welcome email asynchronously (don't block response)
  emailService.sendWelcome(member).then((sent) => {
    if (sent) {
      Member.findByIdAndUpdate(member._id, {
        welcomeEmailSent: true,
        welcomeEmailSentAt: new Date(),
      }).catch(() => {}); // Fire and forget
    }
  });

  logger.info(`New member registered: ${member.fullName} (${member.lga} LGA)`);

  res.status(201).json({
    status: 'success',
    message: `Welcome to the Lagos APC movement, ${member.firstName}! A party representative from ${member.lga} LGA will contact you soon.`,
    data: {
      id: member._id,
      fullName: member.fullName,
      email: member.email,
      lga: member.lga,
      registeredAt: member.createdAt,
    },
  });
});

// GET /api/members/check-email?email=... (for frontend validation)
const checkEmail = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email) return res.json({ available: false });

  const exists = await Member.exists({ email: email.toLowerCase().trim() });
  res.json({ available: !exists });
});

export { registerMember, checkEmail };