import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import StandardLayout from '@/layout/StandardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/examples',
      name: 'examples',
      component: StandardLayout,
      children: [
        {
          path: '/examples/form-plus',
          name: 'form-plus',
          component: () => import('../views/Examples/FormPlusView.vue')
        }
      ]
    },
  ]
})

export default router
