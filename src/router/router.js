import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/layout.vue'),
    redirect:'/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User/User.vue')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/Other/Page1.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/Other/Page2.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
