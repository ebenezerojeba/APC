import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';

import connectDB from './config/database.js';
import emailService from './services/emailService.js';
import logger from './utils/logger.js';
import { errorHandler, AppError } from './middleware/errorHandler.js';
import memberRoutes from './routes/memberRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import appointmentRouter from './routes/appointmentRoute.js';


const app = express();

// ── Security ─────────────────────────────────────────────────────
app.use(helmet());
app.use(mongoSanitize());
app.set('trust proxy', 1);

// app.use(cors())

app.use(cors({
  origin: (origin, callback) => {
    const allowed = [process.env.CLIENT_URL, process.env.ADMIN_URL, 'http://localhost:5173', 'http://localhost:5174','https://apc-inky.vercel.app', 'https://apc-lbo4.vercel.app'].filter(Boolean);
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── General Middleware ────────────────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
  stream: { write: (msg) => logger.info(msg.trim()) },
}));

app.use('/api', rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 200,
  message: { status: 'fail', message: 'Too many requests from this IP. Please slow down.' },
  standardHeaders: true, legacyHeaders: false,
}));

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/members', memberRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/members', adminRoutes);
app.use('/api/appointments',appointmentRouter );  // public POST
app.use('/api/admin/appointments', appointmentRouter);  

// Root + Health
app.get('/', (req, res) => res.send('API Working Perfectly'));
app.get('/health', (req, res) => {
  const uptime = process.uptime();
  const h = Math.floor(uptime / 3600);
  const m = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Lagos APC API</title><style>*{margin:0;padding:0;box-sizing:border-box}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f0fdf4;font-family:-apple-system,sans-serif}.card{background:#fff;border-radius:24px;padding:48px 56px;text-align:center;box-shadow:0 4px 32px rgba(0,0,0,0.08);max-width:480px;width:90%}.badge{display:inline-flex;align-items:center;gap:8px;background:#dcfce7;color:#15803d;font-weight:700;font-size:13px;text-transform:uppercase;padding:6px 16px;border-radius:999px;margin-bottom:24px}.dot{width:8px;height:8px;background:#22c55e;border-radius:50%;animation:pulse 1.5s ease-in-out infinite}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}h1{font-size:28px;font-weight:800;color:#111;margin-bottom:8px}.sub{color:#6b7280;font-size:15px;margin-bottom:32px}.stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:32px}.stat{background:#f9fafb;border-radius:12px;padding:16px}.sl{font-size:11px;font-weight:600;text-transform:uppercase;color:#9ca3af;margin-bottom:4px}.sv{font-size:15px;font-weight:700;color:#111}.env{background:#15803d;color:#fff;font-size:11px;font-weight:700;padding:2px 10px;border-radius:999px;text-transform:uppercase}.footer{font-size:12px;color:#d1d5db}</style></head><body><div class="card"><div class="badge"><div class="dot"></div>API Working Perfectly</div><h1>Lagos APC Backend</h1><p class="sub">All systems operational.</p><div class="stats"><div class="stat"><div class="sl">Environment</div><div class="sv"><span class="env">${process.env.NODE_ENV || 'development'}</span></div></div><div class="stat"><div class="sl">Uptime</div><div class="sv">${h}h ${m}m ${s}s</div></div><div class="stat"><div class="sl">API Base</div><div class="sv">/api</div></div><div class="stat"><div class="sl">Time</div><div class="sv">${new Date().toLocaleTimeString()}</div></div></div><p class="footer">Lagos State Chapter · All Progressives Congress</p></div></body></html>`);
});
app.get('/health.json', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime(), environment: process.env.NODE_ENV });
});

app.all('*', (req, res, next) => next(new AppError(`Route ${req.originalUrl} not found`, 404)));
app.use(errorHandler);

// ── DB Connection (cached for Vercel serverless) ──────────────────
let isConnected = false;
const ensureDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) return;
  await connectDB();
  isConnected = true;
};

// ── Local dev server ──────────────────────────────────────────────
// On Vercel, this block is skipped — the app export below is used instead.
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;

  const startServer = async () => {
    await ensureDB();
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
      logger.info(`📡 API: http://localhost:${PORT}/api`);
      logger.info(`❤️  Health: http://localhost:${PORT}/health`);
    });

    emailService.verify();

    let isShuttingDown = false;
    const gracefulShutdown = (signal) => {
      if (isShuttingDown) return;
      isShuttingDown = true;
      logger.info(`${signal} received. Shutting down...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        try {
          await mongoose.connection.close();
          logger.info('MongoDB closed.');
        } catch (err) {
          logger.error('Error closing MongoDB:', err.message);
        }
        process.exit(0);
      });
      setTimeout(() => { logger.error('Forced exit.'); process.exit(1); }, 10_000).unref();
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT',  () => gracefulShutdown('SIGINT'));
    process.on('unhandledRejection', (err) => {
      logger.error('UNHANDLED REJECTION:', err?.message || err);
    });
    process.on('uncaughtException', (err) => {
      logger.error('UNCAUGHT EXCEPTION:', err.message);
      gracefulShutdown('Uncaught Exception');
    });
  };

  startServer();
}

// ── Vercel serverless export ──────────────────────────────────────
// Vercel calls this export as a serverless function on each request.
// We ensure DB is connected before handling the request.
const handler = async (req, res) => {
  await ensureDB();
  return app(req, res);
};

export default handler;