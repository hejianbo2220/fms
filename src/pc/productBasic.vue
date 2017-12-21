<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-upload :action="this.$store.state.excelUpload" :http-request="upload" class="upload-btn">
          <el-button type="primary" size="medium" icon="el-icon-upload">上传基础数据</el-button>
        </el-upload>
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getTable(1)" class="filter"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="文件名" prop="filename"></el-table-column>
          <el-table-column label="提交时间">
            <template slot-scope="scope">{{scope.row.time|dateFormat}}</template>
          </el-table-column>
          <el-table-column label="类型" prop="type">
            <template slot-scope="scope">{{'类型' + scope.row.type}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-download" @click="download(scope.row.address)">下载</el-button>
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
import axios from 'axios'
import axiosData from '@/axios'
export default{
  name: 'productBasic',
  data () {
    return {
      filter: {
        date: []
      },
      table: [],
      currentPage: 1,
      tableTotal: 89
    }
  },
  methods: {
    getTable (startPage) {
      axiosData(this, {
        msgType: 107,
        type: '',
        startDate: this.filter.date[0].getTime(),
        endDate: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000),
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    download (url) {
      window.open(url)
    },
    upload (event) {
      const formData = new FormData()
      formData.append('file', event.file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(event.action, formData, config).then(res => {
        if (res.data.res === 0) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1500
          })
          this.getTable(1)
        } else {
          this.$alert(res.data.msg)
        }
      }).catch(err => {
        if (err.response) {
          this.$alert(err.response.data.message)
        } else {
          this.$alert(err.message)
        }
      })
    }
  },
  mounted () {
    // 设置默认时间范围为1天
    let oneDay = new Date()
    oneDay.setDate(oneDay.getDate() - 1)
    this.filter.date = [oneDay, new Date()]

    // 获取table数据
    this.getTable(1)
  }
}
</script>

<style>
.upload-btn{
  float: right;
  margin: -11px 0 0 10px;
}
</style>