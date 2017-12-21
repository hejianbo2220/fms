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
    <template v-if="title === '关键数据'" v-for="(procedure, procedureIndex) in form.list">
      <mt-cell :key="procedureIndex" :title="procedure.name" class="subtitle"></mt-cell>
      <template v-for="(attr, attrIndex) in procedure.list">
        <mt-field :key="procedureIndex + '-' + attrIndex" :label="attr.name" :placeholder="'请输入' + attr.name" v-model="attr.value" :disabled="attr.device !== deviceId"></mt-field>
        <mt-field label="上传图片" class="upload-wrap">
          <input class="upload-input" type="file" :disabled="attr.device !== deviceId" @change="upload($event, procedureIndex, attrIndex)">
          <p class="upload-text" :class="attr.img === '' ? 'upload-text-placeholder' : ''">{{attr.img === '' ? '请选择图片' : attr.img}}</p>
        </mt-field>
      </template>
    </template>
    <mt-field v-if="title !== '关键数据'" v-for="attr in form.list" :key="procedureIndex + '-' + attrIndex" :label="attr.name" :placeholder="'请输入' + attr.name" v-model="attr.value"></mt-field>
    <div class="btn-wrap">
      <mt-button type="primary" size="large" @click="submit">提 交</mt-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import axiosData from '@/axios'
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
      deviceId: localStorage.getItem('stfsDeviceId'),
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
          return {get: 76, submit: 72}
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
      const params = {
        msgType: this.msgType().get,
        type_id: values[0].type_id
      }
      if (this.title === '关键数据') {
        params.serials = values[0].serials
        params.batch = values[0].batch
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
    upload (event, procedureIndex, attrIndex) {
      if (event.target.files[0]) {
        const formData = new FormData()
        formData.append('img', event.target.files[0])
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$indicator.open('上传中...')
        axios.post(this.$store.state.imgUpload, formData, config).then(res => {
          if (res.data.res === 0) {
            this.form.list[procedureIndex].list[attrIndex].img = res.data.image
          } else {
            this.toast.push(this.$toast({
              message: res.data.msg,
              duration: 1500
            }))
          }
          this.$indicator.close()
        }).catch(err => {
          if (err.response) {
            this.toast.push(this.$toast({
              message: err.response.data.message,
              duration: 1500
            }))
          } else {
            this.toast.push(this.$toast({
              message: err.message,
              duration: 1500
            }))
          }
          this.$indicator.close()
        })
      }
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

<style>
.mint-popup{
  width: 100%;
}
.upload-wrap .mint-cell-value{
  overflow: hidden;
}
.upload-wrap .mint-field-core{
  display: none;
}
.upload-wrap .mint-field-other{
  width: 100%;
}
.upload-input{
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 27px;
  opacity: 0;
}
.upload-text{
  width: 100%;
  max-width: 100%;
  margin: 0;
  line-height: 27px;
  overflow: hidden;
}
.upload-text-placeholder{
  color: #757575;
}
input[type="text"]:disabled{
  background-color: #eee;
}
input[type="file"]:disabled + .upload-text{
  background-color: #eee;
}
</style>