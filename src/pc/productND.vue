<template>
  <div>
    <el-row>
      <!-- 由于这里的面包屑文本过长，所以el-col的span设置为8 -->
      <el-col :span="8">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>重量正态分布</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="16">
        <el-select v-model="filter.serial" @change="getBarData" class="filter">
          <el-option v-for="(item, index) in serials" :key="index" :value="item.serials + '+' + item.batch"></el-option>
        </el-select>
        <el-select v-model="filter.data" @change="getBarData" class="filter">
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
      serials: [],
      filter: {
        serial: '',
        data: 1
      }
    }
  },
  methods: {
    getBarData () {
      const serial = this.filter.serial.split('+')
      axios(this, {
        msgType: 112,
        serials: serial[0],
        batch: serial[1],
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
    axios(this, {
      msgType: 5,
      startNo: 0,
      num: 99999
    }).then(data => {
      this.serials = data.list

      // 设置第一条产品编码为默认选择
      this.filter.serial = data.list[0].serials + '+' + data.list[0].batch

      // 获取bar数据
      this.getBarData()
    })
  }
}
</script>

<style scoped>
.bar{
  height: 400px;
}
</style>