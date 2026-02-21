/**
 * Metrics Types
 * 
 * Defines dashboard data structures for type-safe API responses.
 */

export interface MetricCard {
    id: string
    label: string
    value: number
    previousValue: number
    format: 'number' | 'currency' | 'percentage'
    trend: 'up' | 'down' | 'neutral'
    trendPercentage: number
}

export interface ChartDataPoint {
    label: string
    value: number
    date?: string
}

export interface TimeSeriesData {
    labels: string[]
    datasets: {
        name: string
        data: number[]
        color: string
    }[]
}

export interface AnalyticsTableRow {
    id: string
    page: string
    views: number
    uniqueVisitors: number
    bounceRate: number
    avgDuration: string
    conversions: number
}

export interface PaginatedResponse<T> {
    data: T[]
    meta: {
        total: number
        page: number
        pageSize: number
        totalPages: number
    }
}

export interface DateRange {
    start: Date
    end: Date
    preset?: '7d' | '30d' | '90d' | 'custom'
}

export interface DashboardData {
    metrics: MetricCard[]
    chartData: TimeSeriesData
    revenueByChannel: ChartDataPoint[]
}

export interface SortConfig {
    key: string
    direction: 'asc' | 'desc'
}

export interface FilterConfig {
    search: string
    dateRange: DateRange
    page: number
    pageSize: number
    sort: SortConfig
}
