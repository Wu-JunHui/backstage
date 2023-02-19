<template>
  <el-row class="home-container" :gutter="20">
    <!-- 第一列布局 -->
    <el-col class="topLeft-container" :span="8">
      <!-- 用户信息 -->
      <el-card class="user-container" shadow="hover">
        <!-- 上侧 -->
        <div class="user-info">
          <img src="../../assets/defaultUser.svg" alt="默认头像" />
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

      <!-- table信息 -->
      <el-card class="bottomLeft-container" shadow="hover">
        <el-table :data="tableData">
          <el-table-column v-for="(item, index) in tableLabel" :key="index" :prop="index" :label="item"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!-- 第二列布局 -->
    <el-col :span="16">
      <!-- count数据 -->
      <div class="topRight-container">
        <el-card shadow="hover" v-for="item in countData" :key="item.name">
          <!-- 单项左侧图标 -->
          <div class="icon-container" :style="{ background: item.color }">
            <component class="icons" :is="item.icon"></component>
          </div>
          <!-- 单项右侧信息 -->
          <div class="info-container">
            <div class="price"><span>￥</span>{{ item.value }}</div>
            <div class="description">{{ item.name }}</div>
          </div>
        </el-card>
      </div>

      <!-- 折线图 -->
      <el-card class="line-container">
        <div ref="lineRef" class="line"></div>
      </el-card>

      <!-- 饼状图与柱状图 -->
      <div class="graphs-container">
        <!-- 饼状图 -->
        <el-card>
          <div ref="pieRef" class="pie"></div>
        </el-card>
        <!-- 柱状图 -->
        <el-card>
          <div ref="histoRef" class="histogram"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue'
