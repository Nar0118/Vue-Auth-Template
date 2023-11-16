import axios from 'axios'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle HTTP errors
      const customError = {
        message: error.response.data.message,
        code: error.response.status,
        details: error.response.data.details
      }
      // Display the error message using the central error-handling component
      this.$root.$emit('show-error', customError)
    }
    return Promise.reject(error)
  }
)
