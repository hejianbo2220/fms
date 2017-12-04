<template>
  <div>
    <mt-header title="开关控制">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell v-if="line.status === '已关闭'" title="产品编码">
      <span @click="popupShow">{{line.productId}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">
        <mt-picker :slots="productIds" valueKey="name" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <mt-cell v-else title="产品编码" :value="line.productId"></mt-cell>
    <mt-cell title="产品名称" :value="line.productName"></mt-cell>
    <mt-cell title="产品类型" :value="line.productClass"></mt-cell>
    <mt-cell title="规格型号" :value="line.productStandard"></mt-cell>
    <mt-field v-if="line.status === '已关闭'" label="批次号" placeholder="请输入批次号" v-model="line.batchId"></mt-field>
    <mt-cell v-else title="批次号" :value="line.batchId"></mt-cell>
    <!-- todo 运行时间 -->
    <div v-if="line.status === '已关闭'" class="btn-wrap">
      <mt-button type="primary" size="large" @click="open">开 启</mt-button>
    </div>
    <div v-else class="btn-wrap btn-inline">
      <mt-button v-if="line.status === '运行中'" @click="pause">暂 停</mt-button>
      <mt-button v-else type="primary" @click="open">开 启</mt-button>
      <mt-button type="danger" @click="stop">关 闭</mt-button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'lineDetail',
  data () {
    return {
      line: {
        status: '',
        productId: '',
        productName: '',
        productClass: '',
        productStandard: '',
        batchId: ''
      },
      popupVisible: false,
      productIds: [
        {
          values: [
            {
              name: '请选择产品编码',
              value: ''
            },
            {
              name: '产品编码1',
              value: 'value1'
            },
            {
              name: '产品编码2',
              value: 'value2'
            },
            {
              name: '产品编码3',
              value: 'value3'
            }
          ]
        }
      ]
    }
  },
  methods: {
    getLineStatus () {
      console.log('获取流水线状态')
      const data = {
        status: '运行中',
        productId: '产品编码1',
        productName: '产品1',
        productClass: '产品类型1',
        productStandard: '规格型号1',
        batchId: '批次1'
      }
      Object.assign(this.line, data)
    },
    back () {
      this.$router.go(-1)
    },
    popupShow () {
      this.popupVisible = true
    },
    popupSure (picker, values) {
      this.line.productId = values[0].name
      if (values[0].value !== '') {
        console.log('获取产品类型、产品名称、规格型号')
        const data = {
          productName: '产品1',
          productClass: '产品类型1',
          productStandard: '规格型号1'
        }
        Object.assign(this.line, data)
        this.popupVisible = false
      }
    },
    open () {
      if (this.line.productId === '请选择产品编码') {
        this.$toast({
          message: '请选择产品编码',
          position: 'bottom',
          duration: 1500
        })
        return false
      }
      if (this.line.batchId === '') {
        this.$toast({
          message: '请输入批次号',
          position: 'bottom',
          duration: 1500
        })
        return false
      }
      this.$messagebox.confirm('确定开启该流水线?').then(action => {
        this.getLineStatus()
      }).catch(() => {})
    },
    pause () {
      this.$messagebox.confirm('确定暂停该流水线?').then(action => {
        this.getLineStatus()
      }).catch(() => {})
    },
    stop () {
      this.$messagebox.confirm('确定关闭该流水线?').then(action => {
        this.getLineStatus()
      }).catch(() => {})
    }
  },
  mounted () {
    this.getLineStatus()
  }
}
</script>

<style>
.mint-popup{
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
</style>