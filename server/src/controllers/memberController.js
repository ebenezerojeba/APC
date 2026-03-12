import Member from '../models/Member.js';
import emailService from '../services/emailService.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

// Helper to wrap async routes
const catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// POST /api/members/register
const registerMember = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, lga, ward, interests, message } = req.body;

  // Check for duplicate email
  const existing = await Member.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return next(new AppError(
      'This email address is already registered. If you think this is an error, contact us.',
      409
    ));
  }

  const member = await Member.create({
    firstName,
    lastName,
    email,
    phone,
    lga,
    ward:     ward     || undefined,
    interests: interests || [],
    message:  message  || undefined,
    ipAddress:      req.ip,
    userAgent:      req.headers['user-agent'],
    referralSource: req.headers.referer || req.query.utm_source || null,
  });

  // ── Send welcome email ────────────────────────────────────────────────────
  // Extract plain primitives from the Mongoose document before passing to the
  // email service. Raw Mongoose docs carry MongooseDocumentArray instances and
  // virtual getters that can behave unexpectedly inside template literals,
  // causing sendWelcome to silently produce malformed HTML or send to a wrong address.
  //
  // We do NOT await this — the registration response must not be delayed by SMTP.
  // We DO attach a .catch() so failures surface in logs instead of disappearing.
  const emailPayload = {
    _id:        member._id,
    firstName:  member.firstName,
    lastName:   member.lastName,
    email:      member.email,
    lga:        member.lga,
    ward:       member.ward   || null,
    // Array.from() converts MongooseDocumentArray → plain JS array
    interests:  Array.from(member.interests || []).map(String),
  };

  emailService
    .sendWelcome(emailPayload)
    .then((sent) => {
      if (sent) {
        // Fire-and-forget: record that the email was dispatched
        Member.findByIdAndUpdate(member._id, {
          welcomeEmailSent:   true,
          welcomeEmailSentAt: new Date(),
        }).catch((updateErr) => {
          // Non-critical — log but don't re-throw
          logger.warn(`Could not set welcomeEmailSent flag for ${member._id}: ${updateErr.message}`);
        });
      } else {
        // sendWelcome returns false when the transporter fails (error already logged inside send())
        logger.error(
          `Welcome email NOT sent for new member: ${member.firstName} <${member.email}> ` +
          `(${member.lga} LGA, id: ${member._id}). Check SMTP config / transporter logs above.`
        );
      }
    })
    .catch((err) => {
      // Should not reach here — sendWelcome has its own try/catch — but guard anyway
      logger.error(
        `Unexpected error in sendWelcome for member ${member._id}: ${err.message}`,
        { stack: err.stack }
      );
    });

  logger.info(`New member registered: ${member.firstName} ${member.lastName} (${member.lga} LGA)`);

  res.status(201).json({
    status: 'success',
    message: `Welcome to the Lagos APC movement, ${member.firstName}! A party representative from ${member.lga} LGA will contact you soon.`,
    data: {
      id:           member._id,
      fullName:     `${member.firstName} ${member.lastName}`,
      email:        member.email,
      lga:          member.lga,
      registeredAt: member.createdAt,
    },
  });
});

// GET /api/members/check-email?email=...
const checkEmail = catchAsync(async (req, res) => {
  const { email } = req.query;
  if (!email) return res.json({ available: false });

  const exists = await Member.exists({ email: email.toLowerCase().trim() });
  res.json({ available: !exists });
});

export { registerMember, checkEmail };