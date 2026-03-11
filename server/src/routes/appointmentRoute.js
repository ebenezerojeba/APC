import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentStats,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, restrictTo, auditLog } from '../middleware/auth.js';

const appointmentRouter = express.Router();

/* ── PUBLIC ─────────────────────────────── */
appointmentRouter.post('/', createAppointment);

/* ── ADMIN (authenticated) ──────────────── */
appointmentRouter.get('/stats',          protect, getAppointmentStats);
appointmentRouter.get('/',               protect, getAppointments);
appointmentRouter.get('/:id',            protect, getAppointmentById);

appointmentRouter.patch(
  '/:id/status',
  protect,
  auditLog('APPOINTMENT_STATUS_UPDATE', 'Appointment'),
  updateAppointmentStatus
);

appointmentRouter.delete(
  '/:id',
  protect,
  restrictTo('super_admin'),
  auditLog('APPOINTMENT_DELETE', 'Appointment'),
  deleteAppointment
);

export default appointmentRouter;