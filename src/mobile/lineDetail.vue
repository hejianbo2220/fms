<template>
  <div>
    <mt-header title="开关控制">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell v-if="line.state === '0'" title="产品编码">
      <span @click="popupShow">{{line.serial}}</span>
      <mt-popup v-model="popupVisible" position="top" class="serial-select-wrap">
        <el-select v-model="serial" popper-class="serial-select-item" filterable placeholder="请选择产品编码" class="serial-select" @change="popupSure">
          <el-option v-for="(item, index) in serials" :key="index" :value="item.serial"></el-option>
        </el-select>
      </mt-popup>
    </mt-cell>
    <mt-cell v-else title="产品编码" :value="line.serial"></mt-cell>
    <mt-cell title="产品名称" :value="line.productName"></mt-cell>
    <mt-cell title="产品类型" :value="line.typeName"></mt-cell>
    <mt-cell title="规格型号" :value="line.spec"></mt-cell>
    <mt-field v-if="line.state === '0'" label="批次号" placeholder="请输入批次号" v-model="line.batch"></mt-field>
    <mt-cell v-else title="批次号" :value="line.batch"></mt-cell>
    <p v-if="line.state !== '0'" class="clock">{{clock}}</p>
    <div v-if="line.state === '0'" class="btn-wrap">
      <mt-button type="primary" size="large" @click="open">开 启</mt-button>
    </div>
    <div v-else class="btn-wrap btn-inline">
      <mt-button v-if="line.state === '1'" @click="pause">暂 停</mt-button>
      <mt-button v-else type="primary" @click="stateChangeConfirm(1)">开 启</mt-button>
      <mt-button type="danger" @click="stateChangeConfirm(0)">关 闭</mt-button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'lineDetail',
  data () {
    return {
      line: {
        state: '',
        serial: '请选择产品编码',
        productName: '',
        typeName: '',
        typeId: '',
        spec: '',
        batch: '',
        time: 0
      },
      timer: null,
      popupVisible: false,
      serials: [],
      serial: '',
      toast: []
    }
  },
  computed: {
    clock () {
      let hour, minute, second
      hour = minute = second = 0
      hour = parseInt(this.line.time / (60 * 60 * 1000))
      minute = parseInt((this.line.time % (60 * 60 * 1000)) / (60 * 1000))
      second = parseInt(((this.line.time % (60 * 60 * 1000)) % (60 * 1000)) / 1000)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return hour + ' : ' + minute + ' : ' + second
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    popupShow () {
      this.popupVisible = true
    },
    popupSure (value) {
      this.serials.forEach(item => {
        if (item.serial === value) {
          this.line.serial = item.serial
          this.line.productName = item.name
          this.line.typeName = item.type_name
          this.line.typeId = item.type_id
          this.line.spec = item.spec
          this.popupVisible = false
        }
      })
    },
    pause () {
      // prompt的第一个参数要传入一个空格
      this.$messagebox.prompt(' ', '请输入暂停原因').then(({value, action}) => {
        if (value !== null) {
          this.stateChange(2, value)
        }
      }).catch(() => {})
    },
    stateChange (state, reason) {
      axios(this, {
        msgType: 11,
        serials: this.line.serial,
        batch: this.line.batch,
        state: state,
        id: this.$route.params.id,
        reason: reason
      }).then(data => {
        this.back()
      })
    },
    stateChangeConfirm (state) {
      let stateText = ''
      switch (state) {
        case 0:
          stateText = '关闭'
          break
        case 1:
          stateText = '开启'
          break
      }
      this.$messagebox.confirm('确定' + stateText + '该流水线?').then(action => {
        this.stateChange(state, '')
      }).catch(() => {})
    },
    open () {
      if (this.line.serial === '请选择产品编码') {
        this.toast.push(this.$toast({
          message: '请选择产品编码',
          position: 'bottom',
          duration: 1500
        }))
        return false
      }
      if (this.line.batch === '') {
        this.toast.push(this.$toast({
          message: '请输入批次号',
          position: 'bottom',
          duration: 1500
        }))
        return false
      }
      axios(this, {
        msgType: 35,
        serials: this.line.serial,
        batch: this.line.batch,
        type_id: this.line.typeId,
        pipeline: this.$route.params.id
      }).then(data => {
        this.back()
      })
    }
  },
  mounted () {
    // 获取产品编码列表
    axios(this, {
      msgType: 27,
      startNo: 0,
      num: 99999
    }).then(data => {
      // 流水线状态
      this.line.state = this.$route.params.state

      data.list.forEach(item => {
        if (this.line.state === '0') {
          // 流水线关闭时，产品编码选择赋值
          // item.value = item.id
          // this.serials[0].values.push(item)
          this.serials = data.list
        } else {
          // 流水线非关闭时，产品信息赋值
          if (item.serial === this.$route.params.serial) {
            this.line.serial = item.serial
            this.line.productName = item.name
            this.line.typeName = item.type_name
            this.line.spec = item.spec
          }
        }
      })

      // 流水线为非关闭时，批次号和运行时间赋值
      if (this.line.state !== '0') {
        this.line.batch = this.$route.params.batch
        if (this.line.state === '1') {
          // 流水线开启时，运行时间等于该次运行时间(当前时间 - 该次开启时间) + 历史运行时间
          const now = new Date()
          this.line.time = now.getTime() - Number(this.$route.params.start) + Number(this.$route.params.time)

          // 流水线开启时，每秒更新time，触发computed.clock
          this.timer = setInterval(() => {
            this.line.time += 1000
          }, 1000)
        } else {
          // 流水线暂停时，运行时间等于历史运行时间
          this.line.time = Number(this.$route.params.time)
        }
      }
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style>
.serial-select-wrap{
  width: 100%;
  top: 44px;
}
.serial-select{
  width: 100%;
}
.serial-select-item{
  left: 0 !important;
  z-index: 3000 !important;
}
.mint-field-core{
  text-align: right;
}
.btn-inline{
  display: flex;
  justify-content: space-between;
}
.btn-inline > .mint-button{
  flex-grow: 1;
}
.btn-inline > .mint-button:first-child{
  margin-right: 10px;
}
.clock{
  margin: 15px 0 0;
  font-size: 32px;
  text-align: center;
}
</style>