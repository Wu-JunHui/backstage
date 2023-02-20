<template>
  <div class="mobile-container">
    <div class="m_logo-contaienr">
      <img src="../assets/logo.svg" alt="logo" />
      <h2>通用后台管理系统</h2>
    </div>
    <div class="m_tips-container">
      <img src="../assets/mobileTips.svg" alt="mobile" />
      <p>
        抱歉，该系统暂未进行移动端适配<br />请在PC端打开<br />
        https://w-junhui.gitee.io/backstage
      </p>
    </div>
    <div class="m_authoer">Made with ❤️ by <a href="https://github.com/Wu-JunHui/" target="_blank">Wu-JunHui</a></div>
  </div>
</template>

<style lang="scss">
.mobile-container {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background: url('../assets/mobileBg.webp') no-repeat;
  background-size: 100% 100%;
}
// logo
.m_logo-contaienr {
  display: flex;
  align-items: center;
  img {
    width: 5rem;
  }
  h2 {
    margin-left: 10px;
    color: #D9E5DD;
    font-size: 1.25rem;
    letter-spacing: 0.3125rem;
  }
}
// 提示
.m_tips-container {
  margin-bottom: 6.25rem;
  display: flex;
  img {
    width: 4.375rem;
  }
  p{
    margin-left: 0.625rem;
    line-height: 1.5rem;
    color: #D9E5DD;
  }
}
// 作者
.m_authoer {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  color: #fff;
  font-size: 0.875rem;
  a {
    color: #f6b049;
  }
  a:hover {
    color: #5f667f;
  }
}
</style>
