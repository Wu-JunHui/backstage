<template>
  <div class="pageTwo-container">
    <h2>页面2演示</h2>
    <Vue3Lottie :animationData="PageTwoJSON" :width="550" :height="550" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PageTwoJSON from '../../assets/page2.json'
export default defineComponent({
  setup() {
    return {
      PageTwoJSON
    }
  }
})
</script>

<style lang="scss">
.pageTwo-container {
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
