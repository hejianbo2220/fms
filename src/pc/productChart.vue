<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>统计图</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getChartData" class="filter"></el-date-picker>
        <el-select v-model="filter.line" @change="getChartData" class="filter">
          <el-option v-for="item in line" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <el-select v-model="filter.data" @change="getChartData" class="filter">
          <el-option label="基础数据1" :value="1"></el-option>
          <el-option label="基础数据2" :value="2"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div v-for="(item, index) in attrs" :key="index" class="chart" :id="'chart' + index"></div>
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
      },
      attrs: []
    }
  },
  methods: {
    getChartData () {
      axios(this, {
        msgType: 16,
        startDate: this.filter.date[0].getTime(),
        endTime: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000),
        pipeline: this.filter.line,
        data_type: this.filter.data
      }).then(data => {
        this.attrs = data.data
        this.$nextTick(() => {
          this.attrs.forEach((item, index) => {
            item.points.forEach(point => {
              const dateTemp = new Date()
              point[0] = dateTemp.setTime(point[0])
            })
            const id = 'chart' + index
            this[id] = echarts.init(document.getElementById(id))
            this[id].setOption({
              title: {
                text: item.name,
                textStyle: {
                  fontSize: 16,
                  fontWeight: 'normal'
                }
              },
              xAxis: {
                type: 'time',
                splitLine: {
                  show: false
                }
              },
              yAxis: {
                splitLine: {
                  show: false
                }
              },
              series: {
                type: 'line',
                data: item.points,
                markPoint: {
                  data: [
                    {
                      type: 'max',
                      name: '最大值'
                    },
                    {
                      type: 'min',
                      name: '最小值'
                    }
                  ]
                },
                markLine: {
                  data: [
                    {
                      type: 'average',
                      name: '平均值'
                    }
                  ]
                }
              },
              tooltip: {
                trigger: 'axis'
              }
            })
          })
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
      this.getChartData()
    })
  }
}
</script>