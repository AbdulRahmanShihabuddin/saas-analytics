<!--
  Line Chart Component
  
  Pure SVG implementation without external charting libraries.
  Demonstrates understanding of SVGs, coordinate systems, and reactive state.
-->

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  data: number[]
  labels: string[]
  color?: string
  height?: number
  strokeWidth?: number
  showArea?: boolean
}>()

const width = 100 // Use percentage based viewbox
const height = props.height || 50
const padding = 5

// Determine max value for scaling y-axis
const max = computed(() => Math.max(...props.data) * 1.1) // 10% headroom
const min = computed(() => Math.min(...props.data) * 0.9)

// Helper to map data point to SVG coordinate
const getX = (index: number) => {
  return (index / (props.data.length - 1)) * (width - 2 * padding) + padding
}

const getY = (value: number) => {
  const range = max.value - min.value
  const normalized = (value - min.value) / (range || 1) // Prevent div by zero
  // SVG y coordinates are inverted (0 is top)
  return height - padding - (normalized * (height - 2 * padding))
}

// Generate the SVG path data "d"
const pathD = computed(() => {
  if (!props.data.length) return ''
  
  return props.data.reduce((acc, point, index) => {
    const x = getX(index)
    const y = getY(point)
    return index === 0 ? `M ${x},${y}` : `${acc} L ${x},${y}`
  }, '')
})

// Generate fill area path (closed loop)
const areaPathD = computed(() => {
  if (!pathD.value) return ''
  const firstX = getX(0)
  const lastX = getX(props.data.length - 1)
  const bottomY = height - padding
  
  return `${pathD.value} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`
})

const points = computed(() => {
  return props.data.map((value, index) => ({
    x: getX(index),
    y: getY(value),
    value,
    label: props.labels[index] as string | undefined
  }))
})

// Tooltip state — ref must be declared BEFORE computed that uses it
const activePoint = ref<number | null>(null)

interface TooltipData {
  x: number
  y: number
  label: string | undefined
  value: number
}

const activePointData = computed((): TooltipData | null => {
  if (activePoint.value === null) return null
  const idx = activePoint.value
  const pt = points.value[idx]
  if (!pt) return null
  return {
    x: pt.x,
    y: pt.y,
    label: props.labels[idx],
    value: props.data[idx] as number
  }
})
</script>

<template>
  <div class="chart-container" @mouseleave="activePoint = null">
    <svg 
      viewBox="0 0 100 50" 
      preserveAspectRatio="none" 
      class="chart-svg"
    >
      <!-- Gradient Definition -->
      <defs>
        <linearGradient :id="`gradient-${$.uid}`" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" :stop-color="color || 'var(--color-primary)'" stop-opacity="0.2"/>
          <stop offset="100%" :stop-color="color || 'var(--color-primary)'" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Grid Lines (Horizontal) -->
      <line 
        x1="0" y1="50%" x2="100" y2="50%" 
        stroke="var(--color-border)" 
        stroke-width="0.5" 
        stroke-dasharray="2 2"
      />

      <!-- Area Fill -->
      <path 
        v-if="showArea"
        :d="areaPathD" 
        :fill="`url(#gradient-${$.uid})`" 
        class="chart-area"
      />

      <!-- Line Path -->
      <path 
        :d="pathD" 
        fill="none" 
        :stroke="color || 'var(--color-primary)'" 
        :stroke-width="strokeWidth || 1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="chart-line"
      />
      
      <!-- Interactive Points -->
      <g v-for="(point, index) in points" :key="index">
        <!-- Hit area -->
        <circle 
          :cx="point.x" 
          :cy="point.y" 
          r="3" 
          fill="transparent" 
          @mouseenter="activePoint = index"
          class="cursor-crosshair"
        />
        
        <!-- Visible dot on active -->
        <circle 
          v-if="activePoint === index"
          :cx="point.x" 
          :cy="point.y" 
          r="1.5" 
          :fill="color || 'var(--color-primary)'" 
          stroke="var(--color-bg-secondary)"
          stroke-width="0.5"
        />
      </g>
    </svg>

    <!-- HTML Tooltip overlay -->
    <div 
      v-if="activePointData" 
      class="tooltip"
      :style="{ left: `${activePointData.x}%`, top: `${activePointData.y}%` }"
    >
      <div class="tooltip-content">
        <div class="text-xs text-secondary mb-1">{{ activePointData.label }}</div>
        <div class="text-sm font-bold">{{ activePointData.value.toLocaleString() }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 25px;
}

.chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.chart-line {
  vector-effect: non-scaling-stroke;
  animation: draw 1s ease-out forwards;
}

.chart-area {
  animation: fadeIn 1s ease-out forwards;
}

@keyframes draw {
  from { stroke-dasharray: 0 1000; }
  to { stroke-dasharray: 1000 0; }
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
