<template>
  <div>
    <mt-header title="开关控制">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <!-- <ul>
      <li>
        <p class="name">流水线1</p>
        <p class="status">状态：<span class="green">运行中</span></p>
      </li>
    </ul> -->
    <mt-cell v-for="(item, index) in line" :key="index" :title="item.name" :is-link="true" :to="'/#/mobile/switch/detail/' + item.id">
      状态：<span :class="statusClass(item.status)">{{item.status}}</span>
    </mt-cell>
  </div>
</template>

<script>
export default{
  name: 'switchList',
  data () {
    return {
      line: [
        {
          id: '123',
          name: '流水线1',
          status: '运行中'
        },
        {
          id: '456',
          name: '流水线2',
          status: '已关闭'
        },
        {
          id: '789',
          name: '流水线3',
          status: '已暂停'
        }
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    statusClass (value) {
      switch (value) {
        case '运行中':
          return 'green'
        case '已关闭':
          return 'red'
        case '已暂停':
          return 'orange'
      }
    }
  }
}
</script>

<style scoped>
/*ul, p{
  margin: 0;
  padding: 0;
}
ul{
  list-style: none;
}
ul > li{
  position: relative;
}
.status{
  position: absolute;
  top: 0;
  right: 0;
}*/
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