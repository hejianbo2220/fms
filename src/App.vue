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
input:focus, button:focus{
  outline: none;
}

/*global*/
.green{
  color: #67C23A;
}
.red{
  color: #FA5555;
}
.orange{
  color: #EB9E05;
}
</style>