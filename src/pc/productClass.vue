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
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增产品类型</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品类型名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="isDelete(scope.row.id)">删除</el-button>
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
import axios from '@/axios'
export default{
  name: 'productClass',
  data () {
    return {
      table: [],
      tableTotal: 89,
      dialogTitle: '',
      dialogVisible: false,
      form: {
        id: '',
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
    getTable (startPage) {
      axios(this, {
        msgType: 26,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.tableTotal = data.total
      })
    },
    dialogShow (type, productClass) {
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
            this.form.id = productClass.id
            this.form.name = productClass.name
            this.form.desc = productClass.desc
          })
          break
      }
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let msgType
          if (this.dialogTitle === '新增产品类型') {
            msgType = 50
          } else {
            msgType = 51
          }
          axios(this, {
            msgType: msgType,
            id: this.form.id,
            name: this.form.name,
            desc: this.form.desc
          }).then(data => {
            this.dialogVisible = false
            this.$message({
              message: this.dialogTitle + '成功',
              type: 'success',
              duration: 1500
            })
            this.getTable(1)
          })
        }
      })
    },
    isDelete (id) {
      this.$confirm('确认删除该项？', {
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        axios(this, {
          msgType: 52,
          id: id
        }).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.getTable(1)
        })
      }).catch(() => {})
    },
    pageChanged (page) {
      this.getTable(page)
    }
  },
  mounted () {
    this.getTable(1)
  }
}
</script>