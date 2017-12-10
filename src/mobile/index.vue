<template>
  <div class="index-bg">
    <button v-for="(item, index) in menu" :key="index" @click="goTo(item)" class="menu-btn">
      <img :src="item.icon">
      <p>{{item.title}}</p>
    </button>
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
          icon: '../static/img/mobile-switch.png',
          path: '/mobile/main/line/list'
        },
        {
          title: '关键数据',
          icon: '../static/img/mobile-key.png',
          path: '/mobile/main/template/关键数据'
        },
        {
          title: '自检自测',
          icon: '../static/img/mobile-inspection.png',
          path: '/mobile/main/template/自检自测'
        },
        {
          title: '质量检测',
          icon: '../static/img/mobile-quality.png',
          path: '/mobile/main/template/质量检测'
        },
        {
          title: '数据预览',
          icon: '../static/img/mobile-preview.png',
          path: '/mobile/main/data/list'
        },
        {
          title: '问题提交',
          icon: '../static/img/mobile-question.png',
          path: '/mobile/main/question'
        }
      ],
      toast: []
    }
  },
  methods: {
    goTo (item) {
      if (item.permission === '1') {
        this.toast.forEach(item => {
          item.close()
        })
        this.$router.push(item.path)
      } else {
        this.toast.push(this.$toast({
          message: '无操作权限，无法进入',
          duration: 1000
        }))
      }
    }
  },
  mounted () {
    this.menu[0].permission = this.$store.state.permission[2]
    this.menu[1].permission = this.$store.state.permission[4]
    this.menu[2].permission = this.$store.state.permission[5]
    this.menu[3].permission = this.$store.state.permission[6]
    this.menu[4].permission = this.$store.state.permission[8]
    this.menu[5].permission = this.$store.state.permission[7]
  }
}
</script>

<style scoped>
.index-bg{
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(../assets/mobile-login-bg.png);
  background-size: 100% auto;
}
.menu-btn{
  display: block;
  width: 50%;
  float: left;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 0;
  font-size: 16px;
  color: #fff;
}
.menu-btn:nth-child(2n + 1){
  border-right: 1px solid #fff;
}
.menu-btn > img{
  display: block;
  width: 40px;
  margin: 20px auto 0;
}
</style>