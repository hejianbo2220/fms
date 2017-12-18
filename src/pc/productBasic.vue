<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="getTable(1)" class="filter"></el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品编码" prop="id"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.detail" size="mini" icon="el-icon-news" @click="detail(scope.row)">查看</el-button>
              <el-upload v-if="scope.row.detail" action="http://www.baidu.com" :show-file-list="false" :before-upload="uploadConfirm" class="upload-btn">
                <el-button size="mini" icon="el-icon-upload">重新导入</el-button>
              </el-upload>
              <el-upload v-else action="http://www.baidu.com" :show-file-list="false">
                <el-button size="mini" icon="el-icon-upload">导入</el-button>
              </el-upload>
            </template>
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
  name: 'productBasic',
  data () {
    return {
      filter: {
        date: [new Date(), new Date()]
      },
      table: [
        {
          id: 'id1',
          detail: true
        },
        {
          id: 'id2',
          detail: false
        }
      ],
      currentPage: 1,
      tableTotal: 89
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 107,
        startDate: this.filter.date[0].getTime(),
        endDate: this.filter.date[1].getTime() + (24 * 60 * 60 * 1000),
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    detail () {
      this.$alert('<strong>这里是基础数据详情内容</strong>', {
        title: '基础数据详情',
        dangerouslyUseHTMLString: true,
        showConfirmButton: false
      }).catch(() => {})
    },
    uploadConfirm (file) {
      return new Promise((resolve, reject) => {
        this.$confirm('是否覆盖已有基础数据？', {
          type: 'warning',
          confirmButtonText: '是',
          cancelButtonText: '否',
          closeOnClickModal: false
        }).then(() => {
          resolve()
        }).catch(() => {
          reject(new Error('cancel'))
        })
      })
    }
  },
  mounted () {
    // 获取table数据
    this.getTable(1)
  }
}
</script>

<style>
.upload-btn{
  display: inline-block;
  margin-left: 10px;
}
</style>