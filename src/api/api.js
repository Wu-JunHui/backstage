// 对整个项目的api管理

import request from './request'
export default {
  // 定义Home组件获取table数据的请求函数
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      mock: false
    })
  },
  getCountData() {
    return request({
      url: '/home/getCountData',
      method: 'get',
      mock: false
    })
  },
  getEchartsData() {
    return request({
      url: '/home/getEchartsData',
      method: 'get',
      mock: false
    })
  },
  getUserData(params) {
    return request({
      url: '/user/getUser',
      method: 'get',
      mock: false, // 不调用faskmock，调用本地mock
      data: params
    })
  },
  addUser(params) {
    return request({
      url: '/user/add',
      method: 'post',
      mock: false, // 不调用faskmock，调用本地mock
      data: params
    })
  },
  editUser(params) {
    return request({
      url: '/user/edit',
      method: 'post',
      mock: false, // 不调用faskmock，调用本地mock
      data: params
    })
  },
  deleteUser(params) {
    return request({
      url: '/user/delete',
      method: 'get',
      mock: false, // 不调用faskmock，调用本地mock
      data: params
    })
  },
  // 根据用户名返回不一样的侧边栏菜单
  getSidebarMenu(params) {
    return request({
      url: '/permission/getMenu',
      method: 'post',
      mock: false, // 不调用faskmock，调用本地mock
      data: params
    })
  }
}
