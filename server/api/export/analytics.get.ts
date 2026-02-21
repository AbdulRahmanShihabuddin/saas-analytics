/**
 * GET /api/export/analytics
 * 
 * Streams all page_events rows as a CSV file download.
 * Respects optional ?q= search filter to match the analytics page.
 */

import { db } from '../../db'
import { pageEvents } from '../../db/schema'
import { ilike } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const searchQuery = (query.q as string || '').trim()

    const whereClause = searchQuery
        ? ilike(pageEvents.page, `%${searchQuery}%`)
        : undefined

    const rows = await db
        .select()
        .from(pageEvents)
        .where(whereClause)
        .orderBy(pageEvents.views)

    // Build CSV
    const headers = ['Page', 'Views', 'Unique Visitors', 'Bounce Rate (%)', 'Avg Duration (s)', 'Conversions']
    const csvRows = rows.map(r =>
        [
            `"${r.page}"`,
            r.views,
            r.uniqueVisitors,
            r.bounceRate,
            r.avgDurationSec,
            r.conversions
        ].join(',')
    )

    const csv = [headers.join(','), ...csvRows].join('\n')
    const filename = `analytics-export-${new Date().toISOString().split('T')[0]}.csv`

    setHeader(event, 'Content-Type', 'text/csv')
    setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)

    return csv
})
