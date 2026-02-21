/**
 * GET /api/analytics
 * 
 * Returns paginated, searchable, sortable table data.
 * Supports: page, pageSize, q (search), sort, order query params.
 */

import type { AnalyticsTableRow, PaginatedResponse } from '~/types'

// Diverse page paths for realistic mock data
const PAGES = [
    '/dashboard', '/pricing', '/features/analytics', '/features/reports',
    '/blog/getting-started', '/blog/best-practices', '/docs/api-reference',
    '/docs/authentication', '/about', '/contact', '/careers',
    '/integrations/slack', '/integrations/zapier', '/changelog',
    '/security', '/terms', '/privacy', '/signup', '/login', '/demo'
]

// Seeded mock data with diverse paths
const MOCK_DATA: AnalyticsTableRow[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `row-${i}`,
    page: PAGES[i % PAGES.length] as string,
    views: Math.floor(Math.random() * 8000) + 200,
    uniqueVisitors: Math.floor(Math.random() * 5000) + 100,
    bounceRate: Math.floor(Math.random() * 65) + 15,
    avgDuration: `${Math.floor(Math.random() * 5)}m ${Math.floor(Math.random() * 60)}s`,
    conversions: Math.floor(Math.random() * 80)
}))

export default defineEventHandler((event): PaginatedResponse<AnalyticsTableRow> => {
    const query = getQuery(event)
    const page = Number(query.page) || 1
    const pageSize = Number(query.pageSize) || 10
    const searchQuery = (query.q as string || '').toLowerCase()
    const sortKey = query.sort as string || ''
    const sortOrder = query.order as string || 'asc'

    // Filter by search query
    let filtered = MOCK_DATA
    if (searchQuery) {
        filtered = filtered.filter(row => row.page.toLowerCase().includes(searchQuery))
    }

    // Sort if requested
    if (sortKey && sortKey in filtered[0]!) {
        filtered = [...filtered].sort((a, b) => {
            const aVal = (a as any)[sortKey]
            const bVal = (b as any)[sortKey]
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'desc' ? bVal - aVal : aVal - bVal
            }
            return sortOrder === 'desc'
                ? String(bVal).localeCompare(String(aVal))
                : String(aVal).localeCompare(String(bVal))
        })
    }

    // Paginate
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const data = filtered.slice(start, end)

    return {
        data,
        meta: {
            total: filtered.length,
            page,
            pageSize,
            totalPages: Math.ceil(filtered.length / pageSize)
        }
    }
})
