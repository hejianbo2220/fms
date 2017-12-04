<template>
  <router-view />
</template>

<script>
export default{
  name: 'app',
  mounted () {
    if (this.$route.path === '/') {
      this.$router.replace(/Android|iPhone/i.test(navigator.userAgent) ? '/mobile' : '/pc')
    }
  }
}
</script>

<style>
/*reset*/
body{
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

/*pc global*/
.el-message-box__message{
  max-height: 400px;
  overflow-y: auto;
}
.pc-add-btn{
  margin-top: -11px;
  float: right;
}
.pc-breadcrumb-height{
  height: 25px;
}
.pc-filter{
  float: right;
  margin: -13px 0 0 10px;
}
.pc-chart{
  height: 240px;
}

/*mobile global*/
.mobile-mint-header{
  height: 44px;
}
.mobile-btn-wrap{
  padding: 20px 10px;
}
.mobile-bg{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(assets/mobile-login-bg.png);
  background-size: 100% auto;
}
</style>