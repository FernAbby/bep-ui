import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Dashboard/HomeView.vue'
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
          component: () => import('../views/Dashboard/AboutView.vue')
        }
      ]
    },
    {
      path: '/examples',
      name: 'examples',
      component: StandardLayout,
      redirect: '/examples/guide',
      children: [
        {
          path: 'guide',
          name: 'guide',
          component: () => import('../views/Examples/GuideView.vue')
        },
        {
          path: 'form',
          name: 'form',
          component: () => import('../views/Examples/FormPlusView.vue')
        },
        {
          path: 'table',
          name: 'table',
          component: () => import('../views/Examples/TablePlusView.vue')
        },
        {
          path: 'download',
          name: 'download',
          component: () => import('../views/Examples/DownloadView.vue')
        },
        {
          path: 'devtool',
          name: 'devtool',
          component: () => import('../views/Examples/DevToolView.vue')
        }
      ]
    }
  ]
})

export default router
