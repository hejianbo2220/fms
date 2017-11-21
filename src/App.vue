<template>
  <router-view id="app"/>
</template>

<script>
export default{
  name: 'app',
  mounted () {
    this.$router.push(/Android|iPhone/i.test(navigator.userAgent) ? '/mobile' : '/pc')
  }
}
</script>
