/**
 * Drizzle ORM Schema
 * 
 * Defines 4 tables that back the SaaS Analytics dashboard:
 *   users           — authenticated user accounts
 *   page_events     — per-page analytics row (used in the analytics table)
 *   daily_metrics   — aggregated KPIs per day (used in dashboard metrics cards)
 *   revenue_by_day  — revenue broken down by channel per day (used in charts)
 */

import { pgTable, serial, text, integer, real, timestamp, date } from 'drizzle-orm/pg-core'

// ─── Users ────────────────────────────────────────────────────────────────────
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    name: text('name').notNull(),
    role: text('role').notNull().default('viewer'), // 'admin' | 'viewer'
    createdAt: timestamp('created_at').defaultNow().notNull()
})

// ─── Page Events ──────────────────────────────────────────────────────────────
export const pageEvents = pgTable('page_events', {
    id: serial('id').primaryKey(),
    page: text('page').notNull(),
    views: integer('views').notNull().default(0),
    uniqueVisitors: integer('unique_visitors').notNull().default(0),
    bounceRate: integer('bounce_rate').notNull().default(0),     // stored as integer percent e.g. 42
    avgDurationSec: integer('avg_duration_sec').notNull().default(0),
    conversions: integer('conversions').notNull().default(0),
    recordedAt: date('recorded_at').notNull()                    // YYYY-MM-DD
})

// ─── Daily Metrics ────────────────────────────────────────────────────────────
export const dailyMetrics = pgTable('daily_metrics', {
    id: serial('id').primaryKey(),
    date: date('date').notNull().unique(),
    totalUsers: integer('total_users').notNull(),
    activeSessions: integer('active_sessions').notNull(),
    revenue: real('revenue').notNull(),
    conversionRate: real('conversion_rate').notNull()
})

// ─── Revenue By Day ───────────────────────────────────────────────────────────
export const revenueByDay = pgTable('revenue_by_day', {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    channel: text('channel').notNull(),   // 'direct' | 'social' | 'organic' | 'referral'
    amount: real('amount').notNull()
})

// ─── TypeScript Types ─────────────────────────────────────────────────────────
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type PageEvent = typeof pageEvents.$inferSelect
export type DailyMetric = typeof dailyMetrics.$inferSelect
export type RevenueEntry = typeof revenueByDay.$inferSelect
