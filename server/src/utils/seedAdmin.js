import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import logger from './logger.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Connected to MongoDB for seeding...');

    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      logger.warn(`Super admin already exists: ${process.env.ADMIN_EMAIL}`);
      process.exit(0);
    }

    const admin = await Admin.create({
      name: process.env.ADMIN_NAME || 'Super Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'super_admin',
      isActive: true,
    });

    logger.info(`✅ Super admin created successfully!`);
    logger.info(`   Email: ${admin.email}`);
    logger.info(`   Role:  ${admin.role}`);
    logger.info(`   ID:    ${admin._id}`);
    logger.info('');
    logger.info('🔐 Please change the password after first login!');
    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();