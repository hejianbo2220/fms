<template>
  <div>
    <mt-header title="数据预览">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="10" infinite-scroll-disabled="loading">
      <mt-cell v-for="(item, index) in data" :key="index" :title="item.serials + '+' + item.batch" :is-link="true" :to="{path: '/mobile/main/data/detail/' + item.serials + '/' + item.batch}"></mt-cell>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'dataList',
  data () {
    return {
      data: [],
      startNo: 0,
      loadFlag: true,
      toast: []
    }
  },
  methods: {
    loadMore () {
      if (this.loadFlag) {
        axios(this, {
          msgType: 5,
          startNo: this.startNo,
          num: 20
        }).then(data => {
          if (data.list.length > 0) {
            data.list.forEach(item => {
              this.data.push(item)
            })
            this.startNo++
          } else {
            this.loadFlag = false
          }
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>