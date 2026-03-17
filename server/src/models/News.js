import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Title is required.'],
      trim:     true,
      maxlength: [200, 'Title cannot exceed 200 characters.'],
    },
    excerpt: {
      type:     String,
      required: [true, 'Excerpt is required.'],
      trim:     true,
      maxlength: [500, 'Excerpt cannot exceed 500 characters.'],
    },
    category: {
      type:     String,
      required: [true, 'Category is required.'],
      enum: {
        values:  ['Official Statement', 'Mobilization', 'Registration', 'Obituary'],
        message: 'Invalid category.',
      },
      default: 'Official Statement',
    },
    date: {
      type:     String,   // "YYYY-MM-DD" — display string, not a Date object
      required: [true, 'Publication date is required.'],
      trim:     true,
    },
    author: {
      type:     String,
      required: [true, 'Author is required.'],
      trim:     true,
    },
    role: {
      type:    String,
      trim:    true,
      default: '',
    },
    paragraphs: {
      type:     [String],
      required: [true, 'At least one paragraph is required.'],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.some((p) => p.trim().length > 0),
        message:   'At least one non-empty paragraph is required.',
      },
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Admin',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'Admin',
    },
  },
  {
    timestamps: true,   // createdAt, updatedAt
    toJSON:     { virtuals: true },
    toObject:   { virtuals: true },
  }
);

// Text index for search
newsSchema.index({ title: 'text', excerpt: 'text', author: 'text' });
// Sorted list index (newest first)
newsSchema.index({ createdAt: -1 });
newsSchema.index({ category: 1, createdAt: -1 });

const News = mongoose.model('News', newsSchema);
export default News;
