<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>关键数据</el-breadcrumb-item>
          <el-breadcrumb-item>配置表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow" class="add-btn">新增关键数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="关键数据ID" prop="id"></el-table-column>
          <el-table-column label="产品类型" prop="name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-news" @click="detailShow(scope.row.id)">查看</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="isDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page.sync="currentPage" @current-change="getTable" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新增关键数据" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="82px" ref="dialogForm">
        <el-form-item :rules="{type: 'number', required: true, message: '请选择产品类型', trigger: 'change'}" label="产品类型" prop="type_id">
          <el-select v-model="form.type_id" placeholder="请选择产品类型">
            <el-option v-for="item in classOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="procedure-add" @click="procedureAdd">添加工序</el-button>
        <div v-for="(procedure, procedureIndex) in form.process" :key="procedureIndex">
          <el-form-item :rules="{required: true, message: '请输入工序名称', trigger: 'blur'}" label="工序名称" :prop="'process.' + procedureIndex + '.name'" class="name-wrap">
            <el-input v-model="procedure.name" placeholder="请输入工序名称"></el-input>
            <el-button class="procedure-delete" @click="procedureDelete(procedure)">删除工序</el-button>
          </el-form-item>
          <div class="attrs-wrap">
            <el-button class="attr-add" @click="attrAdd(procedure)">添加属性</el-button>
            <template v-for="(attr, attrIndex) in procedure.list">
              <el-form-item :key="attrIndex" :rules="{required: true, message: '请输入属性名称', trigger: 'blur'}" label="属性名称" :prop="'process.' + procedureIndex + '.list.' + attrIndex + '.name'" class="attr-wrap">
                <el-input v-model="attr.name" placeholder="请输入属性名称"></el-input>
                <el-button class="attr-delete" @click="attrDelete(procedure, attr)">删除属性</el-button>
              </el-form-item>
              <el-form-item :rules="{required: true, message: '请输入设备ID', trigger: 'blur'}" :prop="'process.' + procedureIndex + '.list.' + attrIndex + '.device'" class="attr-wrap">
                <el-input v-model="attr.device" placeholder="请输入设备ID"></el-input>
              </el-form-item>
            </template>
          </div>
        </div>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="关键数据详情" :visible.sync="detailVisible" :close-on-click-modal="false" custom-class="detail-wrap">
      <el-row v-for="(procedure, procedureIndex) in detail" :key="procedureIndex" class="detail-procedure-wrap">
        <el-col :span="6" class="detail-procedure-title">{{procedure.name}}</el-col>
        <el-col :span="18">
          <el-row v-for="(attr, attrIndex) in procedure.list" :key="procedureIndex + '-' + attrIndex">
            <el-col :span="15">{{'属性' + (attrIndex + 1) + '：' + attr.name}}</el-col>
            <el-col :span="9">{{attr.device}}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import axios from '@/axios'
export default{
  name: 'keyConfig',
  data () {
    return {
      table: [],
      currentPage: 1,
      tableTotal: 1,
      dialogVisible: false,
      classOptions: [],
      form: {
        type_id: '',
        process: [
          {
            name: '',
            list: [
              {
                name: '',
                device: ''
              }
            ]
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
        modelID: 2,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    dialogShow () {
      this.form.process = [{
        name: '',
        list: [
          {
            name: '',
            device: ''
          }
        ]
      }]
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dialogForm.resetFields()
      })
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.form.process.forEach(item => {
            item.type_id = this.form.type_id
          })
          Object.assign(this.form, {msgType: 70})
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
    procedureAdd () {
      this.form.process.push({
        name: '',
        list: [
          {
            name: '',
            device: ''
          }
        ]
      })
    },
    procedureDelete (procedure) {
      const index = this.form.process.indexOf(procedure)
      this.form.process.splice(index, 1)
    },
    attrAdd (procedure) {
      procedure.list.push({name: '', vallue: ''})
    },
    attrDelete (procedure, attr) {
      const index = procedure.list.indexOf(attr)
      procedure.list.splice(index, 1)
    },
    detailShow (id) {
      axios(this, {
        msgType: 71,
        type_id: id
      }).then(data => {
        this.detail = data.list
        this.detailVisible = true
      })
    },
    isDelete (id) {
      this.$confirm('确认删除该项？', {
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        axios(this, {
          msgType: 77,
          type_id: id
        }).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.getTable(1)
        })
      }).catch(() => {})
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
.procedure-add{
  position: absolute;
  right: 0;
  top: 63px;
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
.detail-procedure-wrap{
  margin-bottom: 20px;
}
.detail-procedure-title{
  font-weight: bold;
}
</style>