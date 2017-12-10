<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>自检自测</el-breadcrumb-item>
          <el-breadcrumb-item>内容列表</el-breadcrumb-item>
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
          <el-table-column label="编号" prop="id"></el-table-column>
          <el-table-column label="产品编码+批次号" prop="productIdAndBatchId"></el-table-column>
          <el-table-column label="创建时间" prop="time"></el-table-column>
          <el-table-column label="提交人" prop="user"></el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detail(scope.row.id)">查看</el-button>
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
  name: 'inspectionData',
  data () {
    return {
      product: [],
      filter: {
        product: [],
        date: []
      },
      table: [],
      currentPage: 1,
      tableTotal: 1
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 83,
        type_id: this.filter.product[0],
        serials: this.filter.product[1],
        startTime: this.filter.date[0].getTime(),
        endTime: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000),
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        data.list.forEach(item => {
          // 产品编码+批次号
          item.productIdAndBatchId = item.serials + '+' + item.batch

          // 创建时间
          const dateTemp = new Date()
          dateTemp.setTime(item.time)
          item.time = dateTemp.toLocaleDateString()
        })
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    detail (id) {
      axios(this, {
        msgType: 84,
        id: id
      }).then(data => {
        const h = this.$createElement
        const list = []
        data.list.forEach(item => {
          list.push(h('li', null, item.name + '：' + item.value))
        })
        this.$msgbox({
          title: '自检自测详情',
          message: h('ul', null, list),
          showConfirmButton: false,
          closeOnClickModal: false
        }).catch(() => {})
      })
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

      // 设置默认产品类型和产品编码
      this.filter.product = [this.product[0].value, this.product[0].children[0].value]

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