<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="pc-breadcrumb-height">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>问题提交</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="问题名称" prop="name"></el-table-column>
          <el-table-column label="创建人" prop="create"></el-table-column>
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
  name: 'question',
  data () {
    return {
      table: [
        {
          name: '问题1',
          create: '创建人1',
          submit: '提交人1'
        },
        {
          name: '问题1',
          create: '创建人1',
          submit: '提交人1'
        }
      ],
      tableTotal: 89
    }
  },
  methods: {
    detail () {
      this.$alert('<strong>这里是问题详情内容</strong>', {
        title: '问题详情',
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