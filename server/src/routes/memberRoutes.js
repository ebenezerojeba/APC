import express from 'express';
import rateLimit from 'express-rate-limit';
import { registerMember, checkEmail } from '../controllers/memberController.js';
import { validateMemberRegistration } from '../middleware/validators.js';

const memberRouter = express.Router();

const registrationLimiter = rateLimit({
windowMs: 60 * 60 * 1000,
max: 5,
message: {
status: 'fail',
message: 'Too many registration attempts from this IP. Please try again in an hour.',
},
standardHeaders: true,
legacyHeaders: false,
});

const checkEmailLimiter = rateLimit({
windowMs: 60 * 1000,
max: 20,
});

memberRouter.post('/register', registrationLimiter, validateMemberRegistration, registerMember);
memberRouter.get('/check-email', checkEmailLimiter, checkEmail);

export default memberRouter;