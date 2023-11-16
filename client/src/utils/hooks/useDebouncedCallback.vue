<template>
  <!-- Your Vue component template -->
</template>

<script>
import { ref } from 'vue'

/**
 * A custom Vue composition function for creating debounced callbacks.
 *
 * @param func - The function to be debounced.
 * @param delay - The debounce delay in milliseconds.
 *
 * @returns A debounced callback function.
 *
 * @example
 * const debouncedSearch = useDebouncedCallback((query) => {
 *   // Your callback logic here
 * }, 300); // Debounce for 300ms
 *
 * // Usage: debouncedSearch('searchQuery');
 */

const useDebouncedCallback = (func, delay) => {
  const timeout = ref(null)

  const debouncedFunction = (...args) => {
    const later = () => {
      clearTimeout(timeout.value)
      func(...args)
    }

    clearTimeout(timeout.value)
    timeout.value = setTimeout(later, delay)
  }

  return debouncedFunction
}

export default {
  setup() {
    // Usage of the debounced callback
    const debouncedSearch = useDebouncedCallback((query) => {
      // Your callback logic here
      console.log(query)
    }, 300) // Debounce for 300ms

    // Example usage: debouncedSearch('searchQuery');

    return {
      debouncedSearch
    }
  }
}
</script>
