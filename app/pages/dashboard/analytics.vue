<!--
  Analytics Page
  
  Detailed data view with tabular data.
  Demonstrates pagination, filtering, and data table usage.
-->

<script setup lang="ts">
import DataTable from '~/components/ui/DataTable.vue'
import DateRangePicker from '~/components/dashboard/DateRangePicker.vue'
import type { AnalyticsTableRow, PaginatedResponse } from '~/types'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Analytics Reports | SaaS Analytics'
})

// State for pagination & filtering
const page = ref(1)
const pageSize = ref(10)
const search = ref('')

// Debounce search
const debouncedSearch = useDebounce(search, 300)

// Data Fetching
const { data, pending, refresh } = await useAsyncData<PaginatedResponse<AnalyticsTableRow>>(
  'analytics-table',
  () => $fetch('/api/analytics', {
    params: {
      page: page.value,
      pageSize: pageSize.value,
      q: debouncedSearch.value
    }
  }),
  {
    watch: [page, debouncedSearch]
  }
)

// Table Config
const columns = [
  { key: 'page', label: 'Page Path', width: '30%', sortable: true },
  { key: 'views', label: 'Page Views', sortable: true },
  { key: 'uniqueVisitors', label: 'Unique Visitors', sortable: true },
  { key: 'bounceRate', label: 'Bounce Rate', sortable: true },
  { key: 'avgDuration', label: 'Avg. Time', sortable: false },
  { key: 'conversions', label: 'Conversions', sortable: true },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-primary">Detailed Reports</h1>
        <p class="text-secondary text-sm">Analyze page performance and conversion metrics.</p>
      </div>
      
      <div class="flex gap-3">
        <DateRangePicker />
        <button class="btn btn-primary btn-sm">Export CSV</button>
      </div>
    </div>

    <!-- Filters -->
    <UiCard :no-padding="true">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold px-6 pt-6">Page Performance</h3>
        </div>
      </template>

      <div class="p-4 border-b border-border bg-tertiary/10">
        <div class="relative max-w-sm">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            v-model="search"
            type="text" 
            placeholder="Filter pages..." 
            class="input pl-9 py-2 text-sm"
          >
        </div>
      </div>

      <DataTable
        :columns="columns"
        :data="data?.data || []"
        :loading="pending"
        :total="data?.meta.total || 0"
        :current-page="page"
        :page-size="pageSize"
        @page-change="(p) => page = p"
      >
        <template #cell-bounceRate="{ row }">
          <span :class="row.bounceRate > 50 ? 'text-warning' : 'text-success'">
            {{ row.bounceRate }}%
          </span>
        </template>
        
        <template #cell-page="{ row }">
          <span class="font-medium text-primary hover:underline cursor-pointer">
            {{ row.page }}
          </span>
        </template>
      </DataTable>
    </UiCard>
  </div>
</template>
