/**
 * GET /api/analytics
 * 
 * Returns paginated, searchable, sortable page analytics from Neon.
 * Supports: page, pageSize, q (search), sort, order query params.
 */

import { db } from '../db'
import { pageEvents } from '../db/schema'
import { sql, ilike, asc, desc, count } from 'drizzle-orm'
import type { AnalyticsTableRow, PaginatedResponse } from '../../app/types'

export default defineEventHandler(async (event): Promise<PaginatedResponse<AnalyticsTableRow>> => {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10
    const searchQuery = (query.q as string || '').trim()
    const sortKey = (query.sort as string) || 'views'
    const sortOrder = (query.order as string) || 'desc'

    // Build WHERE clause
    const whereClause = searchQuery
        ? ilike(pageEvents.page, `%${searchQuery}%`)
        : undefined

    // Allowed sort columns (prevent SQL injection)
    const sortableColumns: Record<string, any> = {
        page: pageEvents.page,
        views: pageEvents.views,
        uniqueVisitors: pageEvents.uniqueVisitors,
        bounceRate: pageEvents.bounceRate,
        conversions: pageEvents.conversions,
        avgDurationSec: pageEvents.avgDurationSec,
    }
    const orderCol = sortableColumns[sortKey] ?? pageEvents.views
    const orderFn = sortOrder === 'asc' ? asc(orderCol) : desc(orderCol)

    // Count total matching rows
    const countResult = await db
        .select({ total: count() })
        .from(pageEvents)
        .where(whereClause)
    const total = countResult[0]?.total ?? 0


    // Fetch paginated rows
    const rows = await db
        .select()
        .from(pageEvents)
        .where(whereClause)
        .orderBy(orderFn)
        .limit(pageSize)
        .offset((page - 1) * pageSize)

    // Format avg duration as "Xm Xs" string
    const data: AnalyticsTableRow[] = rows.map(r => ({
        id: String(r.id),
        page: r.page,
        views: r.views,
        uniqueVisitors: r.uniqueVisitors,
        bounceRate: r.bounceRate,
        avgDuration: `${Math.floor(r.avgDurationSec / 60)}m ${r.avgDurationSec % 60}s`,
        conversions: r.conversions
    }))

    return {
        data,
        meta: {
            total: Number(total),
            page,
            pageSize,
            totalPages: Math.ceil(Number(total) / pageSize)
        }
    }
})
