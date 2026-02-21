<!--
  Date Range Picker
  
  Dropdown UI for selecting preset date ranges.
  Emits date-change event.
-->

<script setup lang="ts">
const isOpen = ref(false)
const selectedRange = ref('Last 7 Days')
const emit = defineEmits(['update:range'])

const ranges = [
  'Today',
  'Yesterday',
  'Last 7 Days',
  'Last 30 Days',
  'Last 90 Days',
  'Year to Date'
]

const selectRange = (range: string) => {
  selectedRange.value = range
  isOpen.value = false
  emit('update:range', range)
}
</script>

<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen" 
      class="btn btn-secondary btn-sm flex items-center gap-2"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      {{ selectedRange }}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-1 opacity-50">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>

    <div 
      v-if="isOpen" 
      class="absolute right-0 mt-2 w-48 bg-elevated border border-border rounded-lg shadow-xl py-1 z-dropdown"
    >
      <div 
        v-for="range in ranges" 
        :key="range"
        class="px-4 py-2 hover:bg-tertiary cursor-pointer text-sm"
        :class="{ 'text-primary font-medium': selectedRange === range, 'text-secondary': selectedRange !== range }"
        @click="selectRange(range)"
      >
        {{ range }}
      </div>
    </div>
    
    <!-- Backdrop to close -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[90]" 
      @click="isOpen = false"
    ></div>
  </div>
</template>
