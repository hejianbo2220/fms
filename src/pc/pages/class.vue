<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品类型</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="pc-add-btn">新增产品类型</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品类型名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit-outline" @click="dialogShow('edit', scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="isDelete(scope.$index)">删除</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" label-width="108px" ref="dialogForm">
        <el-form-item label="产品类型名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品类型名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="form.desc" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default{
  name: 'class',
  data () {
    return {
      table: [
        {
          name: '产品类型1',
          desc: '这是产品类型1的描述'
        },
        {
          name: '产品类型2',
          desc: '这是产品类型2的描述'
        }
      ],
      tableTotal: 89,
      dialogTitle: '',
      dialogVisible: false,
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入产品类型名称',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    dialogShow (type, proClass) {
      this.dialogVisible = true
      switch (type) {
        case 'add':
          this.dialogTitle = '新增产品类型'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
          })
          break
        case 'edit':
          this.dialogTitle = '编辑产品类型'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
            this.form.name = proClass.name
            this.form.desc = proClass.desc
          })
          break
      }
    },
    dialogSure () {
      this.dialogVisible = false
      this.$message({
        message: this.dialogTitle + '成功',
        type: 'success',
        duration: 1500
      })
    },
    isDelete (index) {
      this.$confirm('确认删除该项？', {
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        console.log(this.table[index].name + '已删除')
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1500
        })
      }).catch(() => {})
    },
    pageChanged (page) {
      console.log(page)
    }
  }
}
</script>