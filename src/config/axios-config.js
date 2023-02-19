// Ajax环境配置文件

// 获取vite项目的环境变量，读取当前应用运行模式，获取不到则默认为线上prod
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
  // 开发环境
  development: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/faa967e1e23a267ad0745b2556a9b204/api' // fastmock接口根地址
  },
  // 测试环境（为不存在的模拟接口，需与后端对接）
  test: {
    baseApi: '/test.com/api',
    mockApi: 'https://www.fastmock.site/mock/faa967e1e23a267ad0745b2556a9b204/api' // fastmock接口根地址
  },
  // 线上环境（当前因部署为静态项目，直接使用fastmock）
  prod: {
    baseApi: 'https://www.fastmock.site/mock/faa967e1e23a267ad0745b2556a9b204/api',
    mockApi: 'https://www.fastmock.site/mock/faa967e1e23a267ad0745b2556a9b204/api' // fastmock接口根地址
  }
}

export default {
  env,
  // 项目是否使用mock模拟数据的总开关，将在二次封装axios中使用
  mock: true,
  // 使用展开运算符，基于env的取值获取相应的对象，并与当前对象合并
  ...EnvConfig[env]
}
