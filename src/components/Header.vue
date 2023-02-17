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
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    let store = useStore()
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
    return { getImgSrc, hideSidebar, current }
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
