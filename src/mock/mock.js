import Mock from 'mockjs'
import homeTableApi from './mockData/homeTable.js'
import homeCountApi from './mockData/homeCount.js'
import homeEchartsApi from './mockData/homeEcharts.js'
import userApi from './mockData/user.js'
import permissionApi from './mockData/permission.js'
// 拦截请求，返回通过Mock模拟的数据
// Mock.mock()方法表示根据数据模板生成模拟数据

// 本地获取首页table数据
Mock.mock(/home\/getTableData/, 'get', homeTableApi.getHomeTable)
// 本地获取首页count数据
Mock.mock(/home\/getCountData/, 'get', homeCountApi.getHomeCount)
// 本地获取首页echarts数据
Mock.mock(/home\/getEchartsData/, 'get', homeEchartsApi.getHomeEcharts)
// 本地获取user的数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
// 本地提交新增用户表单接口
Mock.mock(/user\/add/, 'post', userApi.createUser)
//  本地提交编辑后的用户信息接口
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
// 本地调用删除用户接口
Mock.mock(/user\/delete/, 'get', userApi.deleteUser)
//  本地调用登录验证接口
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getSidebarMenu)
