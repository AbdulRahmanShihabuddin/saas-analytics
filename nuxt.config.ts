// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  // Enable SSR (default, but explicit for clarity)
  ssr: true,

  devtools: { enabled: true },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Run via `npx nuxi typecheck` in CI instead
  },

  // App configuration
  app: {
    head: {
      title: 'SaaS Analytics Dashboard',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A production-grade analytics dashboard with SSR, authentication, and data visualization'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Inter font for clean typography
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Runtime config for environment variables
  runtimeConfig: {
    // Server-only secrets
    jwtSecret: 'dev-secret-key-change-in-production',

    // Public config exposed to client
    public: {
      appName: 'SaaS Analytics'
    }
  }
})
