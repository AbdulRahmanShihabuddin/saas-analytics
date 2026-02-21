/**
 * GET /api/auth/me
 * 
 * Returns the current user based on the auth token.
 * Used to restore session on page load.
 */

import type { User, AuthResponse } from '~/types'

// Same mock user data as login - in production, this would be a database lookup
const MOCK_USERS: Record<string, User> = {
    '1': {
        id: '1',
        email: 'demo@example.com',
        name: 'Alex Johnson',
        role: 'admin',
        avatar: undefined,
        createdAt: '2024-01-15T10:00:00Z'
    },
    '2': {
        id: '2',
        email: 'viewer@example.com',
        name: 'Sam Wilson',
        role: 'viewer',
        avatar: undefined,
        createdAt: '2024-02-20T10:00:00Z'
    }
}

export default defineEventHandler((event): AuthResponse => {
    const token = getCookie(event, 'auth-token')

    if (!token) {
        return {
            success: false,
            message: 'Not authenticated'
        }
    }

    // Parse mock token to get user ID
    // Format: mock-jwt-{userId}-{timestamp}
    const parts = token.split('-')
    const userId: string | undefined = parts[2]

    if (!userId) {
        return {
            success: false,
            message: 'Invalid token format'
        }
    }

    // Cast explicitly — TS doesn't narrow string | undefined via truthy guard on array access
    const user = MOCK_USERS[userId as string]

    if (!user) {
        return {
            success: false,
            message: 'Invalid token'
        }
    }

    return {
        success: true,
        user
    }
})
