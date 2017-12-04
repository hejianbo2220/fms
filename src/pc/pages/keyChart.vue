<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>关键数据</el-breadcrumb-item>
          <el-breadcrumb-item>统计图</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="pc-filter"></el-date-picker>
        <el-cascader expand-trigger="hover" :options="product" v-model="filter.product" placeholder="请选择产品编码" class="pc-filter"></el-cascader>
      </el-col>
    </el-row>
    <el-row v-for="(procedure, procedureIndex) in procedures" :key="procedureIndex">
      <el-col :span="24">
        <p class="procedure-title">{{procedure.title}}</p>
        <div v-for="(attr, attrIndex) in procedure.attrs" :key="attrIndex" class="pc-chart" :id="'chart' + procedureIndex + '-' + attrIndex"></div>
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
      product: [
        {
          label: '产品类型1',
          value: 'class1',
          children: [
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

    let thirtyDay = new Date()
    thirtyDay.setDate(thirtyDay.getDate() - 30)
    this.filter.date = [thirtyDay, new Date()]
  }
}
</script>

<style scoped>
.procedure-title{
  font-size: 18px;
}
</style>