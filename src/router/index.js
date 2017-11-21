import Vue from 'vue'
import Router from 'vue-router'
import pcLogin from '@/pc/pages/login'
import mobileLogin from '@/mobile/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/pc',
      name: 'pcLogin',
      component: pcLogin
    },
    {
      path: '/mobile',
      name: 'mobileLogin',
      component: mobileLogin
    }
  ]
})
