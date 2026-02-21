/**
 * GET /api/metrics
 * 
 * Returns live dashboard metrics from Neon PostgreSQL.
 * Queries:
 *  - daily_metrics (latest row vs. previous row → trend)
 *  - revenue_by_day (last 7 days for line chart)
 *  - revenue_by_day (aggregated by channel for bar chart)
 */

import { db } from '../db'
import { dailyMetrics, revenueByDay } from '../db/schema'
import { desc, sql, gte } from 'drizzle-orm'
import type { DashboardData } from '../../app/types'

export default defineEventHandler(async (): Promise<DashboardData> => {
    // ── 1. Latest and previous day metrics for KPI cards ──────────────────
    const latestTwo = await db
        .select()
        .from(dailyMetrics)
        .orderBy(desc(dailyMetrics.date))
        .limit(2)

    const today = latestTwo[0]
    const yesterday = latestTwo[1]

    const trendPct = (curr: number, prev: number) =>
        prev > 0 ? parseFloat(((Math.abs(curr - prev) / prev) * 100).toFixed(1)) : 0

    const trendDir = (curr: number, prev: number): 'up' | 'down' | 'neutral' =>
        curr > prev ? 'up' : curr < prev ? 'down' : 'neutral'

    // ── 2. Last 7 days of revenue for line chart ───────────────────────────
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    const cutoff = sevenDaysAgo.toISOString().split('T')[0]!

    const revenueRows = await db
        .select({
            date: revenueByDay.date,
            total: sql<number>`SUM(${revenueByDay.amount})`
        })
        .from(revenueByDay)
        .where(gte(revenueByDay.date, cutoff))
        .groupBy(revenueByDay.date)
        .orderBy(revenueByDay.date)

    // Build aligned 7-day arrays
    const last7: string[] = Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return d.toISOString().split('T')[0]!
    })
    const dayLabels = last7.map(d => {
        const dt = new Date(d + 'T00:00:00')
        return dt.toLocaleDateString('en-US', { weekday: 'short' })
    })
    const revenueMap = Object.fromEntries(revenueRows.map(r => [r.date, Number(r.total)]))
    const revenueData = last7.map(d => revenueMap[d] ?? 0)

    // Dummy visitor data — proportional to revenue
    const visitorData = revenueData.map(r => Math.round(r * 0.42))

    // ── 3. Revenue by channel (all time totals) ────────────────────────────
    const channelRows = await db
        .select({
            channel: revenueByDay.channel,
            total: sql<number>`SUM(${revenueByDay.amount})`
        })
        .from(revenueByDay)
        .groupBy(revenueByDay.channel)
        .orderBy(sql`SUM(${revenueByDay.amount}) DESC`)

    const totalChannelRevenue = channelRows.reduce((acc, r) => acc + Number(r.total), 0)
    const revenueByChannel = channelRows.map(r => ({
        label: r.channel.charAt(0).toUpperCase() + r.channel.slice(1),
        value: totalChannelRevenue > 0
            ? Math.round((Number(r.total) / totalChannelRevenue) * 100)
            : 0
    }))

    // ── 4. Build response ─────────────────────────────────────────────────
    const prev = yesterday
    const curr = today

    return {
        metrics: [
            {
                id: 'total-users',
                label: 'Total Users',
                value: curr?.totalUsers ?? 0,
                previousValue: prev?.totalUsers ?? 0,
                format: 'number',
                trend: trendDir(curr?.totalUsers ?? 0, prev?.totalUsers ?? 0),
                trendPercentage: trendPct(curr?.totalUsers ?? 0, prev?.totalUsers ?? 0)
            },
            {
                id: 'active-sessions',
                label: 'Active Sessions',
                value: curr?.activeSessions ?? 0,
                previousValue: prev?.activeSessions ?? 0,
                format: 'number',
                trend: trendDir(curr?.activeSessions ?? 0, prev?.activeSessions ?? 0),
                trendPercentage: trendPct(curr?.activeSessions ?? 0, prev?.activeSessions ?? 0)
            },
            {
                id: 'revenue',
                label: 'Revenue',
                value: curr?.revenue ?? 0,
                previousValue: prev?.revenue ?? 0,
                format: 'currency',
                trend: trendDir(curr?.revenue ?? 0, prev?.revenue ?? 0),
                trendPercentage: trendPct(curr?.revenue ?? 0, prev?.revenue ?? 0)
            },
            {
                id: 'conversion-rate',
                label: 'Conversion Rate',
                value: curr?.conversionRate ?? 0,
                previousValue: prev?.conversionRate ?? 0,
                format: 'percentage',
                trend: trendDir(curr?.conversionRate ?? 0, prev?.conversionRate ?? 0),
                trendPercentage: trendPct(curr?.conversionRate ?? 0, prev?.conversionRate ?? 0)
            }
        ],
        chartData: {
            labels: dayLabels,
            datasets: [
                { name: 'Revenue', data: revenueData, color: 'var(--color-primary)' },
                { name: 'Visitors', data: visitorData, color: 'var(--color-info)' }
            ]
        },
        revenueByChannel
    }
})
