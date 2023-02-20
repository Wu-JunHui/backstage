import Mock from 'mockjs'

export default {
  // 要求传入用户名和密码
  getSidebarMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 再判断其账号与密码是否对应
    if (username === 'admin' && password === '123456') {
      // 登录成功，返回管理员权限的左侧菜单
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'HomeFilled',
              url: 'home/Home'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'Shop',
              url: 'mall/Mall'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'UserFilled',
              url: 'users/User'
            },
            {
              label: '其他',
              icon: 'MoreFilled',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'Edit',
                  url: 'others/Page1'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'Edit',
                  url: 'others/Page2'
                }
              ]
            }
          ],
          isAdmin: true,
          token: Mock.Random.guid(),
          message: '登录成功！欢迎管理员'
        }
      }
    } else if (username === 'Apple' && password === '123456') {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 'HomeFilled',
              url: 'home/Home'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'Shop',
              url: 'mall/Mall'
            }
          ],
          isAdmin: false,
          token: Mock.Random.guid(),
          message: '登录成功！欢迎你'
        }
      }
    } else {
      return {
        code: 400,
        data: {
          message: '登录名或密码错误，请重试'
        }
      }
    }
  }
}
