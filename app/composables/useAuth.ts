/**
 * useAuth Composable
 * 
 * Manages authentication state using Nuxt's useState for SSR compatibility.
 * Token is stored in a cookie for server-side access during SSR.
 * 
 * Why this approach:
 * - useState is SSR-safe and shares state between server/client
 * - useCookie provides httpOnly-like security for tokens
 * - Centralized auth logic for consistency across components
 */

import type { User, LoginCredentials, AuthState } from '~/types'

export const useAuth = () => {
    const config = useRuntimeConfig()

    // Reactive auth state - persisted across SSR hydration
    const user = useState<User | null>('auth-user', () => null)
    const isLoading = useState<boolean>('auth-loading', () => false)

    // Token stored in cookie for SSR access
    // In production, this would be httpOnly and set by server
    const token = useCookie<string | null>('auth-token', {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'strict',
        secure: !import.meta.dev
    })

    const isAuthenticated = computed(() => !!user.value && !!token.value)

    /**
     * Login with email/password
     * Calls mock API and stores token + user data
     */
    const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
        isLoading.value = true

        try {
            const response = await $fetch('/api/auth/login', {
                method: 'POST',
                body: credentials
            })

            if (response.success && response.user && response.token) {
                user.value = response.user
                token.value = response.token
                return { success: true }
            }

            return { success: false, error: response.message || 'Login failed' }
        } catch (error: any) {
            return {
                success: false,
                error: error.data?.message || 'An error occurred during login'
            }
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Logout - clears user state and token
     */
    const logout = async (): Promise<void> => {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' })
        } catch {
            // Logout even if API call fails
        } finally {
            user.value = null
            token.value = null
            navigateTo('/login')
        }
    }

    /**
     * Initialize auth state from cookie on app load
     * Called in middleware or layout to restore session
     */
    const initAuth = async (): Promise<void> => {
        if (!token.value) return

        try {
            const response = await $fetch('/api/auth/me')
            if (response.success && response.user) {
                user.value = response.user
            } else {
                // Invalid token, clear session
                token.value = null
                user.value = null
            }
        } catch {
            token.value = null
            user.value = null
        }
    }

    return {
        user: readonly(user),
        isAuthenticated,
        isLoading: readonly(isLoading),
        login,
        logout,
        initAuth
    }
}
