import Appointment from '../models/Appointment.js';
import emailService from '../services/emailService.js';

export const createAppointment = async (req, res) => {
  try {
    const {
      fullName, phone, email, organization,
      purpose, preferredDate, preferredTime, message,
    } = req.body;

    if (!fullName?.trim() || !phone?.trim() || !purpose?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Full name, phone, and purpose are required.',
      });
    }

    const appointment = await Appointment.create({
      fullName:      fullName.trim(),
      phone:         phone.trim(),
      email:         email?.trim().toLowerCase() || '',
      organization:  organization?.trim() || '',
      purpose,
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      message:       message?.trim() || '',
    });

    // Fire-and-forget — never blocks the 201 response
    emailService.sendAppointmentConfirmation(appointment);

    return res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully.',
      data: { id: appointment._id },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors[0] });
    }
    console.error('[createAppointment]', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

/* ─────────────────────────────────────────
   ADMIN
───────────────────────────────────────── */

export const getAppointments = async (req, res) => {
  try {
    const { status, purpose, date, search, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) filter.status = status;
    if (purpose) filter.purpose = purpose;
    if (date)    filter.preferredDate = date;
    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [{ fullName: regex }, { phone: regex }, { email: regex }];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [appointments, total] = await Promise.all([
      Appointment.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('reviewedBy', 'name email role')
        .lean(),
      Appointment.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      data: appointments,
      pagination: {
        total,
        page:  Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (err) {
    console.error('[getAppointments]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const getAppointmentStats = async (req, res) => {
  try {
    const [pending, approved, rejected, total] = await Promise.all([
      Appointment.countDocuments({ status: 'pending'  }),
      Appointment.countDocuments({ status: 'approved' }),
      Appointment.countDocuments({ status: 'rejected' }),
      Appointment.countDocuments(),
    ]);
    return res.json({ success: true, data: { total, pending, approved, rejected } });
  } catch (err) {
    console.error('[getAppointmentStats]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('reviewedBy', 'name email role')
      .lean();

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }
    return res.json({ success: true, data: appointment });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid appointment ID.' });
    }
    console.error('[getAppointmentById]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'approved' or 'rejected'.",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status,
        adminNote:  adminNote?.trim() || '',
        reviewedBy: req.admin._id,
        reviewedAt: new Date(),
      },
      { new: true, runValidators: true }
    ).populate('reviewedBy', 'name email role');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    // Fire-and-forget — dispatch the correct email based on new status
    if (status === 'approved') emailService.sendAppointmentApproved(appointment);
    else emailService.sendAppointmentRejected(appointment);

    return res.json({
      success: true,
      message: `Appointment ${status}.`,
      data: appointment,
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid appointment ID.' });
    }
    console.error('[updateAppointmentStatus]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }
    return res.json({ success: true, message: 'Appointment deleted.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid appointment ID.' });
    }
    console.error('[deleteAppointment]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};