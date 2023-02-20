<template>
  <el-menu class="el-menu-vertical-demo" :collapse="$store.state.barCollapse" :collapse-transition="false" text-color="#fff" active-text-color="#2cb2c2" background-color="#3b3c3d" :default-active="$store.state.currentMenu ? $store.state.currentMenu.path : '/home'">
    <!-- logo区域 -->
    <div class="logo">
      <img src="../assets/logoDark.svg" alt="logo" />
      <h3 v-if="!$store.state.barCollapse">后台管理系统</h3>
    </div>

    <!-- 一级菜单1 -->
    <el-menu-item :index="item.path" v-for="item in noChildren()" :key="item.path" @click="clickMenu(item)">
      <!-- 动态使用图标 -->
      <el-icon> <component class="icons" :is="item.icon"></component> </el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>

    <!-- 一级菜单2 -->
    <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.path">
      <!-- 一级菜单图标 -->
      <template #title>
        <el-icon> <component class="icons" :is="item.icon"></component></el-icon>
        <span>{{ item.label }}</span>
      </template>

      <!-- 二级菜单 -->
      <el-menu-item-group>
        <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
          <!-- 二级菜单图标 -->
          <el-icon> <component class="icons" :is="subItem.icon"></component></el-icon>
          <span> {{ subItem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 作者 -->
    <div class="copyRight">
      <a href="https://github.com/Wu-JunHui/backstage" target="_blank">
        <img src="../assets/github.svg" alt="github" />
      </a>
      <div class="authorInfo" v-if="!$store.state.barCollapse">Made with ❤️ by <br /><a href="https://github.com/Wu-JunHui/" target="_blank">Wu-JunHui</a></div>
    </div>
  </el-menu>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    // 引入router方法
    const router = useRouter()
    // 引入vuex方法
    const store = useStore()

    // 由登陆者权限决定菜单结构，通过vuex获取
    // 碍于vuex刷新页面后数据会丢失，因此先在根组件中通过mutation读取本地菜单数据
    // 本地没有数据则读取通过登录存储在state的数据，该数据同时已存储至本地，因此此时刷新就不会丢失
    const sidebarList = store.state.sidebarMenu

    // 通过有无二级菜单判断菜单级别
    const noChildren = () => sidebarList.filter(item => !item.children)
    const hasChildren = () => sidebarList.filter(item => item.children)

    // 定义点击菜单点击事件回调
    const clickMenu = item => {
      router.push({
        name: item.name // 跳转路由名称
      })
      // 通过Vuex管理以实现面包屑
      store.commit('selectSidebarMenu', item)
    }
    return {
      noChildren,
      hasChildren,
      clickMenu
    }
  }
}
</script>

<style lang="scss">
.el-menu {
  position: relative;
  border-right: none;
  span {
    padding: 0 30px 0 10px;
    letter-spacing: 2px;
  }

  .logo {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 60px;
    }
    h3 {
      padding: 0 15px 0 10px;
      color: #fff;
      cursor: default;
      white-space: nowrap;
    }
  }
}

.icons {
  width: 18px;
}

// 作者
.copyRight {
  position: absolute;
  bottom: 20px;
  left: 2px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 14px;
  img {
    margin-left: 5px;
    width: 50px;
  }
  .authorInfo {
    cursor: default;
    white-space: nowrap;

    a {
      color: #2cb2c2;
    }
    a:hover {
      color: #5bb2bc;
    }
  }
}
</style>
