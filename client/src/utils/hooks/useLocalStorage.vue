<template>
    <div>
      Count: {{ count }}
      <button @click="incrementCount">Increment</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  
  /**
   * A custom Vue composition function for managing state with local storage persistence.
   *
   * @param key - The key to use for storing the value in local storage.
   * @param initialValue - The initial value to use when no stored value is found.
   *
   * @returns An object with the stored value and a method to update it.
   *
   * @example
   * const { value: count, setValue: setCount } = useLocalStorage('count', 0); // Initialize with a default value
   *
   * // Usage:
   * <div>
   *   Count: {{ count }}
   *   <button @click="incrementCount">Increment</button>
   * </div>
   */
  const useLocalStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key)
    const value = ref(storedValue ? JSON.parse(storedValue) : initialValue)
  
    const setValue = (newValue) => {
      const valueToStore = typeof newValue === 'function' ? newValue(value.value) : newValue
      value.value = valueToStore
      localStorage.setItem(key, JSON.stringify(valueToStore))
    }
  
    const incrementCount = () => {
      setValue(value.value + 1)
    }
  
    // Use the Composition API lifecycle hook `onMounted` to initialize the value from local storage
    onMounted(() => {
      if (!storedValue) {
        localStorage.setItem(key, JSON.stringify(value.value))
      }
    })
  
    return {
      count: value,
      incrementCount,
    }
  }
  
  export default {
    setup() {
      const { count, incrementCount } = useLocalStorage('count', 0)
  
      return {
        count,
        incrementCount,
      }
    },
  }
  </script>
  