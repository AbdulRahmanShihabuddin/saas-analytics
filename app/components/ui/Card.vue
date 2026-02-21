<!--
  Card Component
  
  Generic container with consistent styling.
  Supports an optional header slot.
-->

<script setup lang="ts">
defineProps<{
  title?: string
  noPadding?: boolean
}>()
</script>

<template>
  <div class="card">
    <!-- Header (Optional) -->
    <div v-if="title || $slots.header" class="card-header border-b mb-4 pb-4" :class="{ 'px-6 pt-6 mb-0 pb-0': noPadding }">
      <h3 v-if="title" class="text-lg font-semibold">{{ title }}</h3>
      <slot name="header"></slot>
    </div>
    
    <!-- Body -->
    <div :class="{ 'p-6': !noPadding }">
      <slot></slot>
    </div>
    
    <!-- Footer (Optional) -->
    <div v-if="$slots.footer" class="card-footer border-t mt-4 pt-4" :class="{ 'px-6 pb-6 mt-0 pt-0': noPadding }">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card-header, .card-footer {
  border-color: var(--color-border);
}
</style>
