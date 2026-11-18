import mongoose from 'mongoose';

/*
  News photos, stored in MongoDB.

  The API runs on Vercel, which keeps no files between requests, so uploads
  live here instead of on disk. The admin shrinks each photo in the browser
  (about 1600px wide, JPEG) before sending, which keeps documents around
  150–400 KB, far below MongoDB's 16 MB limit.
*/
const newsImageSchema = new mongoose.Schema(
  {
    data:        { type: Buffer, required: true },
    contentType: { type: String, required: true, enum: ['image/jpeg', 'image/png', 'image/webp'] },
    size:        { type: Number, required: true },
    uploadedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true },
);

const NewsImage = mongoose.model('NewsImage', newsImageSchema);
export default NewsImage;
