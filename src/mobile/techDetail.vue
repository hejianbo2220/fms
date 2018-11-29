<template>
  <div>
    <mt-header title="工艺管理">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <iframe frameborder="0" width="100%" :height="height" :src="src"></iframe>
  </div>
</template>

<script>
export default{
  name: 'techDetail',
  data () {
    return {
      height: '',
      src: ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.height = (innerHeight - 44) + 'px'
    this.src = this.$route.params.url
  }
}
</script>