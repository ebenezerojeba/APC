// prisma.config.ts
import { defineConfig } from 'prisma/config'
import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'

const CONNECTION_STRING = "postgresql://neondb_owner:npg_cm8k7KvxnNZH@ep-rapid-wildflower-ail38xne-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";

// Create a Neon pool for the migration client
const pool = new Pool({ connectionString: CONNECTION_STRING });
const adapter = new PrismaNeon(pool);

export default defineConfig({
  datasource: {
    // This URL is used by Prisma CLI commands like 'prisma migrate'
    url: CONNECTION_STRING,
    // The adapter is now passed here for CLI commands that need it
    adapter: async () => adapter,
  },
});