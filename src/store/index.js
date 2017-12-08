import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '',
    permission: sessionStorage.getItem('permission') ? sessionStorage.getItem('permission') : '',
    api: 'http://120.79.2.53:8080/WaterProof/Server'
    // api: 'http://10.9.36.25:8080/WaterProof/Server'
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
