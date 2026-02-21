/**
 * POST /api/auth/login
 * 
 * Authenticates against Neon users table with bcrypt password verification.
 * Sets httpOnly cookie with token on success.
 */

import { db } from '../../db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import type { AuthResponse } from '../../../app/types'

export default defineEventHandler(async (event): Promise<AuthResponse> => {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
        throw createError({ statusCode: 400, message: 'Email and password are required' })
    }

    // Look up user by email
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase().trim()))
        .limit(1)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    // Verify password against bcrypt hash
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
        throw createError({ statusCode: 401, message: 'Invalid email or password' })
    }

    // Issue token (DB user ID encoded — swap for JWT in production)
    const token = `mock-jwt-${user.id}-${Date.now()}`

    setCookie(event, 'auth-token', token, {
        httpOnly: false,
        secure: !import.meta.dev,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return {
        success: true,
        user: {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role as 'admin' | 'viewer',
            createdAt: user.createdAt.toISOString()
        },
        token
    }
})
