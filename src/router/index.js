import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index')
  },
  {
    path: '',
    name: 'home',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/books',
        component: () => import('@/views/books/index')
      },
      {
        path: '/types',
        component: () => import('@/views/types/index')
      },
      {
        path: '/borrow-all',
        component: () => import('@/views/borrow-all/index')
      },
      {
        path: '/borrow',
        component: () => import('@/views/borrow/index')
      },
      {
        path: '/return-all',
        component: () => import('@/views/return-all/index')
      },
      {
        path: '/history',
        component: () => import('@/views/history/index')
      },
      {
        path: '/users',
        component: () => import('@/views/users/index')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
