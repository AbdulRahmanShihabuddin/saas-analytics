/**
 * API Types
 * 
 * Generic API response wrappers for consistent error handling.
 */

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: {
        message: string
        code?: string
    }
}

export interface ApiError {
    message: string
    statusCode: number
    code?: string
}
