<template>
  <el-menu class="el-menu-vertical-demo" :collapse="$store.state.barCollapse" text-color="#fff" active-text-color="#2cb2c2" background-color="#3b3c3d">
    <!-- logo区域 -->
    <div class="logo">
      <img src="../assets/logoDark.svg" alt="" />
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
  </el-menu>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    // 定义菜单结构
    const sidebarList = [
      {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'UserFilled',
        url: 'UserManage/UserManage'
      },
      {
        path: '/other',
        label: '其他',
        icon: 'MoreFilled',
        children: [
          {
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/PageTwo'
          }
        ]
      }
    ]

    // 通过有无二级菜单判断菜单级别
    const noChildren = () => sidebarList.filter(item => !item.children)
    const hasChildren = () => sidebarList.filter(item => item.children)

    // 引入router方法
    const router = useRouter()

    // 定义点击菜单点击事件回调
    const clickMenu = item => {
      router.push({
        name:item.name, // 跳转路由名称
      })
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
</style>
