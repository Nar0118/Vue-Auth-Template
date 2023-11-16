import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/HomePage.vue'
import Signup from '../pages/signup/SignupPage.vue'
import Login from '../pages/login/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
