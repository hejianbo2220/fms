<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>自检自测</el-breadcrumb-item>
          <el-breadcrumb-item>统计图</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getChartData" class="filter"></el-date-picker>
        <el-cascader expand-trigger="hover" :options="product" v-model="filter.product" placeholder="请选择产品编码" @change="getChartData" class="filter"></el-cascader>
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
      product: [],
      filter: {
        product: [],
        date: []
      },
      attrs: []
    }
  },
  methods: {
    getChartData () {
      axios(this, {
        msgType: 85,
        type_id: this.filter.product[0],
        serials: this.filter.product[1],
        startTime: this.filter.date[0].getTime(),
        endTime: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000)
      }).then(data => {
        this.attrs = data.list
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

      // 获取chart数据
      this.getChartData()
    })
  }
}
</script>