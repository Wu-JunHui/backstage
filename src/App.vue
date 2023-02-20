<template>
  <Mobile v-if="isMobile"></Mobile>
  <RouterView v-else></RouterView>
</template>

<script>
import Mobile from './components/Mobile.vue'
export default {
  components: { Mobile },
  setup() {
    // 无匹配值则返回null，若有则返回一个数组
    let isMobile = window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return {
      isMobile
    }
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
