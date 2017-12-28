<template>
  <div>
    <mt-header title="数据预览">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <!-- 流水线 -->
    <mt-cell :title="line.lineName">
      <span :class="stateSwitch(line.state).class">{{stateSwitch(line.state).text}}</span>
    </mt-cell>
    <mt-cell v-for="(item, index) in line.list" :key="index" :value="item.reason">
      <span slot="title" class="line-time">{{timeSwitch(item.time)}}</span>
    </mt-cell>
    <!-- 流水线 -->

    <!-- 基础数据 -->
    <template v-if="basic[0].list.length > 0">
      <mt-cell title="基础数据" class="title"></mt-cell>
      <el-table :data="basic" :stripe="true" size="mini">
        <el-table-column v-for="(item, index) in basic[0].list" :key="index" :label="item.name">
          <template slot-scope="scope">{{scope.row.list[index].value}}</template>
        </el-table-column>
      </el-table>
      <mt-cell></mt-cell>
    </template>
    <!-- 基础数据 -->

    <!-- 关键数据 -->
    <mt-cell v-if="key.length > 0" title="关键数据" class="title"></mt-cell>
    <template v-for="(item, itemIndex) in key">
      <mt-cell :key="itemIndex" :title="item.user">
        <span>{{item.time|dateFormat}}</span>
      </mt-cell>
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
      <mt-cell :key="itemIndex" :title="item.user">
        <span>{{item.time|dateFormat}}</span>
      </mt-cell>
      <mt-cell v-for="(attr, attrIndex) in item.list" :key="itemIndex + '-' + attrIndex" :title="attr.name" :value="attr.value"></mt-cell>
      <mt-cell></mt-cell>
    </template>
    <!-- 自检自测 -->

    <!-- 质量检测 -->
    <mt-cell v-if="quality.length > 0" title="质量检测" class="title"></mt-cell>
    <template v-for="(item, itemIndex) in quality">
      <mt-cell :key="itemIndex" :title="item.user">
        <span>{{item.time|dateFormat}}</span>
      </mt-cell>
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
      line: {
        state: 0,
        list: []
      },
      basic: [{
        list: []
      }],
      key: [],
      inspection: [],
      quality: [],
      question: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    stateSwitch (state) {
      switch (state) {
        case 0:
          return {class: 'red', text: '已完成'}
        case 1:
          return {class: 'green', text: '生产中'}
        case 2:
          return {class: 'orange', text: '已暂停'}
      }
    },
    timeSwitch (time) {
      const dateTemp = new Date()
      dateTemp.setTime(time)
      return dateTemp.toLocaleString()
    }
  },
  mounted () {
    axios(this, {
      msgType: 106,
      serials: this.$route.params.serial,
      batch: this.$route.params.batch
    }).then(data => {
      // 流水线
      this.line = data.product
      this.line.list = data.pauseReason

      // 基础数据
      if (data.base_data.length > 0) {
        this.basic = data.base_data
      } else {
        this.basic = [{list: []}]
      }

      // 关键数据
      this.key = data.key_datas

      // 自检自测
      this.inspection = data.self_ins

      // 质量检测
      this.quality = data.qa_ins

      // 问题列表
      this.question = data.problem_list
    })
  }
}
</script>

<style>
.title{
  background-color: #D8DCE5;
}
.subtitle{
  background-color: #EDF2FC;
}
.line-time{
  display: block;
  min-width: 100px;
}
.mint-cell-wrapper{
  line-height: 22px;
}
</style>