<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-height">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>数据预览</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品编码+批次号">
            <template slot-scope="scope">{{scope.row.serials + '+' + scope.row.batch}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detailShow(scope.row)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page.sync="currentPage" @current-change="getTable" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="数据预览" :visible.sync="detailVisible" :close-on-click-modal="false" custom-class="basic-detail-wrap">
      <!-- 基础数据 -->
      <el-row v-if="basic[0].list.length > 0">
        <el-col :span="24" class="title">基础数据</el-col>
      </el-row>
      <el-row class="basic-table-wrap">
        <el-col :span="24">
          <el-table :data="basic" :stripe="true" size="mini">
            <el-table-column v-for="(item, index) in basic[0].list" :key="index" :label="item.name">
              <template slot-scope="scope">{{scope.row.list[index].value}}</template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!-- 基础数据 -->

      <!-- 关键数据 -->
      <el-row v-if="key.length > 0">
        <el-col :span="24" class="title">关键数据</el-col>
      </el-row>
      <template v-for="(item, itemIndex) in key">
        <el-row :key="itemIndex">
          <el-col :span="12">{{item.user}}</el-col>
          <el-col :span="12">{{item.time|dateFormat}}</el-col>
        </el-row>
        <el-row v-for="(procedure, procedureIndex) in item.list" :key="itemIndex + '-' + procedureIndex">
          <el-col :span="6" class="subtitle">{{procedure.name}}</el-col>
          <el-col :span="18">
            <el-row>
              <el-col v-for="(attr, attrIndex) in procedure.list" :key="itemIndex + '-' + procedureIndex + '-' + attrIndex" :span="12">{{attr.name + '：' + attr.value}}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="cutline"></el-col>
        </el-row>
      </template>
      <!-- 关键数据 -->

      <!-- 自检自测 -->
      <el-row v-if="inspection.length > 0">
        <el-col :span="24" class="title">自检自测</el-col>
      </el-row>
      <template v-for="(item, itemIndex) in inspection">
        <el-row :key="itemIndex">
          <el-col :span="12">{{item.user}}</el-col>
          <el-col :span="12">{{item.time|dateFormat}}</el-col>
        </el-row>
        <el-row>
          <el-col v-for="(attr, attrIndex) in item.list" :key="itemIndex + '-' + attrIndex" :span="12">{{attr.name + '：' + attr.value}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="cutline"></el-col>
        </el-row>
      </template>
      <!-- 自检自测 -->

      <!-- 质量检测 -->
      <el-row v-if="quality.length > 0">
        <el-col :span="24" class="title">质量检测</el-col>
      </el-row>
      <template v-for="(item, itemIndex) in quality">
        <el-row :key="itemIndex">
          <el-col :span="12">{{item.user}}</el-col>
          <el-col :span="12">{{item.time|dateFormat}}</el-col>
        </el-row>
        <el-row>
          <el-col v-for="(attr, attrIndex) in item.list" :key="itemIndex + '-' + attrIndex" :span="12">{{attr.name + '：' + attr.value}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="cutline"></el-col>
        </el-row>
      </template>
      <!-- 质量检测 -->

      <!-- 问题列表 -->
      <el-row v-if="question.length > 0">
        <el-col :span="24" class="title">问题列表</el-col>
      </el-row>
      <template v-for="(item, itemIndex) in question">
        <el-row :key="itemIndex">
          <el-col :span="24" class="subtitle">{{item.title}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">问题来源：</el-col>
          <el-col :span="18">{{item.source}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">责任人：</el-col>
          <el-col :span="18">{{item.person}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">问题描述：</el-col>
          <el-col :span="18">{{item.desc}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">解决方案：</el-col>
          <el-col :span="18">{{item.programe}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">改进措施：</el-col>
          <el-col :span="18">{{item.improv}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="cutline"></el-col>
        </el-row>
      </template>
      <!-- 问题列表 -->
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'preview',
  data () {
    return {
      table: [],
      currentPage: 1,
      tableTotal: 1,
      detailVisible: false,
      basic: [{
        list: []
      }],
      key: [],
      inspection: [],
      quality: [],
      question: []
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 5,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    detailShow (data) {
      axios(this, {
        msgType: 106,
        serials: data.serials,
        batch: data.batch
      }).then(data => {
        if (data.base_data.length > 0) {
          this.basic = data.base_data
        }
        this.key = data.key_datas
        this.inspection = data.self_ins
        this.quality = data.qa_ins
        this.question = data.problem_list
        this.detailVisible = true
      })
    }
  },
  mounted () {
    this.getTable(1)
  }
}
</script>

<style>
.title{
  font-size: 16px;
  font-weight: bold;
}
.subtitle{
  font-weight: bold;
}
.cutline{
  margin: 10px 0;
  border-bottom: 1px solid #DCDFE6;
}
.basic-detail-wrap{
  width: 600px;
}
.basic-detail-wrap .el-dialog__body{
  padding: 10px 20px 30px;
}
.basic-table-wrap{
  margin-bottom: 20px;
}
</style>