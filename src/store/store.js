import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'

export default createStore({
  state: {
    barCollapse: false,
    currentMenu: null,
    tagList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    // 根据登录权限加载不同侧边栏菜单
    sidebarMenu: [],
    token: ''
  },
  mutations: {
    // 控制侧边栏折叠
    updateBarCollapse(state, payload) {
      state.barCollapse = !state.barCollapse
    },
    // 控制面包屑与增加tag
    selectSidebarMenu(state, payload) {
      // 侧边栏菜单点击事件，判断路由跳转的是否为主页home，同时需与页面标签联动
      if (payload.name === 'home') {
        // 若为home页则清空当前菜单
        state.currentMenu = null
      } else {
        // 否则保存所点击菜单的对应的路由对象，供标题栏的面包屑使用
        state.currentMenu = payload
        // 同时判断当前tagList中是否已有tag，否则进行push
        let result = state.tagList.findIndex(item => item.name === payload.name)
        // 若索引为-1则表示没有，需要进行push
        result === -1 ? state.tagList.push(payload) : ''
      }
    },
    // 删除tag
    closeTag(state, payload) {
      // 接收关闭tag事件传入的参数，判断其是否存在于tagList
      let result = state.tagList.findIndex(item => item.name === payload.name)
      // 若存在则必然有索引值，使用该索引删除数组元素
      state.tagList.splice(result, 1)
    },

    // 定义登录后按权限加载侧边栏菜单数组
    setSidebarMenu(state, payload) {
      state.sidebarMenu = payload

      // 存储菜单数据至本地，vuex刷新后数据会重置
      localStorage.setItem('menu', JSON.stringify(payload))
    },

    // 持久化并加载已在本地存储的菜单数据，设置动态路由
    // 调用者：Login.vue，main.js（因为在根组件中设置动态路由时，组件已渲染完毕，会产生白屏，因此需在挂载路由前设置好动态路由）
    loadLocalMenu(state, router) {
      // router接收调用者传入的路由对象
      // 判断是否存在本地菜单数据
      if (localStorage.getItem('menu')) {
        let menu = JSON.parse(localStorage.getItem('menu'))
        // 防止刷新侧边栏菜单空白
        state.sidebarMenu = menu

        // 由于刷新后动态路由依赖的menu数据会丢失，因此需在此定义动态路由
        // 定义接收home路由下的动态路由对象的数组
        // bug:暂无法解决import.meta.glob在打包后输出undefined，而开发环境则能正常读取组件，实现动态路由
        // 固使用固定路由，暂不设置动态路由

      
        const dynRoute = []
        // 定义动态导入模块(vite语法)
        const modules = import.meta.glob('../views/*/*.vue')

        // 根据menu中的路径设置动态路由
        menu.forEach(item => {
           
          // 如果存在子路由children数组，则为其添加展示组件
          if (item.children) {
            item.children = item.children.map(ele => {
              // 注意该url将在router.js中使用，因此因相对于router.js设置
              // 展示组件引入路径基于后端返回的数据menu对象数组中的url属性
              let url = `../views/${ele.url}.vue`
              // 为children下的对象添加新属性
              ele.component = modules[url]
              return ele
            })
            // 将添加了展示组件的子路由数组的每个对象push进动态路由数组
            dynRoute.push(...item.children)
          } else {
            // 不存在子路由
            let url = `../views/${item.url}.vue`
            // 直接为其添加新属性
            item.component = modules[url]
            // 同样与动态路由数组合并
            dynRoute.push(item)
          }
        })
        // 则此时dynamicRoute数组已获取所有动态路由对象，将它们添加到路由root中
        dynRoute.forEach(item => {
          router.addRoute('root', item)
        })
      }
    },

    
    // 保存登录token认证
    saveToken(state, token) {
      state.token = token
      // 使用Vuecookies持久化token
      VueCookies.set('token', token)
    },

    // 定义登出逻辑
    isLogout(state) {
      // 清除state的menu
      state.menu = []
      // 清除本地menu数据
      localStorage.removeItem('menu')
      // 清除token
      state.token = ''
      VueCookies.remove('token')
    }
  }
})
