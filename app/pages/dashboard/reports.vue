<!--
  Reports Page
  
  Saved reports with search and actions.
  Demonstrates data table reuse and card composition patterns.
-->

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Reports | SaaS Analytics'
})

const reports = ref([
  { id: '1', name: 'Weekly Revenue Summary', type: 'Revenue', schedule: 'Weekly', lastRun: '2024-02-18', status: 'completed' },
  { id: '2', name: 'Monthly User Growth', type: 'Users', schedule: 'Monthly', lastRun: '2024-02-01', status: 'completed' },
  { id: '3', name: 'Conversion Funnel Analysis', type: 'Conversions', schedule: 'Daily', lastRun: '2024-02-19', status: 'running' },
  { id: '4', name: 'Traffic Sources Breakdown', type: 'Traffic', schedule: 'Weekly', lastRun: '2024-02-15', status: 'completed' },
  { id: '5', name: 'Churn Risk Assessment', type: 'Users', schedule: 'Monthly', lastRun: '2024-01-31', status: 'completed' },
  { id: '6', name: 'A/B Test Results - Pricing', type: 'Experiments', schedule: 'On-demand', lastRun: '2024-02-10', status: 'paused' },
])

const search = ref('')
const filteredReports = computed(() => {
  if (!search.value) return reports.value
  const q = search.value.toLowerCase()
  return reports.value.filter(r => 
    r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q)
  )
})

const statusColor = (status: string) => {
  const map: Record<string, string> = {
    completed: 'status-success',
    running: 'status-info',
    paused: 'status-warning',
    failed: 'status-error'
  }
  return map[status] || 'status-muted'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-primary">Reports</h1>
        <p class="text-secondary text-sm mt-1">Manage and schedule your automated reports.</p>
      </div>
      
      <button class="btn btn-primary btn-sm">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        New Report
      </button>
    </div>

    <!-- Search -->
    <div class="relative max-w-sm">
      <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input 
        v-model="search"
        type="text" 
        placeholder="Search reports..." 
        class="input search-input"
      >
    </div>

    <!-- Reports List -->
    <div class="reports-grid">
      <div 
        v-for="report in filteredReports" 
        :key="report.id" 
        class="report-card card"
      >
        <div class="report-header">
          <div class="report-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <span :class="['status-badge', statusColor(report.status)]">
            {{ report.status }}
          </span>
        </div>
        
        <h3 class="report-name">{{ report.name }}</h3>
        
        <div class="report-meta">
          <div class="meta-item">
            <span class="meta-label">Type</span>
            <span class="meta-value">{{ report.type }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Schedule</span>
            <span class="meta-value">{{ report.schedule }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Last Run</span>
            <span class="meta-value">{{ report.lastRun }}</span>
          </div>
        </div>

        <div class="report-actions">
          <button class="btn btn-secondary btn-sm">View</button>
          <button class="btn btn-ghost btn-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredReports.length === 0" class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" stroke-width="1.5">
        <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      <p class="text-secondary">No reports match your search.</p>
    </div>
  </div>
</template>

<style scoped>
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
}

.search-input {
  padding-left: 36px;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-4);
}

.report-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.report-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.report-icon-wrap {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background-color: rgba(99, 102, 241, 0.1);
  color: var(--color-primary);
}

.status-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  text-transform: capitalize;
}

.status-success { 
  background-color: rgba(16, 185, 129, 0.15);
  color: var(--color-success);
}
.status-info { 
  background-color: rgba(59, 130, 246, 0.15);
  color: var(--color-info);
}
.status-warning { 
  background-color: rgba(245, 158, 11, 0.15);
  color: var(--color-warning);
}
.status-error { 
  background-color: rgba(239, 68, 68, 0.15);
  color: var(--color-error);
}

.report-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.report-meta {
  display: flex;
  gap: var(--spacing-4);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.meta-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
}

.meta-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.report-actions {
  display: flex;
  gap: var(--spacing-2);
  margin-top: auto;
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--color-border);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-12);
}
</style>
