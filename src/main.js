import { createApp } from 'vue'
import './styles/style.scss'
// 完整引入Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 完整引入Element-Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入router模块
import router from './router/router.js'
// 导入Vuex模块
import store from './store/store.js'
// 导入mock模块
import './mock/mock.js'
// 导入已封装好的全局接口管理模块api.js
import api from './api/api'
// import mock from './mock/mock.js'
import App from './App.vue'

const app = createApp(App)

// 暴露axios为全局属性$http
app.config.globalProperties.$api = api

// 注册Element-Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册Element-Plus
app.use(ElementPlus)

// 持久化侧边栏菜单数据并在挂载路由模块前设置动态路由
store.commit('loadLocalMenu', router)
// 注册路由模块
app.use(router).use(store)



app.mount('#app')
