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
.pc-add-btn{
  margin-top: -11px;
  float: right;
}
.el-message-box__message{
  max-height: 400px;
  overflow-y: auto;
}
.chart{
  height: 240px;
}

/*mobile global*/
.mobile-mint-header{
  height: 44px;
}
.mobile-btn-wrap{
  padding: 20px 10px;
}
</style>