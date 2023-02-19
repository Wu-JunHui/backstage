import { createRouter, createWebHashHistory } from 'vue-router'
import VueCookies from 'vue-cookies'
// 除了登录前的根路径和登录路径，其余路由应由后端返回
// 即根路由'/'下的子路由需设置成动态路由，该步骤将在登录逻辑中实现
const routes = [
  {
    path: '/',
    component: () => import('../views/layout.vue'),
    name: 'root',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home/Home.vue')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall/Mall.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/users/User.vue')
      },
      {
        path: '/other',
        name: 'other',
        children: [
          {
            path: '/page1',
            name: 'page1',
            component: () => import('../views/others/Page1.vue')
          },
          {
            path: '/page2',
            name: 'page2',
            component: () => import('../views/others/Page2.vue')
          }
        ]
      }
    ] // 为动态路由，在登录后返回menu数据，在vuex中处理menu中的url后进行添加
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 定义检查手动输入路径是否存在的函数，非法路径将跳转至home页，无token将跳至login
function checkRouter(path) {
  // router.getRoutes()返回包含所有路由对象的数组
  let hadCheck = router.getRoutes().some(route => route.path === path)
  // console.log(hadCheck)
  return hadCheck ? true : false
}

// 设置全局守卫，需在设置动态路由之后
router.beforeEach((to, from, next) => {
  // 判断当前cookies是否有token
  const token = VueCookies.get('token')
  if (!token && to.name !== 'login') {
    // 无token且访问非login页
    next({ name: 'login' })
  } else if (!checkRouter(to.path)) {
    // 有token且访问不存在页
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
