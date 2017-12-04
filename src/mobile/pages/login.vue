<template>
  <div class="mobile-bg">
    <p class="login-title">工厂管理系统</p>
    <input class="login-input" type="text" placeholder="请输入用户名">
    <input class="login-input" type="password" placeholder="请输入密码">
    <button class="login-btn" @click="login">立 即 登 录</button>
  </div>
</template>

<script>
export default{
  name: 'login',
  methods: {
    login () {
      this.$router.push('/mobile/index')
    }
  }
}
</script>

<style scoped>
.login-title{
  margin: 80px 0 60px;
  font-size: 26px;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
.login-input{
  display: block;
  width: 80%;
  box-sizing: border-box;
  padding-left: 20px;
  margin: 0 auto 20px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 22px;
  line-height: 44px;
  font-size: 14px;
  color: #fff;
}
.login-input:focus{
  outline: none;
}
.login-input::-webkit-input-placeholder{
  color: #fff;
}
.login-btn{
  display: block;
  width: 80%;
  margin: 0 auto;
  background: transparent;
  border: 1px solid #fff;
  border-radius: 22px;
  line-height: 44px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
.login-btn:focus{
  outline: none;
}
</style>