<!--
  Header Component
  
  Top navigation bar containing page title, search, and user profile.
  Includes mobile menu toggle.
-->

<script setup lang="ts">
const { user, logout } = useAuth()
const { theme, toggleTheme } = useTheme()

defineEmits(['toggle-sidebar'])
</script>

<template>
  <header class="header">
    <div class="header-left">
      <!-- Mobile Toggle -->
      <button class="menu-toggle lg-hidden" @click="$emit('toggle-sidebar')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Global Search -->
      <div class="search-wrapper md-flex hidden">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search analytics..." class="search-input">
      </div>
    </div>

    <!-- User Actions -->
    <div class="header-right">
      <div v-if="user" class="user-profile">
        <div class="user-info text-right md-flex hidden">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-role">{{ user.role }}</span>
        </div>
        <div class="avatar">
          {{ user.name.charAt(0) }}
        </div>
        
        <!-- Theme Toggle -->
        <button @click="toggleTheme" class="theme-toggle btn-ghost" :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
          <!-- Sun icon — shown in dark mode -->
          <svg v-if="theme === 'dark'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon — shown in light mode -->
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <!-- Logout button -->
        <button @click="logout" class="btn btn-ghost btn-sm" title="Sign out">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast), background-color var(--transition-fast);
  cursor: pointer;
}

.theme-toggle:hover {
  color: var(--color-text-primary);
  background-color: var(--color-bg-tertiary);
}

.header {
  height: var(--header-height);
  background-color: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-6);
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.menu-toggle {
  color: var(--color-text-secondary);
}

.search-wrapper {
  position: relative;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--spacing-3);
  color: var(--color-text-muted);
}

.search-input {
  background-color: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--spacing-2) var(--spacing-4) var(--spacing-2) var(--spacing-9);
  width: 280px;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  transition: all var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  width: 320px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.user-role {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: capitalize;
}

.avatar {
  width: 32px;
  height: 32px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
}
</style>
