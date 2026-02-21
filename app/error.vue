<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="error-page">
    <div class="card text-center max-w-md w-full">
      <div class="mb-6 flex justify-center text-primary/20">
        <svg v-if="error?.statusCode === 404" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <svg v-else width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>

      <h1 class="text-4xl font-bold mb-2">{{ error?.statusCode }}</h1>
      <p class="text-xl font-medium mb-4">{{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}</p>
      
      <p class="text-secondary mb-8">
        {{ error?.message || 'We couldn\'t find the page you were looking for.' }}
      </p>

      <button @click="handleError" class="btn btn-primary btn-lg w-full">
        Return Home
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-primary);
  padding: var(--spacing-6);
}
</style>
