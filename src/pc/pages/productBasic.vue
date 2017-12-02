<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-height">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>基础数据</el-breadcrumb-item>
        </el-breadcrumb>
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
        <el-pagination @current-change="pageChanged" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  name: 'productBasic',
  data () {
    return {
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
      tableTotal: 89
    }
  },
  methods: {
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
    },
    pageChanged (page) {
      console.log(page)
    }
  }
}
</script>

<style>
.upload-btn{
  display: inline-block;
  margin-left: 10px;
}
</style>