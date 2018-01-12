<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-height">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>自检自测</el-breadcrumb-item>
          <el-breadcrumb-item>废料记录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品编码+批次号">
            <template slot-scope="scope">{{scope.row.serials + '+' + scope.row.batch}}</template>
          </el-table-column>
          <el-table-column label="废弃原因" prop="reason"></el-table-column>
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column label="总重量" prop="totalweight"></el-table-column>
          <el-table-column label="提交时间">
            <template slot-scope="scope">{{scope.row.time|dateFormat}}</template>
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
  name: 'question',
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
        msgType: 111,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    }
  },
  mounted () {
    this.getTable(1)
  }
}
</script>