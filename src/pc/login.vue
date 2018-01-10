<template>
  <el-row type="flex" align="middle" class="login-bg">
    <el-col :span="8" :offset="8" class="login-wrap">
      <el-row>
        <el-col :span="24" class="login-title">生产数据采集系统</el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="form" :rules="rules" ref="dialogForm">
            <el-form-item prop="username">
              <el-input v-model="form.username" prefix-icon="el-icon-tickets" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="form.password" prefix-icon="el-icon-document" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import axios from '@/axios'
import md5 from 'md5'
export default{
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          axios(this, {
            msgType: 1,
            userID: this.form.username,
            password: md5(this.form.password)
          }).then(data => {
            this.$store.commit('set', data)
            this.$router.push('/pc/main/index')
          })
        }
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
  background-image: url(../assets/pc-login-bg.png);
  background-size: 100% auto;
}
.login-wrap{
  padding: 50px 0 30px;
  background-color: rgba(255, 255, 255, .8);
  border-radius: 10px;
}
.login-title{
  padding-bottom: 20px;
  font-size: 26px;
  color: #409EFF;
  text-align: center;
}
.el-button{
  width: 100%;
}
</style>