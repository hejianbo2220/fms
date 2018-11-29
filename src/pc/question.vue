<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>问题列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getTable(1)" class="filter"></el-date-picker>
        <el-cascader expand-trigger="hover" :options="product" v-model="filter.product" placeholder="请选择产品编码" @change="getTable(1)" class="filter"></el-cascader>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="问题名称" prop="title"></el-table-column>
          <el-table-column label="责任人" prop="person"></el-table-column>
          <el-table-column label="提交人" prop="user"></el-table-column>
          <el-table-column label="提交时间">
            <template slot-scope="scope">{{scope.row.time|dateFormat}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detailShow(scope.row)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page.sync="currentPage" @current-change="getTable" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="问题详情" :visible.sync="detailVisible" :close-on-click-modal="false" custom-class="detail-wrap">
      <el-row>
        <el-col :span="6">问题名称：</el-col>
        <el-col :span="18">{{detail.title}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">问题来源：</el-col>
        <el-col :span="18">{{detail.source}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">责任人：</el-col>
        <el-col :span="18">{{detail.person}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">问题描述：</el-col>
        <el-col :span="18">{{detail.desc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">解决方案：</el-col>
        <el-col :span="18">{{detail.programe}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">改进措施：</el-col>
        <el-col :span="18">{{detail.improv}}</el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'question',
  data () {
    return {
      product: [],
      filter: {
        product: ['11', ''],
        date: []
      },
      table: [],
      currentPage: 1,
      tableTotal: 0,
      detailVisible: false,
      detail: {}
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 101,
        type_id: this.filter.product[0],
        serials: this.filter.product[1],
        startTime: this.filter.date[0].getTime(),
        endTime: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000),
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    detailShow (question) {
      this.detail = question
      this.detailVisible = true
    }
  },
  mounted () {
    // 获取产品类型和产品编码列表
    axios(this, {msgType: 24}).then(data => {
      data.list.forEach(parent => {
        parent.list.forEach(child => {
          child.label = child.name
          child.value = child.id
        })
        parent.list.unshift({
          label: '全部',
          value: ''
        })
        parent.label = parent.name
        parent.value = parent.type_id
        parent.children = parent.list
      })
      this.product = data.list

      // 设置默认时间范围为30天
      let thirtyDay = new Date()
      thirtyDay.setDate(thirtyDay.getDate() - 30)
      this.filter.date = [thirtyDay, new Date()]

      // 获取table数据
      this.getTable(1)
    })
  }
}
</script>