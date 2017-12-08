<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品编码</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增产品</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品编码" prop="serial"></el-table-column>
          <el-table-column label="产品名称" prop="name"></el-table-column>
          <el-table-column label="产品类型" prop="type_name"></el-table-column>
          <el-table-column label="规格型号" prop="spec"></el-table-column>
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
      <el-form :model="form" :rules="rules" label-width="82px" ref="dialogForm">
        <el-form-item label="产品编码" prop="serials">
          <el-input v-model="form.serials" placeholder="请输入产品编码"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="typeid">
          <el-select v-model="form.typeid" placeholder="请选择产品类型">
            <el-option v-for="item in classOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格型号" prop="spec">
          <el-input v-model="form.spec" placeholder="请输入规格型号"></el-input>
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
  name: 'product',
  data () {
    return {
      table: [],
      tableTotal: 1,
      dialogTitle: '',
      dialogVisible: false,
      classOptions: [],
      form: {
        id: '',
        serials: '',
        name: '',
        typeid: '',
        spec: ''
      },
      rules: {
        serials: [
          {
            required: true,
            message: '请输入产品编码',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入产品名称',
            trigger: 'blur'
          }
        ],
        typeid: [
          {
            type: 'number',
            required: true,
            message: '请选择产品类型',
            trigger: 'change'
          }
        ],
        spec: [
          {
            required: true,
            message: '请输入规格型号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: 27,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.tableTotal = data.total
      })
    },
    dialogShow (type, product) {
      this.dialogVisible = true
      switch (type) {
        case 'add':
          this.dialogTitle = '新增产品'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
          })
          break
        case 'edit':
          this.dialogTitle = '编辑产品'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
            this.form.id = product.id
            this.form.serials = product.serial
            this.form.name = product.name
            this.form.typeid = product.type_id
            this.form.spec = product.spec
          })
          break
      }
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let msgType
          if (this.dialogTitle === '新增产品') {
            msgType = 53
          } else {
            msgType = 55
          }
          axios(this, {
            msgType: msgType,
            id: this.form.id,
            serials: this.form.serials,
            name: this.form.name,
            type_id: this.form.typeid,
            spec: this.form.spec
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
          msgType: 56,
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
.el-select{
  width: 100%;
}
</style>