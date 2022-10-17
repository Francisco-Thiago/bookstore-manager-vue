import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/dashboard.vue'
import books from '../views/books.vue'
import publishers from '../views/publishers.vue'
import rentals from '../views/rentals.vue'
import users from '../views/users.vue'
import login from '../views/login.vue'
import forget from '../views/forget.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/books',
    name: 'books',
    component: books
  },
  {
    path: '/publishers',
    name: 'publishers',
    component: publishers
  },
  {
    path: '/rentals',
    name: 'rentals',
    component: rentals
  },
  {
    path: '/users',
    name: 'users',
    component: users
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/forget',
    name: 'forget',
    component: forget
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
