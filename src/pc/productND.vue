<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>重量正态分布</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getBarData" class="filter"></el-date-picker>
        <el-select v-model="filter.line" @change="getBarData" class="filter product-chart-filter">
          <el-option v-for="item in line" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <el-select v-model="filter.data" @change="getBarData" class="filter product-chart-filter">
          <el-option label="基础数据1" :value="1"></el-option>
          <el-option label="基础数据2" :value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div id="bar" class="bar"></div>
  </div>
</template>

<script>
import axios from '@/axios'
import echarts from 'echarts'
export default{
  name: 'inspectionChart',
  data () {
    return {
      line: [],
      filter: {
        data: 1,
        line: '',
        date: []
      }
    }
  },
  methods: {
    getBarData () {
      axios(this, {
        msgType: 112,
        // startDate: this.filter.date[0].getTime(),
        // endDate: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000),
        // pipeline: this.filter.line,
        startDate: 1500480000000,
        endDate: 1514822400000,
        pipeline: '1',
        data_type: this.filter.data
      }).then(data => {
        const xAxisData = []
        const yAxisData = []
        data.data.forEach(item => {
          xAxisData.push(item[0])
          yAxisData.push(item[1])
        })
        this.bar = echarts.init(document.getElementById('bar'))
        this.bar.setOption({
          xAxis: {
            splitLine: {
              show: false
            }
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          series: [{
            type: 'bar',
            data: data.data
          }]
        })
      })
    }
  },
  mounted () {
    // 获取流水线列表
    axios(this, {
      msgType: 10,
      startNo: 0,
      num: 99999
    }).then(data => {
      this.line = data.list

      // 设置第一条流水线为默认选择
      this.filter.line = data.list[0].name

      // 设置默认时间范围为1天
      let oneDay = new Date()
      oneDay.setDate(oneDay.getDate() - 1)
      this.filter.date = [oneDay, new Date()]

      // 获取chart数据
      this.getBarData()
    })
  }
}
</script>

<style scoped>
.product-chart-filter{
  width: 170px;
}
.bar{
  height: 400px;
}
</style>