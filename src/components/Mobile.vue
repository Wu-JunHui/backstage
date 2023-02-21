<template>
  <div class="mobile-container">
    <div class="m_logo-contaienr">
      <img src="../assets/logo.svg" alt="logo" />
      <h2>通用后台管理系统</h2>
    </div>
    <div class="m_tips-container">
      <div class="m_upTip">
        <img src="../assets/cat.svg" alt="mobile" />
        <span> 抱歉，该系统暂未进行移动端适配<br />请在电脑端打开</span>
      </div>
      <div class="m_downTip">
        <img src="../assets/computer.svg" alt="mobile" />
        <span>https://w-junhui.gitee.io/backstage</span>
      </div>
      <div></div>
    </div>
    <div class="m_authoer">Made with ❤️ by <a href="https://github.com/Wu-JunHui/" target="_blank">Wu-JunHui</a></div>
  </div>
</template>

<style lang="scss">
.mobile-container {
  padding: 20px;
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
    width: 80px;
  }
  h2 {
    margin-left: 10px;
    color: #d9e5dd;
    font-size: 20px;
    letter-spacing: 5px;
  }
}
// 提示
.m_tips-container {
  margin-bottom: 100px;
  color: #d9e5dd;

  .m_upTip,
  .m_downTip {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img {
      width: 65px;
    }
  }
  .m_downTip {
    margin-top: 10px;
    justify-content: center;

    img {
      margin-right: 10px;
      width: 22px;
    }
  }
}
// 作者
.m_authoer {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  color: #fff;
  font-size: 14px;
  a {
    color: #f6b049;
  }
  a:hover {
    color: #5f667f;
  }
}
</style>
