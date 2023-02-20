<template>
  <div class="login-container">
    <!-- 标题 -->
    <div class="loginHead-container">
      <img src="../assets/logoDark.svg" alt="logo" />
      <div class="mainTitle">
        <h2>通用后台管理系统</h2>
        <h4>General Backstage Management System</h4>
      </div>
    </div>
    <!-- 登录框 -->
    <el-form :model="formLogin" class="window-container" label-width="70px" @keyup.enter="loginHandler">
      <h3>登录系统</h3>
      <el-form-item label="用户名">
        <el-input type="input" placeholder="请输入账号" v-model="formLogin.username"> </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="请输入密码" v-model="formLogin.password"> </el-input>
      </el-form-item>

      <div class="button-container">
        <el-button type="primary" color="rgba(0, 0, 0, 0.3)" @click="resetHandler"> 重置</el-button>
        <el-button type="primary" color="#2cb2c2" @click="loginHandler"> 登录</el-button>
      </div>
    </el-form>
    <!-- 作者 -->
    <div class="author">Made with ❤️ by <a href="https://github.com/Wu-JunHui/" target="_blank">Wu-JunHui</a></div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const store = useStore()
    const router = useRouter()
    // 定义表单双向绑定数据对象
    const formLogin = reactive({
      username: 'admin',
      password: '123456'
    })

    // 定义登录按钮点击事件回调
    const loginHandler = async () => {
      // 向登录验证接口发起请求
      const res = await proxy.$api.getSidebarMenu(formLogin)
      // 登录成功，将其权限对应的菜单通过vuex加载并存储到本地
      store.commit('setSidebarMenu', res.menu)
      // 设置动态路由，传入全局路由对象以添加动态路由
      store.commit('loadLocalMenu', router)
      // 保存登录token
      store.commit('saveToken', res.token)
      // 存储用户信息
      store.commit('saveUserInfo', { isAdmin: res.isAdmin, ...formLogin })
      // 提示登录成功
      ElMessage.success(res.message)
      // 跳转至首页
      router.push({
        name: 'home'
      })
    }

    // 定义重置按钮点击事件回调
    const resetHandler = () => {
      formLogin.username = ''
      formLogin.password = ''
    }

    return {
      formLogin,
      loginHandler,
      resetHandler
    }
  }
}
</script>
<style lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: spa;
  align-items: center;
  background: url('../assets/loginBg.webp') no-repeat;
  background-size: 100% 100%;
}

// 标题
.loginHead-container {
  margin: 70px 0;
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    margin-right: 15px;
    height: 60%;
  }
  .mainTitle {
    text-align: center;
    letter-spacing: 6px;
    h2 {
      font-size: 60px;
      color: #fffdfc;
    }
    h4 {
      font-size: 17px;
      color: #f0eeee;
    }
  }
}
// 登录框
.window-container {
  padding: 35px 35px 15px;
  width: 400px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  h3 {
    margin-bottom: 30px;
    color: #090909;
    font-size: 24px;
    text-align: center;
    letter-spacing: 3px;
  }

  .el-form-item {
    label {
      color: #000;
      font-size: 18px;
    }
  }

  .el-input__wrapper {
    background: rgba(255, 255, 255, 0.15);
    input {
      color: #000;
      font-size: 16px;
    }
    input::placeholder {
      color: #000;
    }
  }
  .button-container {
    text-align: right;
    .el-button {
      color: #fff;
    }
  }
}

// 作者
.author {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  color: #fff;
  font-size: 18px;
  a {
    color: #2cb2c2;
  }
  a:hover {
    color:#5bb2bc;
  }
}
</style>
