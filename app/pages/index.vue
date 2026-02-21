<!--
  Landing Page
  
  Public facing entrance.
  Demonstrates SSR speed and clean design.
  Sections: Navbar, Hero, Stats, Features, Dashboard Preview, Footer
-->

<script setup lang="ts">
const { isAuthenticated } = useAuth()

useSeoMeta({
  title: 'Modern SaaS Analytics — Track Your Growth',
  description: 'Real-time analytics dashboard built with Nuxt 3, SSR, and TypeScript. Monitor metrics, visualize trends, and grow your business.'
})

const features = [
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Real-time Analytics',
    description: 'Track page views, sessions, and conversions as they happen with sub-second latency.'
  },
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Interactive Charts',
    description: 'Custom SVG charts with tooltips, area fills, and smooth animations — no external libraries.'
  },
  {
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    title: 'Secure Auth Flow',
    description: 'Cookie-based JWT auth with SSR session restoration and protected route middleware.'
  },
  {
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2',
    title: 'Server-Side Rendered',
    description: 'Full SSR with Nuxt 3 — SEO-friendly, instant first paint, and smooth client hydration.'
  },
  {
    icon: 'M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M10 11h4M9 3h6l1 4H8L9 3z',
    title: 'TypeScript First',
    description: 'End-to-end type safety from API responses to template bindings with strict TS config.'
  },
  {
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    title: 'Responsive Layout',
    description: 'Mobile-first design with collapsible sidebar, responsive grids, and adaptive typography.'
  }
]

const stats = [
  { value: '12K+', label: 'Active Users' },
  { value: '99.9%', label: 'Uptime' },
  { value: '50M+', label: 'Events / Day' },
  { value: '<100ms', label: 'Avg Response' }
]
</script>

<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="landing-nav">
      <div class="nav-inner">
        <div class="nav-brand">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
            <path d="M12 28V18L20 12L28 18V28H22V22H18V28H12Z" fill="white"/>
          </svg>
          <span class="font-semibold">SaaS Analytics</span>
        </div>
        <div class="nav-actions">
          <NuxtLink 
            :to="isAuthenticated ? '/dashboard' : '/login'" 
            class="btn btn-primary btn-sm"
          >
            {{ isAuthenticated ? 'Dashboard' : 'Sign In' }}
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-content animate-slideUp">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Built with Nuxt 3 + TypeScript
        </div>
        
        <h1 class="hero-title">
          Insightful Analytics<br>
          <span class="hero-gradient">for Modern SaaS</span>
        </h1>
        
        <p class="hero-subtitle">
          Monitor your metrics in real-time. Server-side rendered for speed, 
          typed for safety, designed for clarity.
        </p>
        
        <div class="hero-cta">
          <NuxtLink 
            :to="isAuthenticated ? '/dashboard' : '/login'" 
            class="btn btn-primary btn-lg"
          >
            {{ isAuthenticated ? 'Go to Dashboard' : 'Get Started Free' }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
          
          <a href="https://github.com" target="_blank" class="btn btn-secondary btn-lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Source
          </a>
        </div>
      </div>
      
      <div class="bg-glow"></div>
    </section>

    <!-- Stats Bar -->
    <section class="stats-bar">
      <div class="stats-inner">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features-section">
      <div class="features-inner">
        <div class="features-header">
          <h2 class="features-title">Everything you need to grow</h2>
          <p class="features-subtitle">
            A full-stack analytics platform built with modern web technologies
          </p>
        </div>
        
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path :d="feature.icon"/>
              </svg>
            </div>
            <h3 class="feature-name">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-inner">
        <h2 class="cta-title">Ready to see your data clearly?</h2>
        <p class="cta-subtitle">Try the demo dashboard — no signup required.</p>
        <NuxtLink to="/login" class="btn btn-primary btn-lg">
          Launch Demo Dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
            <path d="M12 28V18L20 12L28 18V28H22V22H18V28H12Z" fill="white"/>
          </svg>
          <span class="text-sm text-secondary">
            SaaS Analytics · Built with Nuxt 3, Vue 3, TypeScript
          </span>
        </div>
        <div class="text-xs text-muted">
          © 2024 SaaS Analytics Dashboard. A portfolio project.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

/* Navbar */
.landing-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-sticky);
  background-color: rgba(15, 15, 17, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-4) var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  color: var(--color-text-primary);
}

/* Hero */
.hero {
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-16) var(--spacing-6);
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 720px;
  text-align: center;
  position: relative;
  z-index: 10;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-8);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-success);
  animation: pulse 2s ease-in-out infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--color-text-primary);
  letter-spacing: -0.03em;
  margin-bottom: var(--spacing-6);
}

.hero-gradient {
  background-image: linear-gradient(135deg, var(--color-primary) 0%, #a5b4fc 50%, #818cf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 560px;
  margin: 0 auto var(--spacing-8);
}

.hero-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.bg-glow {
  position: absolute;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(0, 0, 0, 0) 70%);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

/* Stats */
.stats-bar {
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
}

.stats-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: var(--spacing-8) var(--spacing-6);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-1);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

/* Features */
.features-section {
  padding: var(--spacing-16) var(--spacing-6);
}

.features-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.features-header {
  text-align: center;
  margin-bottom: var(--spacing-12);
}

.features-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
}

.features-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
}

.feature-card {
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-secondary);
  transition: all var(--transition-base);
}

.feature-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(99, 102, 241, 0.1);
}

.feature-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background-color: rgba(99, 102, 241, 0.1);
  margin-bottom: var(--spacing-4);
}

.feature-icon svg {
  width: 20px;
  height: 20px;
  stroke: var(--color-primary);
}

.feature-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-2);
}

.feature-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* CTA */
.cta-section {
  padding: var(--spacing-16) var(--spacing-6);
}

.cta-inner {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: var(--spacing-12) var(--spacing-8);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-elevated));
}

.cta-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-3);
}

.cta-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-6);
}

/* Footer */
.landing-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-6);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-inner {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-6);
  }
  
  .footer-inner {
    flex-direction: column;
    gap: var(--spacing-3);
    text-align: center;
  }
}
</style>
