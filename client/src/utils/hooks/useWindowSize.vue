<template>
  <div>Window Width: {{ windowSize.width }} Window Height: {{ windowSize.height }}</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * A custom Vue composition function for tracking and updating window size.
 *
 * @param initialWidth - The initial width value (useful for server-side rendering).
 * @param initialHeight - The initial height value (useful for server-side rendering).
 *
 * @returns An object with the current width and height of the window.
 *
 * @example
 * const { width, height } = useWindowSize(1024, 768); // Initialize with default values
 *
 * // Usage:
 * <div>
 *   Window Width: {{ width }}
 *   Window Height: {{ height }}
 * </div>
 */
const useWindowSize = (initialWidth, initialHeight) => {
  const windowSize = ref({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight
  })

  const handleResize = () => {
    windowSize.value.width = window.innerWidth
    windowSize.value.height = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return windowSize
}

export default {
  setup() {
    const windowSize = useWindowSize(1024, 768)

    return {
      windowSize
    }
  }
}

// Utility function to check if the code is running on the client (browser)
const isClient = typeof window !== 'undefined'
</script>
