/**
 * useDebounce Composable
 * 
 * Generic debounce utility for delaying function execution.
 * Used for search inputs and filters to avoid excessive API calls.
 */

import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
    const debouncedValue = ref(value.value) as Ref<T>
    let timeout: ReturnType<typeof setTimeout>

    watch(value, (newValue) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            debouncedValue.value = newValue
        }, delay)
    })

    return debouncedValue
}

/**
 * Debounced callback version
 * Returns a debounced function instead of a value
 */
export function useDebouncedFn<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 300
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => fn(...args), delay)
    }
}
