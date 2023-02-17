<template>
  <div class="layout-container">
    <el-container>
      <!-- 左侧边栏 -->
      <Sidebar></Sidebar>

      <!-- 右容器 -->
      <el-container>
        <!-- 标题栏 -->
        <el-header>
          <Header></Header>
        </el-header>

        <!-- 主体内容 -->
        <el-main>
          <!-- 标签栏 -->
          <Tags></Tags>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Tags from '../components/Tags.vue'

export default defineComponent({
  components: {
    Header,
    Sidebar,
    Tags
  }
})
</script>

<style lang="scss">
.layout-container {
  height: 100%;
  .el-container {
    height: 100%;
    // .el-aside {
    //   height: 100%;
    //   background-color: #3b3c3d;
    // }
  }
}
</style>
