<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-height">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>数据预览</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品编码+批次号" prop="productIdAndBatchId"></el-table-column>
          <!-- <el-table-column label="时间" prop="time"></el-table-column> -->
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detail(scope.row)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page.sync="currentPage" @current-change="getTable" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'preview',
  data () {
    return {
      table: [],
      currentPage: 1,
      tableTotal: 1
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 5,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        data.list.forEach(item => {
          // 产品编码+批次号
          item.productIdAndBatchId = item.serials + '+' + item.batch
        })
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    detail (data) {
      axios(this, {
        msgType: 106,
        serials: data.serials,
        batch: data.batch
      }).then(data => {
        const h = this.$createElement
        const list = []

        // 关键数据
        if (data.key_datas.length > 0) {
          list.push(h('li', null, '关键数据：'))
          data.key_datas.forEach(item => {
            list.push(h('li', {style: 'padding: 10px 0 0 10px'}, '提交人：' + item.user))
            const dateTemp = new Date()
            dateTemp.setTime(item.time)
            list.push(h('li', {style: 'padding-left: 10px'}, '提交时间：' + dateTemp.toLocaleDateString()))
            item.list.forEach(procedure => {
              list.push(h('li', {style: 'padding-left: 20px'}, procedure.name + '：'))
              procedure.list.forEach(attr => {
                list.push(h('li', {style: 'padding-left: 30px'}, attr.name + '：' + attr.value))
              })
            })
          })
        }

        // 自检自测
        if (data.self_ins.length > 0) {
          list.push(h('li', {style: 'padding-top: 20px'}, '自检自测：'))
          data.self_ins.forEach(item => {
            list.push(h('li', {style: 'padding: 10px 0 0 10px'}, '提交人：' + item.user))
            const dateTemp = new Date()
            dateTemp.setTime(item.time)
            list.push(h('li', {style: 'padding-left: 10px'}, '提交时间：' + dateTemp.toLocaleDateString()))
            item.list.forEach(attr => {
              list.push(h('li', {style: 'padding-left: 20px'}, attr.name + '：' + attr.value))
            })
          })
        }

        // 质量检测
        if (data.qa_ins.length > 0) {
          list.push(h('li', {style: 'padding-top: 20px'}, '质量检测：'))
          data.qa_ins.forEach(item => {
            list.push(h('li', {style: 'padding: 10px 0 0 10px'}, '提交人：' + item.user))
            const dateTemp = new Date()
            dateTemp.setTime(item.time)
            list.push(h('li', {style: 'padding-left: 10px'}, '提交时间：' + dateTemp.toLocaleDateString()))
            item.list.forEach(attr => {
              list.push(h('li', {style: 'padding-left: 20px'}, attr.name + '：' + attr.value))
            })
          })
        }

        // 问题列表
        if (data.problem_list.length > 0) {
          list.push(h('li', {style: 'padding-top: 20px'}, '问题列表：'))
          data.problem_list.forEach(item => {
            list.push(h('li', {style: 'padding-left: 10px'}, '问题名称：' + item.title))
            list.push(h('li', {style: 'padding-left: 20px'}, '问题来源：' + item.source))
            list.push(h('li', {style: 'padding-left: 20px'}, '责任人：' + item.person))
            list.push(h('li', {style: 'padding-left: 20px'}, '问题描述：' + item.desc))
            list.push(h('li', {style: 'padding-left: 20px'}, '解决方案：' + item.programe))
            list.push(h('li', {style: 'padding-left: 20px'}, '改进措施：' + item.improv))
          })
        }
        this.$msgbox({
          title: '数据预览详情',
          message: h('ul', null, list),
          showConfirmButton: false,
          closeOnClickModal: false
        }).catch(() => {})
      })
    }
  },
  mounted () {
    this.getTable(1)
  }
}
</script>