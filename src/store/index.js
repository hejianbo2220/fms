import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    permission: sessionStorage.getItem('permission') ? sessionStorage.getItem('permission') : '',
    api: 'http://120.79.2.53:8080/WaterProof/Server',
    imgUpload: 'http://120.79.2.53:8080/WaterProof/upFileServer'
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
