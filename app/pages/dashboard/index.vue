<!--
  Dashboard Home
  
  Authorized entry point.
  Fetches key metrics server-side (SSR) for immediate availability.
  Layout: 
  - Header with User info
  - Metrics Grid
  - Charts (Placeholder)
  - Recent Activity (Placeholder)
-->

<script setup lang="ts">
import type { DashboardData } from '~/types'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Dashboard | SaaS Analytics'
})

// SSR Data Fetching
const { data, pending, error } = await useAsyncData<DashboardData>('dashboard-metrics', () => 
  $fetch('/api/metrics')
)

// Refresh handler
const refreshDashboard = async () => {
  await refreshNuxtData('dashboard-metrics')
}

// Safely extract chart series for the line chart
const lineChartData = computed(() => data.value?.chartData.datasets[0]?.data ?? [])
const lineChartLabels = computed(() => data.value?.chartData.labels ?? [])
const barChartData = computed(() => data.value?.revenueByChannel ?? [])
</script>

<template>
  <div class="dashboard-page space-y-8">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-primary">Dashboard Overview</h1>
        <p class="text-secondary text-sm mt-1">Track your key performance indicators</p>
      </div>
      
      <div class="flex items-center gap-3">
        <button 
          class="btn btn-secondary btn-sm"
          @click="refreshDashboard"
          :disabled="pending"
        >
          <svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
            :class="{ 'animate-spin': pending }"
          >
            <path d="M23 4v6h-6M1 20v-6h6"></path>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Refresh
        </button>
        <!-- Date Range Picker Placeholder -->
        <div class="btn btn-secondary btn-sm">This Week</div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-4 border border-error text-error rounded-lg bg-red-50/10">
      Failed to load dashboard data. {{ error.message }}
      <button class="underline ml-2" @click="refreshDashboard">Try again</button>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <template v-if="pending && !data">
        <DashboardMetricsCard 
          v-for="i in 4" 
          :key="i"
          :metric="{ 
            id: '', label: '', value: 0, previousValue: 0, 
            format: 'number', trend: 'neutral', trendPercentage: 0 
          }"
          :loading="true"
        />
      </template>
      
      <template v-else-if="data">
        <DashboardMetricsCard 
          v-for="metric in data.metrics" 
          :key="metric.id"
          :metric="metric"
        />
      </template>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Revenue Chart -->
      <div class="lg:col-span-2">
        <UiCard title="Revenue Trend">
          <template #header>
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                +18.4% vs last week
              </span>
            </div>
          </template>
          
          <div class="h-80 w-full" v-if="data">
            <ChartsLineChart 
              :data="lineChartData" 
              :labels="lineChartLabels"
              :show-area="true"
              :stroke-width="3"
            />
          </div>
          <div v-else class="h-80 w-full animate-pulse bg-tertiary/20 rounded"></div>
        </UiCard>
      </div>
      
      <!-- Traffic Sources -->
      <div>
        <UiCard title="Traffic Sources">
          <div class="h-80 w-full" v-if="data">
            <ChartsBarChart 
              :data="barChartData"
              color="var(--color-info)"
            />
          </div>
          <div v-else class="h-80 w-full animate-pulse bg-tertiary/20 rounded"></div>
        </UiCard>
      </div>
    </div>
  </div>
</template>
