/**
 * useApi Composable
 * 
 * Abstraction layer for API calls with consistent error handling.
 * Uses Nuxt's $fetch which is SSR-compatible and auto-detects server/client.
 * 
 * Benefits:
 * - Centralized error handling
 * - Type-safe responses
 * - Automatic auth header injection
 */

import type { ApiResponse } from '~/types'

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    body?: Record<string, unknown>
    query?: Record<string, string | number>
}

export const useApi = () => {
    const token = useCookie<string | null>('auth-token')

    /**
     * Generic fetch wrapper with error handling
     */
    const fetch = async <T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<ApiResponse<T>> => {
        try {
            const response = await $fetch<ApiResponse<T>>(endpoint, {
                method: options.method || 'GET',
                body: options.body,
                query: options.query,
                headers: token.value
                    ? { Authorization: `Bearer ${token.value}` }
                    : undefined
            })

            return response
        } catch (error: any) {
            return {
                success: false,
                error: {
                    message: error.data?.message || error.message || 'Request failed',
                    code: error.statusCode?.toString()
                }
            }
        }
    }

    /**
     * GET request helper
     */
    const get = <T>(
        endpoint: string,
        query?: Record<string, string | number>
    ): Promise<ApiResponse<T>> => {
        return fetch<T>(endpoint, { method: 'GET', query })
    }

    /**
     * POST request helper
     */
    const post = <T>(
        endpoint: string,
        body: Record<string, unknown>
    ): Promise<ApiResponse<T>> => {
        return fetch<T>(endpoint, { method: 'POST', body })
    }

    /**
     * PUT request helper
     */
    const put = <T>(
        endpoint: string,
        body: Record<string, unknown>
    ): Promise<ApiResponse<T>> => {
        return fetch<T>(endpoint, { method: 'PUT', body })
    }

    /**
     * DELETE request helper
     */
    const del = <T>(endpoint: string): Promise<ApiResponse<T>> => {
        return fetch<T>(endpoint, { method: 'DELETE' })
    }

    return { fetch, get, post, put, del }
}
