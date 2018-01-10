<template>
  <div>
    <mt-header title="废料记录">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell title="产品编码" class="mint-field">
      <span @click="popupShow" class="mint-field-text">{{serial}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="product-select">
        <mt-picker :slots="serials" valueKey="label" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <mt-field label="废弃原因" placeholder="请输入问题描述" type="textarea" rows="4" v-model="form.reason"></mt-field>
    <mt-field label="重量" placeholder="请输入问题标题" type="number" v-model="form.weight"></mt-field>
    <div class="btn-wrap">
      <mt-button type="primary" size="large" @click="submit">提 交</mt-button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'question',
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
        msgType: 110,
        serials: '',
        batch: '',
        reason: '',
        weight: ''
      }
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
      this.form.serials = values[0].serials
      this.form.batch = values[0].batch
      this.serial = values[0].serials + '+' + values[0].batch
      this.popupVisible = false
    },
    submit () {
      axios(this, this.form).then(data => {
        this.$messagebox.alert('提交成功').then(action => {
          this.back()
        })
      })
    }
  },
  mounted () {
    axios(this, {
      msgType: 5,
      startNo: 0,
      num: 99999
    }).then(data => {
      data.list.forEach(item => {
        item.label = item.serials + '+' + item.batch
        item.value = item.serials
        this.serials[0].values.push(item)
      })
    })
  }
}
</script>

<style scoped>
.product-select{
  width: 100%;
}
.mint-field-text{
  color: #888;
}
</style>