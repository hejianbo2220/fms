<template>
  <div class="login-bg">
    <p class="login-title">生产数据采集系统</p>
    <input class="login-input" placeholder="请输入用户名" v-model="username">
    <input type="password" class="login-input" placeholder="请输入密码" v-model="password">
    <button class="login-btn" @click="login">立 即 登 录</button>
  </div>
</template>

<script>
import axios from '@/axios'
import md5 from 'md5'
export default{
  name: 'login',
  data () {
    return {
      username: localStorage.getItem('stfsUsername'),
      password: localStorage.getItem('stfsPassword'),
      toast: []
    }
  },
  methods: {
    login () {
      if (this.username === '') {
        this.toast.push(this.$toast({
          message: '请输入用户名',
          duration: 1000
        }))
        return false
      }
      if (this.password === '') {
        this.toast.push(this.$toast({
          message: '请输入密码',
          duration: 1000
        }))
        return false
      }
      this.toast.forEach(item => {
        item.close()
      })
      axios(this, {
        msgType: 1,
        userID: this.username,
        password: md5(this.password)
      }).then(data => {
        localStorage.setItem('stfsUsername', this.username)
        localStorage.setItem('stfsPassword', this.password)
        this.$store.commit('set', data)
        this.$router.push('/mobile/main/index')
      })
    }
  }
}
</script>

<style scoped>
.login-bg{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(../assets/mobile-login-bg.png);
  background-size: 100% auto;
}
.login-title{
  margin: 80px 0 60px;
  font-size: 24px;
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
</style>