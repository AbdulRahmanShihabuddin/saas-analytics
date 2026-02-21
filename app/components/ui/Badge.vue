<!--
  Badge Component
  
  Small status indicator with color variants.
  Variants: success, warning, error, info, neutral
-->

<script setup lang="ts">
interface Props {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  size?: 'sm' | 'md'
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'sm',
  dot: false
})
</script>

<template>
  <span :class="['ui-badge', `badge-${variant}`, `badge-${size}`]">
    <span v-if="dot" class="badge-dot" />
    <slot />
  </span>
</template>

<style scoped>
.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  border-radius: var(--radius-full);
  text-transform: capitalize;
  white-space: nowrap;
}

.badge-sm {
  font-size: 11px;
  padding: 2px 8px;
}

.badge-md {
  font-size: var(--font-size-xs);
  padding: 3px 10px;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}

.badge-success { background: rgba(16, 185, 129, 0.15); color: var(--color-success); }
.badge-warning { background: rgba(245, 158, 11, 0.15); color: var(--color-warning); }
.badge-error { background: rgba(239, 68, 68, 0.15); color: var(--color-error); }
.badge-info { background: rgba(59, 130, 246, 0.15); color: var(--color-info); }
.badge-neutral { background: var(--color-bg-tertiary); color: var(--color-text-secondary); }
</style>
