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
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getChartData" class="filter"></el-date-picker>
        <el-cascader expand-trigger="hover" :options="product" v-model="filter.product" placeholder="请选择产品编码" @change="getTable(1)" class="filter"></el-cascader>
      </el-col>
    </el-row>
    <el-row v-for="(procedure, procedureIndex) in procedures" :key="procedureIndex">
      <el-col :span="24">
        <p class="procedure-title">{{procedure.name}}</p>
        <div v-for="(attr, attrIndex) in procedure.propertys" :key="attrIndex" class="chart" :id="'chart' + procedureIndex + '-' + attrIndex"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from '@/axios'
import echarts from 'echarts'
export default{
  name: 'keyChart',
  data () {
    return {
      product: [],
      filter: {
        product: [],
        date: []
      },
      procedures: []
    }
  },
  methods: {
    getChartData () {
      axios(this, {
        msgType: 75,
        type_id: this.filter.product[0],
        serials: this.filter.product[1],
        startTime: this.filter.date[0].getTime(),
        endTime: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000)
      }).then(data => {
        this.procedures = data.list
        this.$nextTick(() => {
          this.procedures.forEach((procedure, procedureIndex) => {
            procedure.propertys.forEach((attr, attrIndex) => {
              attr.points.forEach(point => {
                const dateTemp = new Date()
                point[0] = dateTemp.setTime(point[0])
              })
              const id = 'chart' + procedureIndex + '-' + attrIndex
              this[id] = echarts.init(document.getElementById(id))
              this[id].setOption({
                title: {
                  text: attr.name,
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
                  data: attr.points
                },
                tooltip: {
                  trigger: 'axis'
                }
              })
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

<style scoped>
.procedure-title{
  font-size: 18px;
}
</style>