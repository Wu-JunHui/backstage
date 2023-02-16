<template>
  <el-row class="home-container" :gutter="20">
    <!-- 第一列布局 -->
    <el-col class="firCol-container" :span="8">
      <!-- 用户信息 -->
      <el-card class="user-container" shadow="hover">
        <!-- 上侧 -->
        <div class="user-info">
          <img src="../assets/defaultUser.svg" alt="默认头像" />
          <div class="user-details">
            <div class="name"><span>用户名：</span> Administrator</div>
            <div class="role"><span>角色：</span> 管理员</div>
          </div>
        </div>
        <!-- 下侧 -->
        <div class="login-info">
          <div>上次登录时间：<span>2023-01-01</span></div>
          <div>上次登录地点：<span>深圳</span></div>
        </div>
      </el-card>

      <!-- 其他信息 -->
      <el-card class="secCol-container" shadow="hover">
        <el-table :data="tableData">
          <el-table-column v-for="(item, index) in tableLabel" :key="index" :prop="index" :label="item"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 第二列布局 -->
    <el-col :span="16">
      
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  setup() {
    // 获取当前组件实例，用于调用全局变量$api
    const { proxy } = getCurrentInstance()
    let tableData = ref([])
    const tableLabel = {
      name: '课程',
      todayBuy: '今日购买',
      montuBuy: '本月购买',
      totalBuy: '总共购买'
    }
    // 定义Ajxax请求函数
    const getTableList = async () => {
      let data = await proxy.$api.getTableData()
      tableData.value = data
    }

    onMounted(() => {
      getTableList()
    })
    return {
      tableData,
      tableLabel
    }
  }
})
</script>

<style lang="scss">
.home-container {
  margin-top: 20px;
}
.firCol-container {
  // 用户面板
  .user-container {
    .user-info {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      // justify-content: space-between;
      border-bottom: 1px solid #ccc;
      img {
        width: 130px;
      }
      .user-details {
        margin-left: 20px;
        line-height: 35px;
        div {
          display: flex;
        }
        span {
          margin-right: 10px;
          width: 70px;
          text-align: right;
        }
      }
    }
    .login-info {
      margin-top: 10px;
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        margin-left: 20px;
        color: #666;
      }
    }
  }
}

.secCol-container {
  margin-top: 20px;
}
</style>
