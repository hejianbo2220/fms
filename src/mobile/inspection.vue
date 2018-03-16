<template>
  <div>
    <mt-header title="自检自测">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell title="产品编码">
      <span @click="popupShow">{{serial}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="product-select">
        <mt-picker :slots="serials" valueKey="label" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <mt-field v-for="(attr, index) in form.list" :key="index" :label="attr.name" :placeholder="'请输入' + attr.name" v-model="attr.value"></mt-field>
    <div class="btn-wrap">
      <mt-button type="primary" size="large" @click="validate">提 交</mt-button>
    </div>
  </div>
</template>

<script>
import axiosData from '@/axios'
export default{
  name: 'inspection',
  data () {
    return {
      serial: '请选择产品编码',
      popupVisible: false,
      serials: [{
        values: [
          {
            label: '请选择产品编码',
            value: ''
          }
        ]
      }],
      form: {
        msgType: 82,
        type_id: '',
        serials: '',
        batch: '',
        user: '乱填的',
        list: []
      },
      toast: []
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
      const params = {
        msgType: 81,
        type_id: values[0].type_id
      }
      axiosData(this, params).then(data => {
        this.form.type_id = values[0].type_id
        this.form.serials = values[0].serials
        this.form.batch = values[0].batch
        this.form.list = data.list
        this.serial = values[0].serials + '+' + values[0].batch
        this.popupVisible = false
      })
    },
    validate () {
      if (this.serial === '请选择产品编码') {
        this.toast.push(this.$toast({
          message: '请选择产品编码',
          position: 'bottom',
          duration: 1500
        }))
        return false
      }
      this.submit()
    },
    submit () {
      axiosData(this, this.form).then(data => {
        this.$messagebox.alert('提交成功').then(action => {
          this.back()
        })
      })
    }
  },
  mounted () {
    axiosData(this, {
      msgType: 5,
      startNo: 0,
      num: 99999
    }).then(data => {
      data.list.forEach(item => {
        item.label = item.serials + '+' + item.batch
        item.value = item.type_id
        this.serials[0].values.push(item)
      })
    })
  }
}
</script>