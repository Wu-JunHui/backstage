<template>
  <div class="personal-container">
    <h2>个人中心页演示</h2>
    <Vue3Lottie :animationData="PersonalJSON" :width="550" :height="550" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PersonalJSON from '../../assets/personal.json'
export default defineComponent({
  setup() {
    return {
      PersonalJSON
    }
  }
})
</script>

<style lang="scss">
.personal-container {
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
