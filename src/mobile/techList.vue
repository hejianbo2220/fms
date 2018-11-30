<template>
  <div>
    <mt-header title="工艺管理">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <div v-for="(item, index) in data" :key="index" @click="handleClick(item)">
      <mt-cell :title="item.name" :is-link="true"></mt-cell>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'techList',
  data () {
    return {
      data: [],
      toast: []
    }
  },
  methods: {
    handleClick (data) {
      if (data.children) {
        this.data = data.children
      } else {
        this.$router.push('detail/' + encodeURIComponent(data.url))
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    axios(this, {
      msgType: 122
    }).then(data => {
      this.data = data.list
    })
  }
}
</script>