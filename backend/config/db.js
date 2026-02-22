// import { PrismaClient } from '@prisma/client';

// const CONNECTION_STRING = "postgresql://neondb_owner:npg_cm8k7KvxnNZH@ep-rapid-wildflower-ail38xne-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";

// export const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       url: CONNECTION_STRING,
//     },
//   },
// });

// export async function testDbConnection() {
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     console.log('✅ Database connected and query works');
//   } catch (err) {
//     console.error('❌ Real connection failed:', err.message);
//     process.exit(1);
//   }
// }

// db.js - Using environment variable
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config() // Load .env file

// Verify the environment variable is loaded
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set')
  process.exit(1)
}

console.log('✅ DATABASE_URL found') // Don't log the actual URL for security

export const prisma = new PrismaClient()

export async function testDbConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    const result = await prisma.$queryRaw`SELECT 1 as connected`
    console.log('✅ Query works:', result)
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
    process.exit(1)
  }
}