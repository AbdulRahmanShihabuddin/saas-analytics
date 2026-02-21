/**
 * migrate.ts — HTTP-based schema migration for Neon
 * 
 * Runs CREATE TABLE statements via @neondatabase/serverless (HTTP),
 * bypassing raw TCP/port-5432 restrictions (drizzle-kit needs TCP).
 * 
 * Run: npx tsx server/db/migrate.ts
 */

import 'dotenv/config'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function migrate() {
    console.log('🔄 Running migrations via Neon HTTP...')

    await sql`
    CREATE TABLE IF NOT EXISTS users (
      id           SERIAL PRIMARY KEY,
      email        TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name         TEXT NOT NULL,
      role         TEXT NOT NULL DEFAULT 'viewer',
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
    console.log('  ✓ users')

    await sql`
    CREATE TABLE IF NOT EXISTS page_events (
      id               SERIAL PRIMARY KEY,
      page             TEXT NOT NULL,
      views            INTEGER NOT NULL DEFAULT 0,
      unique_visitors  INTEGER NOT NULL DEFAULT 0,
      bounce_rate      INTEGER NOT NULL DEFAULT 0,
      avg_duration_sec INTEGER NOT NULL DEFAULT 0,
      conversions      INTEGER NOT NULL DEFAULT 0,
      recorded_at      DATE NOT NULL
    )
  `
    console.log('  ✓ page_events')

    await sql`
    CREATE TABLE IF NOT EXISTS daily_metrics (
      id               SERIAL PRIMARY KEY,
      date             DATE NOT NULL UNIQUE,
      total_users      INTEGER NOT NULL,
      active_sessions  INTEGER NOT NULL,
      revenue          REAL NOT NULL,
      conversion_rate  REAL NOT NULL
    )
  `
    console.log('  ✓ daily_metrics')

    await sql`
    CREATE TABLE IF NOT EXISTS revenue_by_day (
      id      SERIAL PRIMARY KEY,
      date    DATE NOT NULL,
      channel TEXT NOT NULL,
      amount  REAL NOT NULL
    )
  `
    console.log('  ✓ revenue_by_day')

    console.log('\n✅ Migration complete!')
    process.exit(0)
}

migrate().catch(err => {
    console.error('❌ Migration failed:', err)
    process.exit(1)
})
