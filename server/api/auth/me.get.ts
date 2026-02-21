/**
 * GET /api/auth/me
 * 
 * Restores session from cookie by fetching the live user from Neon.
 */

import { db } from '../../db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import type { AuthResponse } from '../../../app/types'

export default defineEventHandler(async (event): Promise<AuthResponse> => {
    const token = getCookie(event, 'auth-token')

    if (!token) {
        return { success: false, message: 'Not authenticated' }
    }

    // Parse user ID from token (format: mock-jwt-{userId}-{timestamp})
    const parts = token.split('-')
    const userId = parts[2] ? parseInt(parts[2], 10) : NaN

    if (isNaN(userId)) {
        return { success: false, message: 'Invalid token format' }
    }

    // Fetch live user from DB
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1)

    if (!user) {
        return { success: false, message: 'User not found' }
    }

    return {
        success: true,
        user: {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role as 'admin' | 'viewer',
            createdAt: user.createdAt.toISOString()
        }
    }
})
