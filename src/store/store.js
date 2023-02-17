import { createStore } from 'vuex'

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
    ]
  },
  mutations: {
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
    }
  }
})
