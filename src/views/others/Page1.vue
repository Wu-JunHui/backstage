<template>
  <div class="pageOne-container">
    <h2>页面1演示</h2>
    <Vue3Lottie :animationData="PageOneJSON" :width="550" :height="550" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PageOneJSON from '../../assets/page1.json'
export default defineComponent({
  setup() {
    return {
      PageOneJSON
    }
  }
})
</script>

<style lang="scss">
.pageOne-container {
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
