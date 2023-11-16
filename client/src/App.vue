<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/signup">Signup</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
<br>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav {
  display: flex;
  column-gap: 20px;
}
</style>
