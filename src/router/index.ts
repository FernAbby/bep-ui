import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Dashboard/HomeView.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import StandardLayout from '@/layout/StandardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/examples/guide',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DefaultLayout,
          children: [
            {
              path: 'home',
              name: 'home',
              component: HomeView
            },
            {
              path: 'about',
              name: 'about',
              // route level code-splitting
              // this generates a separate chunk (About.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import('../views/Dashboard/AboutView.vue')
            }
          ]
        },
        {
          path: 'examples',
          name: 'examples',
          component: StandardLayout,
          redirect: '/examples/guide',
          children: [
            {
              path: 'guide',
              name: 'guide',
              component: () => import('@/views/examples/guide-view.vue')
            },
            {
              path: 'form',
              name: 'form-plus',
              children: [
                {
                  path: 'base',
                  name: 'base-form',
                  component: () => import('../views/examples/FormPlus/FormPlusView.vue')
                },
                {
                  path: 'complex',
                  name: 'complex-form',
                  component: () => import('../views/examples/FormPlus/ComplexForm.vue')
                }
              ]
            },
            {
              path: 'table',
              name: 'table-plus',
              children: [
                {
                  path: 'base',
                  name: 'base-table',
                  component: () => import('../views/examples/TablePlus/Base.vue')
                },
                {
                  path: 'data',
                  name: 'data-table',
                  component: () => import('../views/examples/TablePlus/DataTable.vue')
                }
              ]
            },
            {
              path: 'download',
              name: 'download',
              component: () => import('../views/examples/DownloadView.vue')
            },
            {
              path: 'hooks',
              name: 'hooks',
              component: () => import('../views/examples/HooksView.vue')
            },
            {
              path: 'devtool',
              name: 'devtool',
              component: () => import('../views/examples/DevToolView.vue')
            }
          ]
        }
      ]
    },
    // 404路由必须放在所有路由的最后
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/errors/404.vue')
    }
  ]
})

export default router
