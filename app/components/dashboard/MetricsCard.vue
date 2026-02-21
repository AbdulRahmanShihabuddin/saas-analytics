<!--
  Metrics Card Component
  
  Displays a single key metric with trend indicator.
  Supports Number, Currency, and Percentage formatting.
  Accepts 'index' for stagger animation.
-->

<script setup lang="ts">
import type { MetricCard } from '~/types'

const props = defineProps<{
  metric: MetricCard
  loading?: boolean
  index?: number
}>()

const formattedValue = computed(() => {
  const { value, format } = props.metric
  
  if (format === 'currency') {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }
  
  if (format === 'percentage') {
    return `${value}%`
  }
  
  return new Intl.NumberFormat('en-US').format(value)
})

const trendColor = computed(() => {
  if (props.metric.trend === 'up') return 'text-success'
  if (props.metric.trend === 'down') return 'text-error'
  return 'text-muted'
})

const trendIcon = computed(() => {
  if (props.metric.trend === 'up') return 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  if (props.metric.trend === 'down') return 'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6'
  return 'M5 12h14'
})

const animDelay = computed(() => `${(props.index ?? 0) * 75}ms`)
</script>

<template>
  <div class="card metric-card" :style="{ animationDelay: animDelay }">
    <div v-if="loading" class="loading-skeleton">
      <div class="skeleton-line skeleton-sm"></div>
      <div class="skeleton-line skeleton-lg"></div>
      <div class="skeleton-line skeleton-sm"></div>
    </div>
    
    <div v-else>
      <div class="metric-header">
        <h3 class="metric-label">{{ metric.label }}</h3>
      </div>
      
      <div class="metric-value">
        {{ formattedValue }}
      </div>
      
      <div class="metric-trend">
        <span class="trend-indicator" :class="trendColor">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path :d="trendIcon"/>
          </svg>
          {{ metric.trendPercentage }}%
        </span>
        <span class="trend-context">vs last month</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metric-card {
  height: 100%;
  animation: cardSlideUp 0.4s ease both;
}

@keyframes cardSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.skeleton-line {
  border-radius: var(--radius-md);
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-elevated) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-sm {
  height: 1rem;
  width: 50%;
}

.skeleton-lg {
  height: 2rem;
  width: 75%;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2);
}

.metric-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.metric-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  letter-spacing: -0.025em;
}

.metric-trend {
  display: flex;
  align-items: center;
  font-size: var(--font-size-xs);
}

.trend-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: var(--font-weight-medium);
}

.trend-context {
  color: var(--color-text-muted);
  margin-left: var(--spacing-2);
}
</style>
