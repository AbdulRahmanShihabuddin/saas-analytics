/**
 * POST /api/auth/logout
 * 
 * Clears the auth cookie to log out the user.
 */

export default defineEventHandler((event) => {
    // Clear the auth token cookie
    deleteCookie(event, 'auth-token')

    return {
        success: true,
        message: 'Logged out successfully'
    }
})
