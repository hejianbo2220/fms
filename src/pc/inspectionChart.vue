<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>自检自测</el-breadcrumb-item>
          <el-breadcrumb-item>统计图</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getChartData" class="filter"></el-date-picker>
        <el-cascader expand-trigger="hover" :options="product" v-model="filter.product" placeholder="请选择产品编码" class="filter"></el-cascader>
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
      product: [
        {
          label: '产品类型1',
          value: 'class1',
          children: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '产品编码1',
              value: 'id1'
            },
            {
              label: '产品编码2',
              value: 'id2'
            }
          ]
        },
        {
          label: '产品类型2',
          value: 'class2',
          children: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '产品编码3',
              value: 'id3'
            },
            {
              label: '产品编码4',
              value: 'id4'
            },
            {
              label: '产品编码5',
              value: 'id5'
            }
          ]
        }
      ],
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
        type_id: 10,
        serials: 'sn99999',
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
                data: item.points
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
    let thirtyDay = new Date()
    thirtyDay.setDate(thirtyDay.getDate() - 30)
    this.filter.date = [thirtyDay, new Date()]

    this.getChartData()
  }
}
</script>