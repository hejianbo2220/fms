import Vue from 'vue'
import Router from 'vue-router'
import pcLogin from '@/pc/login'
import pcMain from '@/pc/main'
import pcIndex from '@/pc/index'
import pcUser from '@/pc/user'
import pcRole from '@/pc/role'
import pcLine from '@/pc/line'
import pcProductClass from '@/pc/productClass'
import pcProductData from '@/pc/productData'
import pcProductBasic from '@/pc/productBasic'
import pcKeyConfig from '@/pc/keyConfig'
import pcKeyData from '@/pc/keyData'
import pcKeyChart from '@/pc/keyChart'
import pcInspectionConfig from '@/pc/inspectionConfig'
import pcInspectionData from '@/pc/inspectionData'
import pcInspectionChart from '@/pc/inspectionChart'
import pcQualityConfig from '@/pc/qualityConfig'
import pcQualityData from '@/pc/qualityData'
import pcQualityChart from '@/pc/qualityChart'
import pcQuestion from '@/pc/question'
import pcPreview from '@/pc/preview'
import mobileLogin from '@/mobile/login'
import mobileMain from '@/mobile/main'
import mobileIndex from '@/mobile/index'
import mobileLineList from '@/mobile/lineList'
import mobileLineDetail from '@/mobile/lineDetail'
import mobileKey from '@/mobile/key'
import mobileInspection from '@/mobile/inspection'
import mobileTemplate from '@/mobile/template'

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
      path: '/mobile/main',
      name: 'mobileMain',
      component: mobileMain,
      children: [
        {
          path: 'index',
          name: 'mobileIndex',
          component: mobileIndex
        },
        {
          path: 'line/list',
          name: 'mobileLineList',
          component: mobileLineList
        },
        {
          path: 'line/detail/:id/:state/:serial/:batch/:time',
          name: 'mobileLineDetail',
          component: mobileLineDetail
        },
        {
          path: 'key',
          name: 'mobileKey',
          component: mobileKey
        },
        {
          path: 'inspection',
          name: 'mobileInspection',
          component: mobileInspection
        },
        {
          path: 'template',
          name: 'mobileTemplate',
          component: mobileTemplate
        }
      ]
    }
  ]
})
