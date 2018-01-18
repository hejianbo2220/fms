import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    permission: sessionStorage.getItem('permission') ? sessionStorage.getItem('permission') : '',
    api: 'http://192.168.10.140:8025/WaterProof/Server',
    imgUpload: 'http://192.168.10.140:8025/WaterProof/upFileServer',
    excelUpload: 'http://192.168.10.140:8025/WaterProof/upExcel'
  },
  mutations: {
    set (state, info) {
      sessionStorage.setItem('token', info.token)
      state.token = info.token
      sessionStorage.setItem('permission', info.permis)
      state.permission = info.permis
    }
  }
})
