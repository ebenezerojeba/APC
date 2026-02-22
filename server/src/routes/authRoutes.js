import express from 'express';
import rateLimit from 'express-rate-limit';
import {
login, refreshToken, logout, getMe, changePassword,
getAdmins, createAdmin, updateAdmin, deleteAdmin,
} from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { validateAdminLogin } from '../middleware/validators.js';

const authRouter = express.Router();

const loginLimiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 10,
message: { status: 'fail', message: 'Too many login attempts. Please try again in 15 minutes.' },
standardHeaders: true,
legacyHeaders: false,
});

authRouter.post('/login', loginLimiter, validateAdminLogin, login);
authRouter.post('/refresh', refreshToken);

authRouter.use(protect);

authRouter.post('/logout', logout);
authRouter.get('/me', getMe);
authRouter.patch('/change-password', changePassword);

authRouter.use(restrictTo('super_admin'));
authRouter.get('/admins', getAdmins);
authRouter.post('/admins', createAdmin);
authRouter.patch('/admins/:id', updateAdmin);
authRouter.delete('/admins/:id', deleteAdmin);

export default authRouter;