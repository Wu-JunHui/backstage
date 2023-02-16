import axios from 'axios'
import config from '../config/axios-config.js'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '网络请求异常，请稍后重试...'

// 创建一个axios实例对象
const service = axios.create({
  // 将配置环境中的接口地址设为全局请求根路径
  baseURL: config.baseApi
})

// 在请求之前做一些事情，即设置请求拦截器
service.interceptors.request.use(request => {
  // 可自定义请求携带的header，例如jwt-token认证
  return request
})

// 在请求之前做一些事情，即设置响应拦截器

service.interceptors.response.use(response => {
  // 解构赋值全局请求回来的数据，减少数据嵌套，方便赋值
  const { code, data, msg } = response.data
  // 若请求成功，code代码由后端决定
  if (code === 200) {
    return data
  } else {
    // 请求失败，提示失败msg（如果有）或自定义的错误消息
    ElMessage.error(msg || NETWORK_ERROR)
    // 由于异步任务异常且状态码不匹配，需手动退出当前异步任务
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

// 封装axios请求核心函数
// 将以以下形式传入Ajax请求对象，即形参options接收的对象
// {
//   method:'get',
//   data:{},
//   mock: true
// }

// 该函数主要用于处理请求参数对象
function request(options) {
  // 接收请求方法，若无传入则默认为get
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    // 接收请求参数
    options.params = options.data
  }

  // 对mock的处理
  // 获取配置环境中的mock总开关布尔值（当前默认为true）
  let isMock = config.mock
  // 判断请求对象是否使用mock，如果提供了mock就将其布尔值赋值给isMock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }

  // 对线上环境的处理
  if (config.env === 'prod') {
    // 若为线上环境，则修改请求根路径为线上环境所配置的路径，杜绝使用mock
    service.defaults.baseURL = config.baseApi
  } else {
    // 若为非线上，则依据前面获取的isMock判断是否使用mockApi
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  // 配置好请求对象options后，调用并传入axios实例
  return service(options)
}

export default request
