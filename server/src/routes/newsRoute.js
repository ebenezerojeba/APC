import express from 'express';
import {
  getPublicNews,
  getPublicNewsById,
  getAdminNews,
  getNewsStats,
  getAdminNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../controllers/newsController.js';
import { protect, restrictTo, auditLog } from '../middleware/auth.js';

const newsRouter = express.Router();

/* ── PUBLIC ─────────────────────────────────────────────────────── */
// GET /api/news          — paginated list for the frontend News component
// GET /api/news/:id      — single article for deep-link / share
newsRouter.get('/',    getPublicNews);
newsRouter.get('/:id', getPublicNewsById);

/* ── ADMIN (authenticated) ──────────────────────────────────────── */
// All routes below are mounted at /api/admin/news

// Stats
newsRouter.get(
  '/stats',
  protect,
  getNewsStats
);

// List
newsRouter.get(
  '/',
  protect,
  getAdminNews
);

// Single
newsRouter.get(
  '/:id',
  protect,
  getAdminNewsById
);

// Create
newsRouter.post(
  '/',
  protect,
  auditLog('NEWS_CREATE', 'News'),
  createNews
);

// Update
newsRouter.put(
  '/:id',
  protect,
  auditLog('NEWS_UPDATE', 'News'),
  updateNews
);

// Delete — super_admin only
newsRouter.delete(
  '/:id',
  protect,
  restrictTo('super_admin'),
  auditLog('NEWS_DELETE', 'News'),
  deleteNews
);

export default newsRouter;