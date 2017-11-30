<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>关键数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>统计图</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row v-for="(procedure, procedureIndex) in procedures" :key="procedureIndex">
      <el-col :span="24">
        <p class="procedure-title">{{procedure.title}}</p>
        <div v-for="(attr, attrIndex) in procedure.attrs" :key="attrIndex" class="chart" :id="'chart' + procedureIndex + '-' + attrIndex"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default{
  name: 'keyChart',
  data () {
    return {
      procedures: [
        {
          title: '工序1',
          attrs: [
            {
              title: '属性1',
              data: [
                ['2017-11-30', '16'],
                ['2017-11-29', '5'],
                ['2017-11-27', '3'],
                ['2017-11-21', '10'],
                ['2017-11-17', '0'],
                ['2017-11-14', '40'],
                ['2017-11-10', '30'],
                ['2017-11-09', '22'],
                ['2017-11-07', '20'],
                ['2017-11-06', '14']
              ]
            },
            {
              title: '属性2',
              data: [
                ['2017-11-30', '26'],
                ['2017-11-29', '5'],
                ['2017-11-27', '3'],
                ['2017-11-21', '10'],
                ['2017-11-17', '10'],
                ['2017-11-14', '40'],
                ['2017-11-10', '30'],
                ['2017-11-09', '22'],
                ['2017-11-07', '20'],
                ['2017-11-06', '14']
              ]
            }
          ]
        },
        {
          title: '工序2',
          attrs: [
            {
              title: '属性3',
              data: [
                ['2017-11-30', '36'],
                ['2017-11-29', '5'],
                ['2017-11-27', '3'],
                ['2017-11-21', '10'],
                ['2017-11-17', '20'],
                ['2017-11-14', '40'],
                ['2017-11-10', '30'],
                ['2017-11-09', '22'],
                ['2017-11-07', '20'],
                ['2017-11-06', '14']
              ]
            },
            {
              title: '属性4',
              data: [
                ['2017-11-30', '6'],
                ['2017-11-29', '5'],
                ['2017-11-27', '3'],
                ['2017-11-21', '10'],
                ['2017-11-17', '30'],
                ['2017-11-14', '40'],
                ['2017-11-10', '30'],
                ['2017-11-09', '22'],
                ['2017-11-07', '20'],
                ['2017-11-06', '14']
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.procedures.forEach((procedure, procedureIndex) => {
      procedure.attrs.forEach((attr, attrIndex) => {
        const id = 'chart' + procedureIndex + '-' + attrIndex
        this[id] = echarts.init(document.getElementById(id))
        this[id].setOption({
          title: {
            text: attr.title,
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
            data: attr.data
          },
          tooltip: {
            trigger: 'axis'
          }
        })
      })
    })
  }
}
</script>

<style scoped>
.procedure-title{
  font-size: 18px;
}
.chart{
  height: 240px;
}
</style>