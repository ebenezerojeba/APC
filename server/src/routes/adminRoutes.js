import express from 'express';
import { protect, restrictTo, restrictToLGA, auditLog } from '../middleware/auth.js';
import { validateStatusUpdate, validateMemberQuery } from '../middleware/validators.js';
import {
  getMembers,
  getMember,
  updateMemberStatus,
  deleteMember,
  getMemberStats,
  exportMembers,
} from '../controllers/adminMemberController.js';

const adminRouter = express.Router();

adminRouter.use(protect);

adminRouter.get('/stats', restrictToLGA, getMemberStats);

adminRouter.get(
  '/export',
  restrictTo('super_admin', 'lga_admin'),
  restrictToLGA,
  auditLog('EXPORT_MEMBERS', 'member'),
  exportMembers
);

adminRouter.get(
  '/',
  restrictToLGA,
  validateMemberQuery,
  auditLog('VIEW_MEMBERS', 'member'),
  getMembers
);

adminRouter.get(
  '/:id',
  restrictToLGA,
  auditLog('VIEW_MEMBER', 'member'),
  getMember
);

adminRouter.patch(
  '/:id/status',
  restrictTo('super_admin', 'lga_admin'),
  restrictToLGA,
  validateStatusUpdate,
  auditLog('UPDATE_MEMBER_STATUS', 'member'),
  updateMemberStatus
);

adminRouter.delete(
  '/:id',
  restrictTo('super_admin'),
  auditLog('DELETE_MEMBER', 'member'),
  deleteMember
);

export default adminRouter;