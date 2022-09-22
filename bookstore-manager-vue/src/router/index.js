import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue')
  },
  {
    path: '/books',
    name: 'books',
    component: () => import(/* webpackChunkName: "about" */ '../views/books.vue')
  },
  {
    path: '/publishers',
    name: 'publishers',
    component: () => import(/* webpackChunkName: "about" */ '../views/publishers.vue')
  },
  {
    path: '/rentals',
    name: 'rentals',
    component: () => import(/* webpackChunkName: "about" */ '../views/rentals.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "about" */ '../views/users.vue')
  },
  {
    path: '/admins',
    name: 'admins',
    component: () => import(/* webpackChunkName: "about" */ '../views/admins.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
