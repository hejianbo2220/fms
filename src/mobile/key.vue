<template>
  <div>
    <mt-header title="关键数据">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-cell title="产品编码">
      <span @click="popupShow">{{serial}}</span>
      <mt-popup v-model="popupVisible" popup-transition="popup-fade" class="product-select">
        <mt-picker :slots="serials" valueKey="label" @change="popupSure"></mt-picker>
      </mt-popup>
    </mt-cell>
    <template v-for="(procedure, procedureIndex) in form.list">
      <mt-cell :key="procedureIndex" :title="procedure.name" class="subtitle"></mt-cell>
      <template v-for="(attr, attrIndex) in procedure.list">
        <mt-field :key="procedureIndex + '-' + attrIndex" :label="attr.name" :placeholder="'请输入' + attr.name" v-model="attr.value" :disabled="attr.device !== deviceId"></mt-field>
        <mt-field label="上传照片" class="upload-wrap">
          <input class="upload-input" type="file" :disabled="attr.device !== deviceId" @change="upload($event, procedureIndex, attrIndex)">
          <p class="upload-text" :class="attr.img === '' ? 'upload-text-placeholder' : ''">{{attr.img === '' ? '请选择照片' : attr.img}}</p>
          <mt-button v-if="attr.img !== ''" type="primary" size="small" class="upload-show" @click="showImg(attr.img)">查看照片</mt-button>
          <mt-popup v-model="imgVisible" popup-transition="popup-fade">
            <img :style="{maxWidth: imgMaxWidth, maxHeight: imgMaxHeight}" :src="imgSrc" @click="hideImg">
          </mt-popup>
        </mt-field>
      </template>
    </template>
    <div class="btn-wrap">
      <mt-button type="primary" size="large" @click="validate">提 交</mt-button>
    </div>
  </div>
</template>

<script>
import lrz from 'lrz'
import axios from 'axios'
import axiosData from '@/axios'
export default{
  name: 'key',
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
      imgVisible: false,
      imgSrc: '',
      imgMaxWidth: innerWidth + 'px',
      imgMaxHeight: innerHeight + 'px',
      deviceId: localStorage.getItem('stfsDeviceId'),
      form: {
        msgType: 72,
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
        msgType: 76,
        type_id: values[0].type_id,
        serials: values[0].serials,
        batch: values[0].batch
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
        lrz(event.target.files[0], {
          width: 750
        }).then(rst => {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          this.$indicator.open('上传中...')
          axios.post(this.$store.state.imgUpload, rst.formData, config).then(res => {
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
        })
      }
    },
    showImg (img) {
      this.imgSrc = img
      this.imgVisible = true
    },
    hideImg () {
      this.imgVisible = false
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

      // 定义是否弹窗确认，默认需要弹窗确认
      let isAlert = true

      // forEach循环中return false无法结束整个函数，所以此处用for循环
      for (let i = 0; i < this.form.list.length; i++) {
        for (let j = 0; j < this.form.list[i].list.length; j++) {
          // 找出该设备ID对应的属性，并判断该属性是否已填写完毕
          if (this.form.list[i].list[j].device === this.deviceId) {
            if (this.form.list[i].list[j].value === '') {
              this.toast.push(this.$toast({
                message: '请输入' + this.form.list[i].name + '-' + this.form.list[i].list[j].name,
                duration: 1500
              }))
              return false
            }
            if (this.form.list[i].list[j].img === '') {
              this.toast.push(this.$toast({
                message: '请上传' + this.form.list[i].name + '-' + this.form.list[i].list[j].name + '的照片',
                duration: 1500
              }))
              return false
            }
          }

          // 判断是否所有属性都已有值，如有空值时，则视为不是该条关键数据的最后一次提交，无需弹窗确认
          if (this.form.list[i].list[j].value === '' || this.form.list[i].list[j].img === '') {
            isAlert = false
          }
        }
      }

      if (isAlert) {
        this.$messagebox.confirm('数据提交后，将无法更改，是否继续？').then(action => {
          this.submit()
        }).catch(() => {})
      } else {
        this.submit()
      }
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

<style>
input[type="text"]:disabled{
  background-color: #eee;
}
input[type="file"]:disabled + .upload-text{
  background-color: #eee;
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
.upload-show{
  position: absolute;
  right: 0;
  top: -3px;
  z-index: 5;
}
</style>