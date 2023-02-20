<template>
  <div class="management-container">
    <h2>商品管理页演示</h2>
    <Vue3Lottie :animationData="ManageJSON" :width="550" :height="550" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ManageJSON from '../../assets/mall.json'
export default defineComponent({
  setup() {
    return {
      ManageJSON
    }
  }
})
</script>

<style lang="scss">
.management-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    margin: 20px 0;
    text-align: center;
    color: #2cb2c2;
    font-size: 50px;
    letter-spacing: 20px;
  }
}
</style>
