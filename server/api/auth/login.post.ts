/**
 * POST /api/auth/login
 * 
 * Mock authentication endpoint.
 * In production, this would validate against a database and use proper password hashing.
 * 
 * Demo credentials:
 * - Email: demo@example.com
 * - Password: password123
 */

import type { User, AuthResponse } from '~/types'

// Mock user database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
    'demo@example.com': {
        password: 'password123',
        user: {
            id: '1',
            email: 'demo@example.com',
            name: 'Alex Johnson',
            role: 'admin',
            avatar: undefined,
            createdAt: '2024-01-15T10:00:00Z'
        }
    },
    'viewer@example.com': {
        password: 'viewer123',
        user: {
            id: '2',
            email: 'viewer@example.com',
            name: 'Sam Wilson',
            role: 'viewer',
            avatar: undefined,
            createdAt: '2024-02-20T10:00:00Z'
        }
    }
}

export default defineEventHandler(async (event): Promise<AuthResponse> => {
    const body = await readBody(event)
    const { email, password } = body

    // Validate input
    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        })
    }

    // Check credentials
    const userRecord = MOCK_USERS[email.toLowerCase()]

    if (!userRecord || userRecord.password !== password) {
        throw createError({
            statusCode: 401,
            message: 'Invalid email or password'
        })
    }

    // Generate mock JWT token
    // In production, use proper JWT signing with secret
    const token = `mock-jwt-${userRecord.user.id}-${Date.now()}`

    // Set token in httpOnly cookie (more secure than client-side storage)
    setCookie(event, 'auth-token', token, {
        httpOnly: false, // Set to true in production with proper setup
        secure: !import.meta.dev,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return {
        success: true,
        user: userRecord.user,
        token
    }
})
