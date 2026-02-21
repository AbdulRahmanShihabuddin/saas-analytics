<!--
  Login Page
  
  Clean, centered login form with error handling.
  Redirects to dashboard or intended destination after successful login.
-->

<script setup lang="ts">
// SEO metadata for login page
useSeoMeta({
  title: 'Login | SaaS Analytics',
  description: 'Sign in to access your analytics dashboard'
})

const { login, isLoading, isAuthenticated } = useAuth()
const route = useRoute()

// Form state
const email = ref('demo@example.com') // Pre-filled for demo
const password = ref('password123')
const error = ref('')
const showPassword = ref(false)

// Redirect if already authenticated
watch(isAuthenticated, (authenticated) => {
  if (authenticated) {
    const redirect = route.query.redirect as string
    navigateTo(redirect || '/dashboard')
  }
}, { immediate: true })

// Handle form submission
const handleSubmit = async () => {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Please enter both email and password'
    return
  }

  const result = await login({
    email: email.value,
    password: password.value
  })

  if (!result.success) {
    error.value = result.error || 'Login failed'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Branding -->
      <div class="login-header">
        <div class="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
            <path d="M12 28V18L20 12L28 18V28H22V22H18V28H12Z" fill="white"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold">Welcome back</h1>
        <p class="text-secondary">Sign in to your analytics dashboard</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleSubmit" class="login-form">
        <!-- Error Alert -->
        <div v-if="error" class="error-alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"/>
          </svg>
          {{ error }}
        </div>

        <!-- Email Input -->
        <div class="form-group">
          <label for="email" class="label">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="input"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>

        <!-- Password Input -->
        <div class="form-group">
          <label for="password" class="label">Password</label>
          <div class="password-input-wrapper">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="input"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
            <button
              type="button"
              class="password-toggle"
              @click="showPassword = !showPassword"
              aria-label="Toggle password visibility"
            >
              <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary btn-lg w-full"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </button>

        <!-- Demo Hint -->
        <div class="demo-hint">
          <p class="text-sm text-muted text-center">
            Demo credentials are pre-filled. Just click "Sign in"!
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
}

.login-container {
  width: 100%;
  max-width: 400px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  animation: slideUp var(--transition-slow);
}

.login-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-4);
}

.login-header h1 {
  margin-bottom: var(--spacing-2);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
}

.form-group {
  display: flex;
  flex-direction: column;
}

.password-input-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  transition: color var(--transition-fast);
}

.password-toggle:hover {
  color: var(--color-text-primary);
}

.error-alert {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  color: var(--color-error);
  font-size: var(--font-size-sm);
}

.demo-hint {
  margin-top: var(--spacing-2);
  padding: var(--spacing-3);
  background-color: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

/* Loading spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 480px) {
  .login-container {
    padding: var(--spacing-6);
  }
}
</style>
