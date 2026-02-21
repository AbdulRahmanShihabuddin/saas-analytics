<!--
  Sidebar Navigation
  
  Vertical navigation menu for the dashboard.
  Highlights active route.
-->

<script setup lang="ts">
const props = defineProps<{
  open?: boolean
}>()

const route = useRoute()

const links = [
  { name: 'Overview', path: '/dashboard', icon: 'M3 10l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
  { name: 'Analytics', path: '/dashboard/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z' },
  { name: 'Reports', path: '/dashboard/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Settings', path: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
]

// Helper to check active state
const isActive = (path: string) => {
  if (path === '/dashboard') return route.path === path
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="sidebar" :class="{ 'mobile-open': open }">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="logo">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="var(--color-primary)"/>
          <path d="M12 28V18L20 12L28 18V28H22V22H18V28H12Z" fill="white"/>
        </svg>
        <span class="logo-text">SaaS Analytics</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="link in links" :key="link.path">
          <NuxtLink 
            :to="link.path" 
            class="nav-link"
            :class="{ active: isActive(link.path) }"
          >
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="link.icon"/>
            </svg>
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="sidebar-footer">
      <div class="user-mini-profile">
        <span class="text-xs text-muted">v1.0.0</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border);
  z-index: var(--z-sticky);
}

.sidebar-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

.sidebar-nav {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
}

.nav-link:hover {
  background-color: var(--color-bg-tertiary);
  color: var(--color-text-primary);
}

.nav-link.active {
  background-color: var(--color-bg-elevated);
  color: var(--color-primary);
}

.nav-link.active .nav-icon {
  stroke: var(--color-primary);
}

.nav-icon {
  width: 20px;
  height: 20px;
}

.sidebar-footer {
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--color-border);
}

@media (max-width: 1024px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform var(--transition-base);
    width: 260px;
  }
  
  .sidebar.mobile-open {
    transform: translateX(0);
  }
}
</style>
