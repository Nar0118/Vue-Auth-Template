// src/AuthService.js
import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com'

export default {
  login(credentials: any) {
    return axios.post(`${API_URL}/users`, credentials)
  },

  logout() {
    // Implement logout logic if needed
  },

  getUserInfo() {
    // Implement logic to get user information
  }
}
