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
.add-btn{
  margin-top: -11px;
  float: right;
}

/*mobile global*/
.mobile-mint-header{
  height: 44px;
}
</style>
