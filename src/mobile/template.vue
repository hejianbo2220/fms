<template>
  <div>
    <mt-header :title="title">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell title="产品编码">
      <span @click="popupShow">{{serial}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade">
        <mt-picker :slots="serials" valueKey="label" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <template v-if="title === '关键数据'" v-for="procedure in form.list">
      <mt-cell :key="procedure.id" :title="procedure.name" class="subtitle"></mt-cell>
      <mt-field v-for="attr in procedure.list" :key="attr.id" :label="attr.name" :placeholder="'请输入' + attr.name" v-model="attr.value"></mt-field>
    </template>
    <mt-field v-if="title !== '关键数据'" v-for="attr in form.list" :key="attr.id" :label="attr.name" :placeholder="'请输入' + attr.name" v-model="attr.value"></mt-field>
    <div class="btn-wrap">
      <mt-button type="primary" size="large" @click="submit">提 交</mt-button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'template',
  data () {
    return {
      title: this.$route.params.type,
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
        msgType: this.msgType().submit,
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
    msgType () {
      switch (this.$route.params.type) {
        case '关键数据':
          return {get: 71, submit: 72}
        case '自检自测':
          return {get: 81, submit: 82}
        case '质量检测':
          return {get: 91, submit: 92}
      }
    },
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
        msgType: this.msgType().get,
        type_id: values[0].type_id
      }).then(data => {
        this.form.type_id = values[0].type_id
        this.form.serials = values[0].serials
        this.form.batch = values[0].batch
        this.form.list = data.list
        this.serial = values[0].serials + '+' + values[0].batch
        this.popupVisible = false
      })
    },
    submit () {
      if (this.serial === '请选择产品编码') {
        this.toast.push(this.$toast({
          message: '请选择产品编码',
          position: 'bottom',
          duration: 1500
        }))
        return false
      }
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
        item.value = item.type_id
        this.serials[0].values.push(item)
      })
    })
  }
}
</script>

<style scoped>
.mint-popup{
  width: 100%;
}
</style>