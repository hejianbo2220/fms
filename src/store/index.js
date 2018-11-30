import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
  token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
  permission: sessionStorage.getItem('permission') ? sessionStorage.getItem('permission') : ''
}
if (process.env.NODE_ENV === 'development') {
  state.api = 'http://112.74.170.192:8089/WaterProof/Server'
  state.imgUpload = 'http://112.74.170.192:8089/WaterProof/upFileServer'
  state.excelUpload = 'http://112.74.170.192:8089/WaterProof/upExcel'
  state.pdfUpload = 'http://112.74.170.192:8089/WaterProof/upPdf'
} else {
  state.api = 'http://192.168.10.140:36000/WaterProof/Server'
  state.imgUpload = 'http://192.168.10.140:36000/WaterProof/upFileServer'
  state.excelUpload = 'http://192.168.10.140:36000/WaterProof/upExcel'
  state.pdfUpload = 'http://192.168.10.140:36000/WaterProof/upPdf'
}

export default new Vuex.Store({
  state,
  mutations: {
    set (state, info) {
      sessionStorage.setItem('token', info.token)
      state.token = info.token
      sessionStorage.setItem('permission', info.permis)
      state.permission = info.permis
    }
  }
})
