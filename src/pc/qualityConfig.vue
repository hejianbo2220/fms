<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>质量检测</el-breadcrumb-item>
          <el-breadcrumb-item>配置表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow" class="add-btn">新增质量检测</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="质量检测ID" prop="id"></el-table-column>
          <el-table-column label="产品类型" prop="name"></el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detailShow(scope.row.id)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page.sync="currentPage" @current-change="getTable" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新增质量检测" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="82px" ref="dialogForm">
        <el-form-item :rules="{type: 'number', required: true, message: '请选择产品类型', trigger: 'change'}" label="产品类型" prop="type_id">
          <el-select v-model="form.type_id" placeholder="请选择产品类型">
            <el-option v-for="item in classOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="attr-add" @click="attrAdd">添加属性</el-button>
        <div v-for="(item, index) in form.list" :key="index">
          <el-form-item :rules="{required: true, message: '请输入属性名称', trigger: 'blur'}" label="属性名称" :prop="'list.' + index + '.name'" class="attr-wrap">
            <el-input v-model="item.name" placeholder="请输入属性名称"></el-input>
            <el-button class="attr-delete" @click="attrDelete(item)">删除属性</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="质量检测详情" :visible.sync="detailVisible" :close-on-click-modal="false" width="420px">
      <el-row>
        <template v-for="(item, index) in detail">
          <el-col :span="4" :key="index">{{'属性' + (index + 1) + '：'}}</el-col>
          <el-col :span="8">{{item.name}}</el-col>
        </template>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'qualityConfig',
  data () {
    return {
      table: [],
      currentPage: 1,
      tableTotal: 1,
      dialogVisible: false,
      classOptions: [],
      form: {
        type_id: '',
        list: [
          {
            name: '',
            value: ''
          }
        ]
      },
      detailVisible: false,
      detail: []
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 57,
        modelID: 4,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    dialogShow () {
      this.form.list = [{
        name: '',
        value: ''
      }]
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dialogForm.resetFields()
      })
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          Object.assign(this.form, {msgType: 90})
          axios(this, this.form).then(data => {
            this.dialogVisible = false
            this.$message({
              message: '新增成功',
              type: 'success',
              duration: 1500
            })
            this.getTable(1)
          })
        }
      })
    },
    attrAdd () {
      this.form.list.push({
        name: '',
        value: ''
      })
    },
    attrDelete (attr) {
      const index = this.form.list.indexOf(attr)
      this.form.list.splice(index, 1)
    },
    detailShow (id) {
      axios(this, {
        msgType: 91,
        type_id: id
      }).then(data => {
        this.detail = data.list
        this.detailVisible = true
      })
    }
  },
  mounted () {
    axios(this, {
      msgType: 26,
      startNo: 0,
      num: 999
    }).then(data => {
      this.classOptions = data.list
    })
    this.getTable(1)
  }
}
</script>

<style scoped>
.el-form{
  position: relative;
}
.el-select{
  width: 100%;
}
.attr-add{
  position: absolute;
  right: 0;
  top: 63px;
  z-index: 2;
}
.attr-wrap{
  padding-right: 108px;
}
.attr-delete{
  position: absolute;
  right: -108px;
  top: 0;
  z-index: 1;
}
</style>