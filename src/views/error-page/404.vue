<template>
  <div class="app-container http404-container">
    <div class="http404">
      <img src="@/assets/images/404.png" alt="404" class="pic-404">
      <div class="bullshit">
        <el-link type="primary" class="bullshit__oops" :underline="false">OOPS!</el-link>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的URL是否正确，或单击按钮返回首页。</div>
        <el-button type="primary" size="large" @click="$router.push('/home')">返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '抱歉，你访问的页面不存在或无权访问!'
    }
  }
}
</script>

<style lang="scss" scoped>
.http404-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.http404 {
  .pic-404 {
    position: relative;
    float: left;
    width: 500px;
    overflow: hidden;
    margin-right: 100px;
  }
  .bullshit {
    position: relative;
    float: left;
    width: 350px;
    padding: 90px 0;
    overflow: hidden;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 40px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      float: left;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
