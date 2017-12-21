<template>
  <div>
    <mt-header title="数据预览">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>

    <!-- 基础数据 -->
    <mt-cell v-if="basic.length > 0" title="基础数据" class="title"></mt-cell>
    <!-- 基础数据 -->

    <!-- 关键数据 -->
    <mt-cell v-if="key.length > 0" title="关键数据" class="title"></mt-cell>
    <template v-for="(item, itemIndex) in key">
      <mt-cell :key="itemIndex" title="提交人" :value="item.user"></mt-cell>
      <mt-cell title="提交时间" :value="item.time"></mt-cell>
      <template v-for="(procedure, procedureIndex) in item.list">
        <mt-cell :key="itemIndex + '-' + procedureIndex" :title="procedure.name" class="subtitle"></mt-cell>
        <mt-cell v-for="(attr, attrIndex) in procedure.list" :key="itemIndex + '-' + procedureIndex + '-' + attrIndex" :title="attr.name" :value="attr.value"></mt-cell>
      </template>
      <mt-cell></mt-cell>
    </template>
    <!-- 关键数据 -->

    <!-- 自检自测 -->
    <mt-cell v-if="inspection.length > 0" title="自检自测" class="title"></mt-cell>
    <template v-for="(item, itemIndex) in inspection">
      <mt-cell :key="itemIndex" title="提交人" :value="item.user"></mt-cell>
      <mt-cell title="提交时间" :value="item.time"></mt-cell>
      <mt-cell v-for="(attr, attrIndex) in item.list" :key="itemIndex + '-' + attrIndex" :title="attr.name" :value="attr.value"></mt-cell>
      <mt-cell></mt-cell>
    </template>
    <!-- 自检自测 -->

    <!-- 质量检测 -->
    <mt-cell v-if="quality.length > 0" title="质量检测" class="title"></mt-cell>
    <template v-for="(item, itemIndex) in quality">
      <mt-cell :key="itemIndex" title="提交人" :value="item.user"></mt-cell>
      <mt-cell title="提交时间" :value="item.time"></mt-cell>
      <mt-cell v-for="(attr, attrIndex) in item.list" :key="itemIndex + '-' + attrIndex" :title="attr.name" :value="attr.value"></mt-cell>
      <mt-cell></mt-cell>
    </template>
    <!-- 质量检测 -->

    <!-- 问题列表 -->
    <mt-cell v-if="question.length > 0" title="问题列表" class="title"></mt-cell>
    <template v-for="(item, index) in question">
      <mt-cell :key="index" title="问题名称" :value="item.title"></mt-cell>
      <mt-cell title="问题来源" :value="item.source"></mt-cell>
      <mt-cell title="责任人" :value="item.person"></mt-cell>
      <mt-cell title="问题描述" :value="item.desc"></mt-cell>
      <mt-cell title="解决方案" :value="item.programe"></mt-cell>
      <mt-cell title="改进措施" :value="item.improv"></mt-cell>
      <mt-cell></mt-cell>
    </template>
    <!-- 问题列表 -->
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'dataDetail',
  data () {
    return {
      basic: [],
      key: [],
      inspection: [],
      quality: [],
      question: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    axios(this, {
      msgType: 106,
      serials: this.$route.params.serial,
      batch: this.$route.params.batch
    }).then(data => {
      // 基础数据
      data.base_data.forEach(item => {
        const dateTemp = new Date()
        dateTemp.setTime(item.time)
        item.time = dateTemp.toLocaleDateString()
      })
      this.basic = data.base_data

      // 关键数据
      data.key_datas.forEach(item => {
        const dateTemp = new Date()
        dateTemp.setTime(item.time)
        item.time = dateTemp.toLocaleDateString()
      })
      this.key = data.key_datas

      // 自检自测
      data.self_ins.forEach(item => {
        const dateTemp = new Date()
        dateTemp.setTime(item.time)
        item.time = dateTemp.toLocaleDateString()
      })
      this.inspection = data.self_ins

      // 质量检测
      data.qa_ins.forEach(item => {
        const dateTemp = new Date()
        dateTemp.setTime(item.time)
        item.time = dateTemp.toLocaleDateString()
      })
      this.quality = data.qa_ins

      // 问题列表
      this.question = data.problem_list
    })
  }
}
</script>