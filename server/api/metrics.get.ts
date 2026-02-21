/**
 * GET /api/metrics
 * 
 * Returns mock dashboard metrics and chart data.
 * Simulates real-time analytics data.
 */

import type { DashboardData } from '~/types'

export default defineEventHandler((event): DashboardData => {
    // Simulate delay
    // await new Promise(resolve => setTimeout(resolve, 500))

    return {
        metrics: [
            {
                id: 'total-users',
                label: 'Total Users',
                value: 12453,
                previousValue: 11200,
                format: 'number',
                trend: 'up',
                trendPercentage: 11.2
            },
            {
                id: 'active-sessions',
                label: 'Active Sessions',
                value: 432,
                previousValue: 450,
                format: 'number',
                trend: 'down',
                trendPercentage: 4.1
            },
            {
                id: 'revenue',
                label: 'Revenue',
                value: 45231.89,
                previousValue: 38200.00,
                format: 'currency',
                trend: 'up',
                trendPercentage: 18.4
            },
            {
                id: 'conversion-rate',
                label: 'Conversion Rate',
                value: 2.4,
                previousValue: 2.1,
                format: 'percentage',
                trend: 'up',
                trendPercentage: 14.3
            }
        ],
        chartData: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
                {
                    name: 'Revenue',
                    data: [4500, 5200, 4900, 6100, 5800, 7200, 6900],
                    color: 'var(--color-primary)'
                },
                {
                    name: 'Visitors',
                    data: [2100, 2400, 2200, 2800, 2600, 3100, 2900],
                    color: 'var(--color-info)'
                }
            ]
        },
        revenueByChannel: [
            { label: 'Direct', value: 45 },
            { label: 'Social', value: 25 },
            { label: 'Organic', value: 20 },
            { label: 'Referral', value: 10 }
        ]
    }
})
