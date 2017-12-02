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
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="pc-add-btn">新增产品</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="产品编码" prop="id"></el-table-column>
          <el-table-column label="产品名称" prop="name"></el-table-column>
          <el-table-column label="产品类型" prop="productClass"></el-table-column>
          <el-table-column label="规格型号" prop="standard"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
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
      <el-form :model="form" :rules="rules" label-width="82px" ref="dialogForm">
        <el-form-item label="产品编码" prop="id">
          <el-input v-model="form.id" placeholder="请输入产品编码"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入产品名称"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="productClass">
          <el-select v-model="form.productClass" placeholder="请选择产品类型">
            <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格型号" prop="standard">
          <el-input v-model="form.standard" placeholder="请输入规格型号"></el-input>
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
  name: 'product',
  data () {
    return {
      table: [
        {
          id: 'id1',
          name: '产品名称1',
          productClass: '产品类型1',
          standard: '规格1'
        },
        {
          id: 'id2',
          name: '产品名称2',
          productClass: '产品类型2',
          standard: '规格2'
        },
        {
          id: 'id3',
          name: '产品名称3',
          productClass: '产品类型3',
          standard: '规格3'
        },
        {
          id: 'id4',
          name: '产品名称4',
          productClass: '产品类型4',
          standard: '规格4'
        }
      ],
      tableTotal: 89,
      dialogTitle: '',
      dialogVisible: false,
      classOptions: [
        {
          label: '产品类型1',
          value: 'class1'
        },
        {
          label: '产品类型2',
          value: 'class2'
        },
        {
          label: '产品类型3',
          value: 'class3'
        },
        {
          label: '产品类型4',
          value: 'class4'
        }
      ],
      form: {
        id: '',
        name: '',
        productClass: '',
        standard: ''
      },
      rules: {
        id: [
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
        productClass: [
          {
            required: true,
            message: '请选择产品类型',
            trigger: 'change'
          }
        ],
        standard: [
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
            this.form.name = product.name
            this.form.productClass = product.productClass
            this.form.standard = product.standard
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

<style scoped>
.el-select{
  width: 100%;
}
</style>