import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config'
import memberRouter from './routes/memberRoute.js';
import { prisma, testDbConnection } from './config/db.js';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : '*',
  methods: ['GET', 'POST', 'PATCH'],
}));

app.use(express.json());

const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many attempts. Please try again later.' },
});

app.use('/api/members/register', registrationLimiter);
app.use('/api', memberRouter);

app.get('/health', (_, res) => res.json({
  status: 'ok',
  timestamp: new Date().toISOString()
}));

// Boot — test DB connection before accepting traffic

async function start() {
  await testDbConnection(); // runs SELECT 1 — no lies
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start();