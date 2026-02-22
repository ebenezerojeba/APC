import { defineConfig } from 'prisma/config';
import { Pool } from '@neondatabase/serverless';

const CONNECTION_STRING = "postgresql://neondb_owner:npg_cm8k7KvxnNZH@ep-rapid-wildflower-ail38xne.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require";

export default defineConfig({
  earlyAccess: true,
  schema: 'prisma/schema.prisma',
  migrate: {
    async adapter() {
      const pool = new Pool({ connectionString: CONNECTION_STRING });
      // Prisma 7 uses @prisma/adapter-neon differently
      const { PrismaNeon } = await import('@prisma/adapter-neon');
      return new PrismaNeon(pool);
    },
  },
});

