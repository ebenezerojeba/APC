// src/db/migrate.js
// Idempotent migration — safe to run multiple times
require('dotenv').config();
const { pool } = require('./pool');
const logger = require('../utils/logger');

const MIGRATION_SQL = `
  -- =========================================================
  -- EXTENSIONS
  -- =========================================================
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- fuzzy search on names

  -- =========================================================
  -- ENUMS
  -- =========================================================
  DO $$ BEGIN
    CREATE TYPE member_status AS ENUM ('pending', 'active', 'verified', 'suspended', 'duplicate');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    CREATE TYPE admin_role AS ENUM ('super_admin', 'lga_admin', 'viewer');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    CREATE TYPE interest_type AS ENUM ('Volunteer', 'Grassroots Support', 'Media & Comms', 'Polling Agent', 'PVC');
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  -- =========================================================
  -- MEMBERS TABLE (core registration data)
  -- =========================================================
  CREATE TABLE IF NOT EXISTS members (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name    VARCHAR(100) NOT NULL,
    last_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(254) UNIQUE,
    phone         VARCHAR(20) NOT NULL,
    phone_normalized VARCHAR(15) UNIQUE NOT NULL, -- E.164 format for dedup
    lga           VARCHAR(100) NOT NULL,
    ward          VARCHAR(100),
    message       TEXT,
    status        member_status NOT NULL DEFAULT 'pending',
    ip_address    INET,
    user_agent    TEXT,
    referral_source VARCHAR(200),
    registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    verified_at   TIMESTAMPTZ,
    verified_by   UUID, -- admin user id
    notes         TEXT  -- internal admin notes
  );

  -- =========================================================
  -- MEMBER INTERESTS (many-to-many via junction)
  -- =========================================================
  CREATE TABLE IF NOT EXISTS member_interests (
    id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    interest  interest_type NOT NULL,
    UNIQUE(member_id, interest)
  );

  -- =========================================================
  -- ADMIN USERS TABLE
  -- =========================================================
  CREATE TABLE IF NOT EXISTS admin_users (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email         VARCHAR(254) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(200) NOT NULL,
    role          admin_role NOT NULL DEFAULT 'viewer',
    lga_scope     VARCHAR(100),  -- if lga_admin, which LGA they manage
    is_active     BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- =========================================================
  -- AUDIT LOG TABLE (every admin action is recorded)
  -- =========================================================
  CREATE TABLE IF NOT EXISTS audit_logs (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id    UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    action      VARCHAR(100) NOT NULL,
    entity      VARCHAR(50),
    entity_id   UUID,
    details     JSONB,
    ip_address  INET,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- =========================================================
  -- REFRESH TOKENS TABLE
  -- =========================================================
  CREATE TABLE IF NOT EXISTS refresh_tokens (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id    UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    token_hash  VARCHAR(255) NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at  TIMESTAMPTZ
  );

  -- =========================================================
  -- INDEXES FOR PERFORMANCE
  -- =========================================================
  CREATE INDEX IF NOT EXISTS idx_members_lga ON members(lga);
  CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
  CREATE INDEX IF NOT EXISTS idx_members_registered_at ON members(registered_at DESC);
  CREATE INDEX IF NOT EXISTS idx_members_phone ON members(phone_normalized);
  CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
  -- Full-text search on names
  CREATE INDEX IF NOT EXISTS idx_members_name_trgm 
    ON members USING GIN ((first_name || ' ' || last_name) gin_trgm_ops);
  
  CREATE INDEX IF NOT EXISTS idx_member_interests_member ON member_interests(member_id);
  CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON audit_logs(admin_id);
  CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);
  CREATE INDEX IF NOT EXISTS idx_refresh_tokens_admin ON refresh_tokens(admin_id);

  -- =========================================================
  -- AUTO-UPDATE updated_at TRIGGER
  -- =========================================================
  CREATE OR REPLACE FUNCTION update_updated_at()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS members_updated_at ON members;
  CREATE TRIGGER members_updated_at
    BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

  DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
  CREATE TRIGGER admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

  -- =========================================================
  -- ANALYTICS VIEW (pre-computed for admin dashboard)
  -- =========================================================
  CREATE OR REPLACE VIEW member_analytics AS
  SELECT
    COUNT(*) AS total_members,
    COUNT(*) FILTER (WHERE status = 'active') AS active_members,
    COUNT(*) FILTER (WHERE status = 'pending') AS pending_members,
    COUNT(*) FILTER (WHERE status = 'verified') AS verified_members,
    COUNT(*) FILTER (WHERE registered_at >= NOW() - INTERVAL '7 days') AS new_this_week,
    COUNT(*) FILTER (WHERE registered_at >= NOW() - INTERVAL '30 days') AS new_this_month,
    COUNT(*) FILTER (WHERE registered_at >= CURRENT_DATE) AS new_today
  FROM members
  WHERE status != 'duplicate';

  -- Per-LGA breakdown view
  CREATE OR REPLACE VIEW lga_member_counts AS
  SELECT 
    lga,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE status = 'active') AS active,
    COUNT(*) FILTER (WHERE status = 'pending') AS pending,
    COUNT(*) FILTER (WHERE status = 'verified') AS verified,
    MAX(registered_at) AS last_registration
  FROM members
  WHERE status != 'duplicate'
  GROUP BY lga
  ORDER BY total DESC;
`;

async function migrate() {
  const client = await pool.connect();
  try {
    logger.info('Running database migrations...');
    await client.query(MIGRATION_SQL);
    logger.info('✅ Migrations completed successfully');
  } catch (err) {
    logger.error('Migration failed', { error: err.message });
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();