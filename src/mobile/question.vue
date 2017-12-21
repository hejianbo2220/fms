<template>
  <div>
    <mt-header title="问题提交">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell title="产品编码" class="mint-field">
      <span @click="popupShow" class="mint-field-text">{{serial}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="product-select">
        <mt-picker :slots="serials" valueKey="label" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <mt-field label="问题标题" placeholder="请输入问题标题" v-model="form.title"></mt-field>
    <mt-field label="问题来源" placeholder="请输入问题来源" v-model="form.source"></mt-field>
    <mt-field label="责任方" placeholder="请输入责任方" v-model="form.person"></mt-field>
    <mt-field label="问题描述" placeholder="请输入问题描述" type="textarea" rows="4" v-model="form.desc"></mt-field>
    <mt-field label="处理方案" placeholder="请输入处理方案" type="textarea" rows="4" v-model="form.programe"></mt-field>
    <mt-field label="改进措施" placeholder="请输入改进措施" type="textarea" rows="4" v-model="form.improv"></mt-field>
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
        msgType: 100,
        serials: '',
        batch: '',
        title: '',
        source: '',
        person: '',
        desc: '',
        programe: '',
        improv: '',
        state: 0,
        msg: ''
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