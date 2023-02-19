<template>
  <el-form :model="formLogin" class="login-container">
    <h3>登录系统</h3>
    <el-form-item>
      <el-input type="input" placeholder="请输入账号" v-model="formLogin.username"> </el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" placeholder="请输入密码" v-model="formLogin.password"> </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="loginHandler"> 登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
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
      store.commit('saveToken',res.token)

      // 跳转至首页
      router.push({
        name: 'home'
      })
    }
    return {
      formLogin,
      loginHandler
    }
  }
}
</script>
<style lang="scss">
.login-container {
  margin: 180px auto;
  padding: 35px 35px 15px;
  width: 350px;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 15px;
  box-shadow: 0 0 25px #cacaca;
  h3 {
    margin-bottom: 20px;
    text-align: center;
    color: #505450;
  }
  .el-form-item_content {
    justify-content: center;
  }
}
</style>
