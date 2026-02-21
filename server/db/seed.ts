/**
 * Database Seed Script
 * 
 * Populates all tables with realistic demo data.
 * Run after migration: npx tsx server/db/seed.ts
 */

import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { users, pageEvents, dailyMetrics, revenueByDay } from './schema'
import bcrypt from 'bcrypt'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

function dateStr(daysAgo: number): string {
    const d = new Date()
    d.setDate(d.getDate() - daysAgo)
    return d.toISOString().split('T')[0]!
}

function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randFloat(min: number, max: number) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

const PAGES = [
    '/dashboard', '/pricing', '/features/analytics', '/features/reports',
    '/blog/getting-started', '/blog/best-practices', '/docs/api-reference',
    '/docs/authentication', '/about', '/contact', '/careers',
    '/integrations/slack', '/integrations/zapier', '/changelog',
    '/security', '/terms', '/privacy', '/signup', '/login', '/demo'
]

async function seed() {
    console.log('🌱 Starting seed...')

    // Clear existing data
    await db.delete(revenueByDay)
    await db.delete(dailyMetrics)
    await db.delete(pageEvents)
    await db.delete(users)
    console.log('  ✓ Cleared tables')

    // Users
    const adminHash = await bcrypt.hash('password123', 10)
    const viewerHash = await bcrypt.hash('viewer123', 10)

    await db.insert(users).values([
        { email: 'demo@example.com', passwordHash: adminHash, name: 'Alex Johnson', role: 'admin', createdAt: new Date('2024-01-15T10:00:00Z') },
        { email: 'viewer@example.com', passwordHash: viewerHash, name: 'Sam Wilson', role: 'viewer', createdAt: new Date('2024-02-20T10:00:00Z') }
    ])
    console.log('  ✓ 2 users')

    // Page events
    await db.insert(pageEvents).values(
        Array.from({ length: 50 }, (_, i) => ({
            page: PAGES[i % PAGES.length]!,
            views: rand(200, 8000),
            uniqueVisitors: rand(100, 5000),
            bounceRate: rand(15, 75),
            avgDurationSec: rand(0, 5) * 60 + rand(0, 59),
            conversions: rand(0, 120),
            recordedAt: dateStr(rand(0, 29))
        }))
    )
    console.log('  ✓ 50 page events')

    // Daily metrics — realistic growth curve over 31 days
    let baseUsers = 10800
    let baseRevenue = 38000
    await db.insert(dailyMetrics).values(
        Array.from({ length: 31 }, (_, i) => {
            const daysAgo = 30 - i
            baseUsers += rand(30, 120)
            baseRevenue += randFloat(200, 900)
            return {
                date: dateStr(daysAgo),
                totalUsers: baseUsers,
                activeSessions: rand(280, 650),
                revenue: parseFloat(baseRevenue.toFixed(2)),
                conversionRate: randFloat(1.8, 3.2)
            }
        })
    )
    console.log('  ✓ 31 daily metrics')

    // Revenue by channel — 30 days × 4 channels
    const channels = ['direct', 'social', 'organic', 'referral']
    const weights = [0.45, 0.25, 0.20, 0.10]
    const revRows = []
    for (let d = 29; d >= 0; d--) {
        const total = randFloat(800, 2200)
        for (let c = 0; c < channels.length; c++) {
            revRows.push({ date: dateStr(d), channel: channels[c]!, amount: parseFloat((total * weights[c]!).toFixed(2)) })
        }
    }
    await db.insert(revenueByDay).values(revRows)
    console.log('  ✓ 120 revenue entries')

    console.log('\n✅ Seed complete!')
    process.exit(0)
}

seed().catch(err => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
})
