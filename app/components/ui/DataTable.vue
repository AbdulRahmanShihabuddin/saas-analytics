<!--
  Data Table Component
  
  Reusable table with:
  - Column configuration
  - Sorting UI (Client-side trigger)
  - Pagination UI
  - Loading State
-->

<script setup lang="ts" generic="T extends Record<string, any>">
interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

const props = defineProps<{
  columns: Column[]
  data: T[]
  loading?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
}>()

const emit = defineEmits<{
  (e: 'sort', key: string): void
  (e: 'page-change', page: number): void
  (e: 'row-click', row: T): void
}>()

const currentSort = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const handleSort = (key: string) => {
  if (currentSort.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    currentSort.value = key
    sortDirection.value = 'asc'
  }
  emit('sort', key)
}
</script>

<template>
  <div class="data-table-container border rounded-lg overflow-hidden bg-secondary">
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-tertiary text-secondary uppercase text-xs font-medium border-b">
          <tr>
            <th 
              v-for="col in columns" 
              :key="col.key"
              class="px-6 py-4 whitespace-nowrap"
              :class="{ 'cursor-pointer hover:text-primary': col.sortable }"
              :style="{ width: col.width }"
              @click="col.sortable && handleSort(col.key)"
            >
              <div class="flex items-center gap-1">
                {{ col.label }}
                <!-- Sort Icons -->
                <span v-if="col.sortable" class="inline-flex flex-col h-3 w-3 relative text-muted">
                  <svg 
                    v-if="currentSort !== col.key || sortDirection === 'asc'"
                    class="w-2 h-2 absolute top-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"
                    :class="{ 'text-primary': currentSort === col.key && sortDirection === 'asc' }"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  <svg 
                    v-if="currentSort !== col.key || sortDirection === 'desc'"
                     class="w-2 h-2 absolute bottom-0" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"
                    :class="{ 'text-primary': currentSort === col.key && sortDirection === 'desc' }"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        
        <tbody class="divide-y divide-border">
          <tr v-if="loading" class="bg-primary/50">
            <td :colspan="columns.length" class="px-6 py-10 text-center text-muted">
              Loading data...
            </td>
          </tr>
          
          <tr v-else-if="!data.length" class="bg-primary hover:bg-tertiary/50">
            <td :colspan="columns.length" class="px-6 py-10 text-center text-secondary">
              No results found
            </td>
          </tr>
          
          <tr 
            v-for="(row, idx) in data" 
            :key="idx"
            class="bg-primary hover:bg-tertiary/50 transition-fast cursor-pointer"
            @click="emit('row-click', row)"
          >
            <td 
              v-for="col in columns" 
              :key="col.key"
              class="px-6 py-4 whitespace-nowrap text-primary"
            >
              <slot :name="`cell-${col.key}`" :row="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="total && pageSize" class="flex items-center justify-between px-6 py-3 border-t bg-tertiary/30">
      <div class="text-xs text-secondary">
        Showing 
        <span class="font-medium decoration-none">{{ ((currentPage || 1) - 1) * pageSize + 1 }}</span>
        to
        <span class="font-medium">{{ Math.min((currentPage || 1) * pageSize, total) }}</span>
        of
        <span class="font-medium">{{ total }}</span> 
        results
      </div>
      
      <div class="flex gap-1">
        <button 
          class="btn btn-sm btn-ghost"
          :disabled="(currentPage || 1) <= 1"
          @click="emit('page-change', (currentPage || 1) - 1)"
        >
          Previous
        </button>
        <button 
          class="btn btn-sm btn-ghost"
          :disabled="(currentPage || 1) * pageSize >= total"
          @click="emit('page-change', (currentPage || 1) + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
