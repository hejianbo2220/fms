import Vue from 'vue'
import Router from 'vue-router'
import pcLogin from '@/pc/pages/login'
import pcMain from '@/pc/pages/main'
import pcIndex from '@/pc/pages/index'
import pcUser from '@/pc/pages/user'
import pcRole from '@/pc/pages/role'
import mobileLogin from '@/mobile/pages/login'
import mobileTemplate from '@/mobile/pages/template'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/pc',
      name: 'pcLogin',
      component: pcLogin
    },
    {
      path: '/pc/main',
      name: 'pcMain',
      component: pcMain,
      children: [
        {
          path: 'index',
          name: 'pcIndex',
          component: pcIndex
        },
        {
          path: 'user',
          name: 'pcUser',
          component: pcUser
        },
        {
          path: 'role',
          name: 'pcRole',
          component: pcRole
        }
      ]
    },
    {
      path: '/mobile',
      name: 'mobileLogin',
      component: mobileLogin
    },
    {
      path: '/mobile/template',
      name: 'mobileTemplate',
      component: mobileTemplate
    }
  ]
})
