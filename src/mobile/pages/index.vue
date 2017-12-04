<template>
  <div class="mobile-bg">
    <button v-for="(item, index) in menu" :key="index" @click="goTo(item)" class="menu-btn">{{item.title}}</button>
  </div>
</template>

<script>
export default{
  name: 'index',
  data () {
    return {
      menu: [
        {
          title: '开关控制',
          isPermit: true,
          path: '/mobile/main/switch/list'
        },
        {
          title: '关键数据',
          isPermit: true,
          path: '/mobile/main/key'
        },
        {
          title: '自检自测',
          isPermit: true,
          path: '/mobile/main/inspection'
        },
        {
          title: '质量检测',
          isPermit: false,
          path: '/mobile/main/quality'
        },
        {
          title: '数据预览',
          isPermit: true,
          path: '/mobile/main/preview'
        },
        {
          title: '问题列表',
          isPermit: true,
          path: '/mobile/main/question'
        }
      ]
    }
  },
  methods: {
    goTo (item) {
      if (item.isPermit) {
        this.$router.push(item.path)
      } else {
        this.$toast({
          message: '无操作权限，无法进入'
        })
      }
    }
  }
}
</script>

<style scoped>
.menu-btn{
  display: block;
  width: 50%;
  float: left;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  line-height: 100px;
  font-size: 16px;
  color: #fff;
}
.menu-btn:nth-child(2n + 1){
  border-right: 1px solid #fff;
}
</style>