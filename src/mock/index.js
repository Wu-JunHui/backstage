import userApi from './mockData/user.js'

export default [
  {
    url: /user\/add/,
    method: 'get',
    response: userApi.createUser
  }
]
