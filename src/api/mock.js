import Mock from 'mockjs'
import homeApi from './mockData/home.js'
import userApi from './mockData/user.js'
// 拦截请求
Mock.mock('/home/getData', homeApi.getHomeData)

// 本地获取user的数据
Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
// 本地提交新增用户表单接口
Mock.mock(/user\/add/, 'post', userApi.createUser)
