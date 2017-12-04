<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="pc-breadcrumb-height">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>质量检测</el-breadcrumb-item>
          <el-breadcrumb-item>内容列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-date-picker v-model="filter.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="pc-filter"></el-date-picker>
        <el-cascader expand-trigger="hover" :options="product" v-model="filter.product" placeholder="请选择产品编码" class="pc-filter"></el-cascader>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="编号" prop="id"></el-table-column>
          <el-table-column label="产品编码+批次号" prop="productIdAndBatchId"></el-table-column>
          <el-table-column label="创建时间" prop="time"></el-table-column>
          <el-table-column label="提交人" prop="submit"></el-table-column>
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
  name: 'qualityData',
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
      table: [
        {
          id: '编号1',
          productIdAndBatchId: 'productId1_BatchId1',
          time: '2017-11-11 11:11:11',
          submit: '提交人1'
        },
        {
          id: '编号2',
          productIdAndBatchId: 'productId2_BatchId2',
          time: '2017-12-12 12:12:12',
          submit: '提交人2'
        }
      ],
      tableTotal: 89
    }
  },
  methods: {
    detail () {
      this.$alert('<strong>这里是质量检测详情内容</strong>', {
        title: '质量检测详情',
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