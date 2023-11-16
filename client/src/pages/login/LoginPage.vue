<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>
        Username:
        <input type="text" v-model="username" />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    async login() {
      try {
        const response = await AuthService.login({
          username: this.username,
          password: this.password,
        });
        console.log('Login successful', response.data);
        // Store the user token or information in your state management system (Vuex)
        // Redirect the user to the main page or perform other actions
      } catch (error) {
        console.error('Login failed', error);
        // Handle login failure, show an error message, etc.
      }
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
