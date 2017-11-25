<template>
  <router-view />
</template>

<script>
export default{
  name: 'app',
  mounted () {
    this.$router.replace(/Android|iPhone/i.test(navigator.userAgent) ? '/mobile' : '/pc')
  }
}
</script>
