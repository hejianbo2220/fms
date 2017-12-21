<template>
  <div>
    <mt-header title="开关控制">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell v-if="line.state === '0'" title="产品编码">
      <span @click="popupShow">{{line.serial}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="product-select">
        <mt-picker :slots="serials" valueKey="serial" @change="popupSure"></mt-picker>
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
      <mt-button v-if="line.state === '1'" @click="stateChange(2)">暂 停</mt-button>
      <mt-button v-else type="primary" @click="stateChange(1)">开 启</mt-button>
      <mt-button type="danger" @click="stateChange(0)">关 闭</mt-button>
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
        startTime: 0
      },
      timer: null,
      popupVisible: false,
      serials: [{
        values: [
          {
            serial: '请选择产品编码',
            value: ''
          }
        ]
      }],
      toast: []
    }
  },
  computed: {
    clock () {
      let hour, minute, second
      hour = minute = second = 0
      const now = new Date()
      const time = now.getTime() - this.line.startTime
      hour = parseInt(time / (60 * 60 * 1000))
      minute = parseInt((time % (60 * 60 * 1000)) / (60 * 1000))
      second = parseInt(((time % (60 * 60 * 1000)) % (60 * 1000)) / 1000)
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
    popupSure (picker, values) {
      if (values[0].value === '') {
        return false
      }
      this.line.serial = values[0].serial
      this.line.productName = values[0].name
      this.line.typeName = values[0].type_name
      this.line.typeId = values[0].type_id
      this.line.spec = values[0].spec
      this.popupVisible = false
    },
    stateChange (state) {
      let stateText = ''
      switch (state) {
        case 0:
          stateText = '关闭'
          break
        case 1:
          stateText = '开启'
          break
        case 2:
          stateText = '暂停'
          break
      }
      this.$messagebox.confirm('确定' + stateText + '该流水线?').then(action => {
        axios(this, {
          msgType: 11,
          serials: this.line.serial,
          batch: this.line.batch,
          state: state,
          id: this.$route.params.id
        }).then(data => {
          this.back()
        })
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
        if (this.$route.params.state === '0') {
          // 流水线关闭时，产品编码选择赋值
          item.value = item.id
          this.serials[0].values.push(item)
        } else {
          // 流水线非关闭时，产品信息赋值
          if (item.serial === this.$route.params.serial) {
            this.line.serial = item.serial
            this.line.productName = item.name
            this.line.typeName = item.type_name
            this.line.spec = item.spec
          }
          this.line.batch = this.$route.params.batch
          this.line.startTime = Number(this.$route.params.time)
        }
      })

      if (this.$route.params.state !== '0') {
        // 每秒更新startTime，触发computed.clock
        this.timer = setInterval(() => {
          this.line.startTime += 1
        }, 1000)
      }
    })
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style>
.product-select{
  width: 100%;
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