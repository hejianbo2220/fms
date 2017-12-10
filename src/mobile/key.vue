<template>
  <div>
    <mt-header title="关键数据">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell title="产品类型">
      <span @click="popupShow">{{productClass}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">
        <mt-picker :slots="productClasses" valueKey="name" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <template v-for="procedure in key">
      <mt-cell :key="procedure.id" :title="procedure.name"></mt-cell>
      <mt-field v-for="attr in procedure.list" :key="attr.id" :label="attr.name" :placeholder="'请输入' + attr.name"></mt-field>
    </template>
    <div class="btn-wrap">
      <mt-button type="primary" size="large" @click="submit">提 交</mt-button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'key',
  data () {
    return {
      productClass: '请选择产品类型',
      popupVisible: false,
      productClasses: [{
        values: [
          {
            name: '请选择产品类型',
            value: ''
          }
        ]
      }],
      key: []
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
      axios(this, {
        msgType: 71,
        type_id: values[0].id
      }).then(data => {
        this.key = data.list
        this.productClass = values[0].name
        this.popupVisible = false
      })
    },
    submit () {
      if (this.productClass === '请选择产品类型') {
        this.$toast({
          message: '请选择产品类型',
          position: 'bottom',
          duration: 1500
        })
        return false
      }
      // axios(this, {
      //   msgType: 72,
      //   type_id:
      // })
    }
  },
  mounted () {
    axios(this, {
      msgType: 26,
      startNo: 0,
      num: 99999
    }).then(data => {
      data.list.forEach(item => {
        item.value = item.id
        this.productClasses[0].values.push(item)
      })
    })
  }
}
</script>

<style>
.mint-popup{
  width: 100%;
}
</style>