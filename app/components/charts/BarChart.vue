<!--
  Bar Chart Component
  
  Pure SVG Bar Chart.
  Simple vertical bars with hover states.
-->

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  data: { label: string; value: number }[]
  color?: string
  height?: number
}>()

const width = 100
const height = props.height || 50
const padding = 5
const barGap = 2 // % gap

// Axis scaling
const max = computed(() => {
  if (!props.data.length) return 100
  return Math.max(...props.data.map(d => d.value)) * 1.1
})

const barWidth = computed(() => {
  if (!props.data.length) return 0
  const availableWidth = width - (2 * padding)
  return (availableWidth / props.data.length) - barGap
})

const bars = computed(() => {
  if (!props.data.length) return []
  
  return props.data.map((item, index) => {
    const barHeight = (item.value / max.value) * (height - 2 * padding)
    const x = padding + (index * (barWidth.value + barGap)) + (barGap / 2)
    const y = height - padding - barHeight
    
    return {
      x,
      y,
      width: barWidth.value,
      height: barHeight,
      value: item.value,
      label: item.label
    }
  })
})

// Tooltip state — keep ref declared BEFORE the computed that depends on it
const activeBar = ref<number | null>(null)

const activeBarData = computed(() => {
  if (activeBar.value === null) return null
  return bars.value[activeBar.value] ?? null
})
</script>

<template>
  <div class="chart-container" @mouseleave="activeBar = null">
    <svg 
      viewBox="0 0 100 50" 
      preserveAspectRatio="none" 
      class="chart-svg"
    >
      <!-- Bars -->
      <g v-for="(bar, index) in bars" :key="index">
        <rect
          :x="bar.x"
          :y="bar.y"
          :width="bar.width"
          :height="bar.height"
          :fill="color || 'var(--color-primary)'"
          rx="1"
          class="chart-bar"
          :class="{ 'active': activeBar === index }"
          @mouseenter="activeBar = index"
        />
      </g>

      <line 
        :x1="padding" :y1="height - padding" 
        :x2="width - padding" :y2="height - padding" 
        stroke="var(--color-border)" 
        stroke-width="0.5" 
      />
    </svg>

    <!-- Tooltip Overlay -->
    <div 
      v-if="activeBarData !== null" 
      class="tooltip"
      :style="{ left: `${activeBarData!.x + activeBarData!.width / 2}%`, top: `${activeBarData!.y}%` }"
    >
      <div class="tooltip-content">
        <div class="text-xs text-secondary mb-1">{{ activeBarData!.label }}</div>
        <div class="text-sm font-bold">{{ activeBarData!.value.toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.chart-bar {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.chart-bar:hover, .chart-bar.active {
  opacity: 1;
}

.tooltip {
  position: absolute;
  transform: translate(-50%, -120%);
  z-index: 10;
  pointer-events: none;
}

.tooltip-content {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: var(--shadow-lg);
  white-space: nowrap;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--color-bg-elevated) transparent transparent transparent;
}
</style>