export default defineComponent({
  setup() {
    // 获取当前组件实例，相当于this
    const { proxy } = getCurrentInstance()
    // 定义接收table数据的数组，调用ref函数使其成为响应式数据
    let tableData = ref([])
    // 定义接收count数据的数组
    let countData = ref([])
    const tableLabel = {
      name: '课程',
      todayBuy: '今日购买',
      montuBuy: '本月购买',
      totalBuy: '总共购买'
    }
    // 获取table数据
    const getTableList = async () => {
      let res = await proxy.$api.getTableData()
      tableData.value = res
    }
    // 获取count数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData()
      countData.value = res
    }

    // echart图表基础配置
    // 定义具有x、y轴的通用图表配置对象（用于渲染折线图和柱状图）
    let commonOptions = reactive({
      title: {
        text: '',
        textStyle: {
          color: '#2cb2c2'
        }
      },
      series: [],
      // 全图表字体样式
      textStyle: {
        color: '#333'
      },
      // 离左侧的距离
      grid: { left: '10%' },
      // 提示框
      tooltip: {
        trigger: 'axis', //提示框触发类型
        confine: true // 将提示框限制在容器中，防止溢出被遮挡
      },
      // x轴配置，若多于1个时需使用数组对象形式(默认最多两个)
      xAxis: {
        type: 'category', // 类目轴
        data: [],
        // 坐标轴轴线设置
        axisLine: {
          lineStyle: {
            color: '#17b3a3'
          }
        },
        // 坐标轴刻度标签的显示间隔，在类目轴中有效
        axisLabel: {
          interval: 0, // 设置成 0 强制显示所有标签
          color: '#333'
        }
      },
      // y轴配置，若多于1个时需使用数组对象形式(默认最多两个)
      yAxis: {
        type: 'value',
        name: '',
        axisLine: {
          lineStyle: {
            color: '#17b3a3'
          }
        }
      },
      // 调色板
      color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3']
      // 路径图，用于带有起点和终点的线数据的绘制
    })

    // 定义饼状图配置对象
    let pieOptions = reactive({
      title: {
        text: '销量',
        textStyle: {
          color: '#2cb2c2'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
      series: []
    })

   // 获取图表源数据
    const getEchartsData = async () => {
      let res = await proxy.$api.getEchartsData()
      let orders = res.ordersData //折线图数据需进一步处理
      let user = res.userData
      let video = res.videoData

      // 一、处理折线图
      // 1.遍历orders对象中的data数组，将每个数组元素（对象）的第一个键值输出为数组
      const keyArray = Object.keys(orders.data[0])

      // 2.遍历keyArray，将每个数组元素封装为一个对象，组装series数组
      const lineSeries = []
      keyArray.forEach(key => {
        lineSeries.push({
          name: key,
          // 遍历出每个key对应的数据，由于key是字符串，所以只能使用对象方括号表示法
          data: orders.data.map(item => item[key]),
          type: 'line' // 选择使用折线图
        })
      })

      // 3.将遍历出的路径图数组赋值给通用配置对象对应项
      commonOptions.series = lineSeries
      // 4.将orders对象的date数组用于折线图的x轴
      commonOptions.xAxis.data = orders.date
      // 5.传入折线图标题与y轴标题
      commonOptions.title.text = '一周数据总览'
      commonOptions.yAxis.name = '销量'

      // 开始渲染数据，需先导入echarts模块
      // 渲染折线图，调用init方法初始化一个echarts实例
      let ordersEcharts = echarts.init(proxy.$refs['lineRef'])
      // 通过 setOption 方法生成折线图
      ordersEcharts.setOption(commonOptions)

      // 二、处理柱状图
      // 1.定义柱状图的路径图数组
      const userSeries = [
        {
          name: '新增用户',
          data: user.map(item => item.new),
          type: 'bar'
        },
        {
          name: '活跃用户',
          data: user.map(item => item.active),
          type: 'bar'
        }
      ]
      // 2.通过覆盖通用配置对象属性进行渲染
      commonOptions.series = userSeries
      // 将orders对象的date数组用于折线图的x轴
      commonOptions.xAxis.data = user.map(item => item.date)
      // 传入折线图标题与y轴标题
      commonOptions.title.text = '用户统计'
      commonOptions.yAxis.name = ''

      // 渲染柱状图，调用init方法初始化一个echarts实例
      let histoEcharts = echarts.init(proxy.$refs['histoRef'])
      // 通过 setOption 方法生成折线图
      histoEcharts.setOption(commonOptions)

      // 三、处理饼状图
      const videoSeries = [
        {
          type: 'pie', // 选择使用饼状图
          data: video
        }
      ]
      pieOptions.series = videoSeries
      // // 调用init方法初始化一个echarts实例
      let pieEcharts = echarts.init(proxy.$refs['pieRef'])
      pieEcharts.setOption(pieOptions)
    }

    onMounted(() => {
      getTableList(), getCountData(), getEchartsData()
    })
    return {
      tableData,
      tableLabel,
      countData
    }
  }
})
</script>

<style lang="scss">
.home-container {
  margin-top: 20px;
}
// 第一列
.topLeft-container {
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

.bottomLeft-container {
  margin-top: 20px;
}

// 第二列
// count数据
.topRight-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    margin-bottom: 15px;
    width: 30%;
    border-radius: 10px;
    .el-card__body {
      padding: 0;
      display: flex;
      justify-content: space-between;
      .icon-container {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icons {
          width: 70%;
          color: #fff;
        }
      }
      .info-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // text-align: center;
        .description {
          margin-top: 5px;
          color: #ccc;
          font-size: 14px;
        }
        .price {
          font-size: 24px;
          span {
            font-size: 20px;
          }
        }
      }
    }
  }
}

// 折线图
.line-container {
  height: 280px;
  // z-index: 100;
  // overflow-y: visible;
  .line {
    width: 100%;
    height: 280px;
  }
}

// 饼状图
.graphs-container {
  // width:60%;
  height: 260px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
  }
  // .el-card {
  //   height: 260px;
  // }
  .pie,
  .histogram {
    width: 100%;
    height: 250px;
  }
}
</style>
