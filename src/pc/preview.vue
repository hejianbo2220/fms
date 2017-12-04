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
          <el-table-column label="产品编码+批次号" prop="productIdAndBatchId"></el-table-column>
          <el-table-column label="时间" prop="time"></el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detail(scope.row)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination @current-change="pageChanged" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  name: 'preview',
  data () {
    return {
      table: [
        {
          productIdAndBatchId: 'productId1_BatchId1',
          time: '2017-11-11 11:11:11'
        },
        {
          productIdAndBatchId: 'productId2_BatchId2',
          time: '2017-12-12 12:12:12'
        }
      ],
      tableTotal: 89
    }
  },
  methods: {
    detail () {
      this.$alert('<strong>这里是数据预览详情内容</strong>', {
        title: '数据预览详情',
        dangerouslyUseHTMLString: true,
        showConfirmButton: false
      }).catch(() => {})
    },
    pageChanged (page) {
      console.log(page)
    }
  }
}
</script>