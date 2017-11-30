<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>关键数据管理</el-breadcrumb-item>
          <el-breadcrumb-item>关键数据</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="addDialogShow" class="pc-add-btn">新增关键数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="关键数据" prop="keyData"></el-table-column>
          <el-table-column label="产品名称" prop="name"></el-table-column>
          <el-table-column label="产品类型" prop="productClass"></el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-edit-outline" @click="detail(scope.row)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination @current-change="pageChanged" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新增关键数据" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="82px" ref="dialogForm">
        <el-button class="procedure-add" @click="procedureAdd">添加工序</el-button>
        <div v-for="(procedure, procedureIndex) in form.procedures" :key="procedureIndex">
          <el-form-item :rules="{required: true, message: '请输入工序名称', trigger: 'blur'}" label="工序名称" :prop="'procedures.' + procedureIndex + '.name'" class="name-wrap">
            <el-input v-model="procedure.name" placeholder="请输入工序名称"></el-input>
            <el-button class="procedure-delete" @click="procedureDelete(procedure)">删除工序</el-button>
          </el-form-item>
          <div class="attrs-wrap">
            <el-button class="attr-add" @click="attrAdd(procedure)">添加属性</el-button>
            <el-form-item v-for="(attr, attrIndex) in procedure.attrs" :key="attrIndex" :rules="{required: true, message: '请输入属性名称', trigger: 'blur'}" label="属性名称" :prop="'procedures.' + procedureIndex + '.attrs.' + attrIndex + '.value'" class="attr-wrap">
              <el-input v-model="attr.value" placeholder="请输入属性名称"></el-input>
              <el-button class="attr-delete" @click="attrDelete(procedure, attr)">删除属性</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default{
  name: 'keyData',
  data () {
    return {
      table: [
        {
          keyData: '关键数据123',
          name: '产品1',
          productClass: '类型1'
        },
        {
          keyData: '关键数据3',
          name: '产品2',
          productClass: '类型1'
        }
      ],
      tableTotal: 89,
      dialogVisible: false,
      form: {
        procedures: [
          {
            name: '',
            attrs: [
              {
                value: ''
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    addDialogShow () {
      this.form.procedures = [{
        name: '',
        attrs: [
          {
            value: ''
          }
        ]
      }]
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dialogForm.resetFields()
      })
    },
    add () {
      this.dialogVisible = false
      this.$message({
        message: '添加成功',
        type: 'success',
        duration: 1500
      })
    },
    procedureAdd () {
      this.form.procedures.push({
        name: '',
        attrs: [
          {
            value: ''
          }
        ]
      })
    },
    procedureDelete (procedure) {
      const index = this.form.procedures.indexOf(procedure)
      this.form.procedures.splice(index, 1)
    },
    attrAdd (procedure) {
      procedure.attrs.push({vallue: ''})
    },
    attrDelete (procedure, attr) {
      const index = procedure.attrs.indexOf(attr)
      procedure.attrs.splice(index, 1)
    },
    detail () {
      this.$alert('<strong>这里是关键数据详情内容</strong>', {
        title: '关键数据详情',
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

<style scoped>
.el-form{
  position: relative;
}
.procedure-add{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
.name-wrap{
  padding-right: 108px;
}
.procedure-delete{
  position: absolute;
  right: -108px;
  top: 0;
  z-index: 1;
}
.attrs-wrap{
  position: relative;
}
.attr-wrap{
  padding-right: 108px;
  margin-left: 82px;
}
.attr-add{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
}
.attr-delete{
  position: absolute;
  right: -108px;
  top: 0;
  z-index: 1;
}
</style>