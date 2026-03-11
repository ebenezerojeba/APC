import mongoose from 'mongoose';

/**
 * Appointment model
 * Status lifecycle: pending → approved | rejected
 */
const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [120, 'Name too long'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [30],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    organization: {
      type: String,
      trim: true,
      default: '',
    },
    purpose: {
      type: String,
      required: [true, 'Purpose is required'],
      enum: [
        'Party Affairs & Governance',
        'Community Development',
        'Business & Investment',
        'Media & Press',
        'Youth & Women Affairs',
        'Official Delegation',
        'Personal Matter',
        'Other',
      ],
    },
    preferredDate: {
      type: String, // stored as "YYYY-MM-DD" string from date input
      default: '',
    },
    preferredTime: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000],
      default: '',
    },

    // Admin-managed fields
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
    adminNote: {
      type: String,
      trim: true,
      default: '',
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Compound index for admin list queries
appointmentSchema.index({ status: 1, createdAt: -1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;