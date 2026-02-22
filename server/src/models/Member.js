import mongoose from 'mongoose';

const VALID_LGAS = [
  'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa',
  'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye',
  'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland',
  'Mushin', 'Ojo', 'Oshodi-Isolo', 'Somolu', 'Surulere'
];

const VALID_INTERESTS = ['Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC'];

const STATUS = {
  PENDING: 'pending',
  CONTACTED: 'contacted',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const memberSchema = new mongoose.Schema(
  {
    // Personal Info
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      // Nigerian phone: +234... or 0...
      match: [/^(\+234|0)[789][01]\d{8}$/, 'Please provide a valid Nigerian phone number'],
    },

    // Location
    lga: {
      type: String,
      required: [true, 'Local Government Area is required'],
      enum: { values: VALID_LGAS, message: '{VALUE} is not a valid Lagos LGA' },
    },
    ward: {
      type: String,
      trim: true,
      maxlength: [100, 'Ward name cannot exceed 100 characters'],
      default: null,
    },

    // Registration Details
    interests: {
      type: [String],
      validate: {
        validator: (arr) => arr.every(i => VALID_INTERESTS.includes(i)),
        message: 'One or more interests are invalid',
      },
      default: [],
    },
    message: {
      type: String,
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
      default: null,
    },

    // CRM / Admin Fields
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Admin notes cannot exceed 2000 characters'],
      default: null,
    },
    contactedAt: {
      type: Date,
      default: null,
    },

    // Tracking
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
    referralSource: { type: String, default: null }, // utm_source etc.

    // Email confirmations
    welcomeEmailSent: { type: Boolean, default: false },
    welcomeEmailSentAt: { type: Date, default: null },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: full name
memberSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Indexes for common queries
memberSchema.index({ lga: 1, status: 1 });
memberSchema.index({ createdAt: -1 });
memberSchema.index({ email: 1 }, { unique: true });
memberSchema.index({ status: 1 });
memberSchema.index({ interests: 1 });

// Static to expose constants
memberSchema.statics.STATUS = STATUS;
memberSchema.statics.VALID_LGAS = VALID_LGAS;
memberSchema.statics.VALID_INTERESTS = VALID_INTERESTS;

const Member = mongoose.model('Member', memberSchema);

export default Member;