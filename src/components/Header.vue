<template>
  <el-header class="header-container">
    <!-- 标题左侧 -->
    <div class="h-left">
      <el-button size="small" color="#e3d9d0" :dark="isDark" title="隐藏菜单" @click="hideSidebar">
        <el-icon :size="18" color="#2cb2c2"><Menu /></el-icon
      ></el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 标题右侧 -->
    <div class="h-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImgSrc('defaultUser')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
export default {
  setup() {
    let store = useStore()
    let router = useRouter()
    // 动态引入用户头像（svg格式）
    const getImgSrc = user => new URL(`../assets/${user}.svg`, import.meta.url).href
    // 定义按钮点击事件回调
    let hideSidebar = () => {
      store.commit('updateBarCollapse')
    }
    // 通过计算属性获取Vuex中的currentMenu变量
    const current = computed(() => {
      return store.state.currentMenu
    })

    // 定义登出点击事件
    const logoutHandler = () => {
      ElMessageBox.confirm('确定退出登录吗?')
        .then(() => {
          // 提交mutation进行登出后的数据重置
          store.commit('isLogout')
          // 跳转至登录页
          router.push({
            name: 'login'
          })
        })
        .catch(() => {
          // catch error
        })
    }

    return {
      getImgSrc,
      hideSidebar,
      current,
      logoutHandler
    }
  }
}
</script>

<style lang="scss">
.el-header {
  padding: 0;
}
.header-container {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1d1e1f;
  .h-left {
    display: flex;
    align-items: center;
    color: #fff;

    .bread {
      margin-left: 10px;
      span {
        color: #fff;
        cursor: pointer !important;
      }
      span:hover {
        color: #2cb2c2;
      }
    }
  }
  .h-right {
    img {
      width: 40px;
    }
  }
}
</style>
