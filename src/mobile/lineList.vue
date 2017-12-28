<template>
  <div>
    <mt-header title="开关控制">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <div v-infinite-scroll="loadMore" infinite-scroll-distance="10" infinite-scroll-disabled="loading">
      <mt-cell v-for="(item, index) in line" :key="index" :title="item.name" :is-link="true" :to="'/#/mobile/main/line/detail/' + item.id + '/' + item.state + '/' + (item.serials === '' ? 'none' : item.serials) + '/' + (item.batch === '' ? 'none' : item.batch) + '/' + item.startTime + '/' + item.timelenth">
        状态：<span :class="stateSwitch(item.state).class">{{stateSwitch(item.state).text}}</span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'lineList',
  data () {
    return {
      line: [],
      startNo: 0,
      loadFlag: true,
      toast: []
    }
  },
  methods: {
    loadMore () {
      if (this.loadFlag) {
        axios(this, {
          msgType: 10,
          startNo: this.startNo,
          num: 20
        }).then(data => {
          if (data.list.length > 0) {
            data.list.forEach(item => {
              this.line.push(item)
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
    },
    stateSwitch (state) {
      switch (state) {
        case 0:
          return {class: 'red', text: '已关闭'}
        case 1:
          return {class: 'green', text: '运行中'}
        case 2:
          return {class: 'orange', text: '已暂停'}
      }
    }
  }
}
</script>