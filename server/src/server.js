import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import emailService from './services/emailService.js';
import connectDB from './config/database.js';
import logger from './utils/logger.js';
import { errorHandler, AppError } from './middleware/errorHandler.js';

// Route imports
import memberRoutes from './routes/memberRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// =================================================================
// Security Middleware
// =================================================================
app.use(helmet());
app.use(mongoSanitize());
app.set('trust proxy', 1);

app.use(cors())
// app.use(cors({
//   origin: (origin, callback) => {
//     const allowed = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean);
//     if (!origin || allowed.includes(origin)) callback(null, true);
//     else callback(new Error(`CORS policy: Origin ${origin} not allowed`));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

// =================================================================
// General Middleware
// =================================================================
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
} else {
  app.use(morgan('dev'));
}

// Global API rate limit
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 200,
  message: { status: 'fail', message: 'Too many requests from this IP. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// =================================================================
// Routes
// =================================================================
app.use('/api/members', memberRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/members', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// Root route
app.get('/', (req, res) => res.send('API Working Perfectly'));

// 404 handler
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handler
app.use(errorHandler);

// =================================================================
// Start Server
// =================================================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    logger.info(`📡 API available at: http://localhost:${PORT}/api`);
    logger.info(`❤️  Health check at: http://localhost:${PORT}/health`);
  });

  // Verify SMTP at startup — surfaces credential errors immediately
  emailService.verify();

  const gracefulShutdown = (signal) => {
    logger.info(`${signal} received. Starting graceful shutdown...`);
    server.close(() => {
      logger.info('HTTP server closed.');
      import('mongoose').then(mongoose => {
        mongoose.connection.close(false, () => {
          logger.info('MongoDB connection closed.');
          process.exit(0);
        });
      });
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION:', err);
    gracefulShutdown('Unhandled Rejection');
  });
};

startServer();

export default app;