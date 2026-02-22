import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_cm8k7KvxnNZH@ep-rapid-wildflower-ail38xne-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
});

const result = await pool.query('SELECT 1 as connected');
console.log('✅ Raw Neon works:', result.rows);
await pool.end();