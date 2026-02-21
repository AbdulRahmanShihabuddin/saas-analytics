/**
 * Authentication Types
 * 
 * Defines the shape of auth-related data throughout the application.
 */

export interface User {
    id: string
    email: string
    name: string
    role: 'admin' | 'user' | 'viewer'
    avatar?: string
    createdAt: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    user?: User
    token?: string
    message?: string
}

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}
