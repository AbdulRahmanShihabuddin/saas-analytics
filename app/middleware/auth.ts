/**
 * Auth Middleware
 * 
 * Protects routes that require authentication.
 * Runs on both server (SSR) and client for consistent behavior.
 * 
 * Why middleware over in-component checks:
 * - Runs before page component loads
 * - Prevents flash of protected content
 * - Server-side redirect for better SSR performance
 */

export default defineNuxtRouteMiddleware(async (to) => {
    const { isAuthenticated, initAuth } = useAuth()

    // Try to restore session from cookie
    await initAuth()

    // If not authenticated and trying to access protected route
    if (!isAuthenticated.value) {
        // Store intended destination for redirect after login
        const redirectTo = to.fullPath

        return navigateTo({
            path: '/login',
            query: redirectTo !== '/dashboard' ? { redirect: redirectTo } : undefined
        })
    }
})
