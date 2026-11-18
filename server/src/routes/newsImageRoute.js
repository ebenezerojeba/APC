import express from 'express';
import { uploadNewsImage, getNewsImage } from '../controllers/newsImageController.js';
import { protect, auditLog } from '../middleware/auth.js';

// Public: GET /api/news-images/:id
export const newsImagePublicRouter = express.Router();
newsImagePublicRouter.get('/:id', getNewsImage);

/*
  Admin: POST /api/admin/news-images
  Mounted before the app-wide 10 KB JSON limit, with its own 5 MB limit, so
  photos fit while every other route stays tightly capped.
*/
export const newsImageAdminRouter = express.Router();
newsImageAdminRouter.post(
  '/',
  express.json({ limit: '5mb' }),
  protect,
  auditLog('NEWS_IMAGE_UPLOAD', 'NewsImage'),
  uploadNewsImage,
);
