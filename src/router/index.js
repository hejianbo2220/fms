import Vue from 'vue'
import Router from 'vue-router'
import pcLogin from '@/pc/pages/login'
import pcMain from '@/pc/pages/main'
import pcIndex from '@/pc/pages/index'
import pcUser from '@/pc/pages/user'
import pcRole from '@/pc/pages/role'
import pcLine from '@/pc/pages/line'
import pcProductClass from '@/pc/pages/productClass'
import pcProductData from '@/pc/pages/productData'
import pcProductBasic from '@/pc/pages/productBasic'
import pcKeyConfig from '@/pc/pages/keyConfig'
import pcKeyData from '@/pc/pages/keyData'
import pcKeyChart from '@/pc/pages/keyChart'
import pcInspectionConfig from '@/pc/pages/inspectionConfig'
import pcInspectionData from '@/pc/pages/inspectionData'
import pcInspectionChart from '@/pc/pages/inspectionChart'
import pcQualityConfig from '@/pc/pages/qualityConfig'
import pcQualityData from '@/pc/pages/qualityData'
import pcQualityChart from '@/pc/pages/qualityChart'
import pcQuestion from '@/pc/pages/question'
import pcPreview from '@/pc/pages/preview'
import mobileLogin from '@/mobile/pages/login'
import mobileIndex from '@/mobile/pages/index'
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
          path: 'role',
          name: 'pcRole',
          component: pcRole
        },
        {
          path: 'user',
          name: 'pcUser',
          component: pcUser
        },
        {
          path: 'line',
          name: 'pcLine',
          component: pcLine
        },
        {
          path: 'product/class',
          name: 'pcProductClass',
          component: pcProductClass
        },
        {
          path: 'product/data',
          name: 'pcProductData',
          component: pcProductData
        },
        {
          path: 'product/basic',
          name: 'pcProductBasic',
          component: pcProductBasic
        },
        {
          path: 'key/config',
          name: 'pcKeyConfig',
          component: pcKeyConfig
        },
        {
          path: 'key/data',
          name: 'pcKeyData',
          component: pcKeyData
        },
        {
          path: 'key/chart',
          name: 'pcKeyChart',
          component: pcKeyChart
        },
        {
          path: 'inspection/config',
          name: 'pcInspectionConfig',
          component: pcInspectionConfig
        },
        {
          path: 'inspection/data',
          name: 'pcInspectionData',
          component: pcInspectionData
        },
        {
          path: 'inspection/chart',
          name: 'pcInspectionChart',
          component: pcInspectionChart
        },
        {
          path: 'quality/config',
          name: 'pcQualityConfig',
          component: pcQualityConfig
        },
        {
          path: 'quality/data',
          name: 'pcQualityData',
          component: pcQualityData
        },
        {
          path: 'quality/chart',
          name: 'pcQualityChart',
          component: pcQualityChart
        },
        {
          path: 'question',
          name: 'pcQuestion',
          component: pcQuestion
        },
        {
          path: 'preview',
          name: 'pcPreview',
          component: pcPreview
        }
      ]
    },
    {
      path: '/mobile',
      name: 'mobileLogin',
      component: mobileLogin
    },
    {
      path: '/mobile/index',
      name: 'mobileIndex',
      component: mobileIndex
    },
    {
      path: '/mobile/template',
      name: 'mobileTemplate',
      component: mobileTemplate
    }
  ]
})
