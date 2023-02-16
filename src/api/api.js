// 对整个项目的api管理

import request from './request'
export default {
  // 定义Home组件获取table数据的请求函数，传入一个请求参数对象
  getTableData(params) {
    return request({
      url: '/home/getTableData',
      method: 'get',
      data: params,
      mock: true
    })
  }
}
