<!--
  Dashboard Layout
  
  Wrapper for authenticated dashboard pages.
  Manages sidebar state and main content area.
-->

<script setup lang="ts">
import Sidebar from '~/components/layout/Sidebar.vue'
import Header from '~/components/layout/Header.vue'

const isSidebarOpen = ref(false)
const route = useRoute()

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  isSidebarOpen.value = false
})
</script>

<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <Sidebar :open="isSidebarOpen" />
    
    <!-- Mobile overlay -->
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay lg-hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <div class="main-wrapper">
      <Header @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      
      <main class="content-area">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

.main-wrapper {
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: margin-left var(--transition-base);
}

.content-area {
  flex: 1;
  padding: var(--spacing-6);
  max-width: var(--max-content-width);
  margin: 0 auto;
  width: 100%;
}

.sidebar-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: calc(var(--z-sticky) - 1);
  backdrop-filter: blur(2px);
}

@media (max-width: 1024px) {
  .main-wrapper {
    margin-left: 0;
  }
}
</style>
