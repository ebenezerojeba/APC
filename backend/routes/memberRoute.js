import { Router } from 'express';
import {
  registerMember,
  getMembers,
  getMemberStats,
  updateMemberStatus,
  exportMembers,
} from '../controllers/member.js';
import { adminAuth } from '../middleware/auth.js';
import { validateRegistration } from '../middleware/validate.js';

const memberRouter = Router();

// Public
memberRouter.post('/members/register', validateRegistration, registerMember);

// Admin — protected
memberRouter.get('/admin/members', adminAuth, getMembers);
memberRouter.get('/admin/members/stats', adminAuth, getMemberStats);
memberRouter.get('/admin/members/export', adminAuth, exportMembers);
memberRouter.patch('/admin/members/:id/status', adminAuth, updateMemberStatus);

export default memberRouter;