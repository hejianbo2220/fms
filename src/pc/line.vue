<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>流水线管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增流水线</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="流水线名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <el-table-column label="状态" prop="state">
            <span slot-scope="scope" :class="stateSwitch(scope.row.state).class">{{stateSwitch(scope.row.state).text}}</span>
          </el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page.sync="currentPage" @current-change="getTable" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" label-width="94px" ref="dialogForm">
        <el-form-item label="流水线名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入流水线名称"></el-input>
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
  name: 'line',
  data () {
    return {
      table: [],
      currentPage: 1,
      tableTotal: 0,
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
            message: '请输入流水线名称',
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
        msgType: 10,
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.currentPage = startPage
        this.tableTotal = data.total
      })
    },
    stateSwitch (state) {
      switch (state) {
        case 0:
          return {class: 'red', text: '已关闭'}
        case 1:
          return {class: 'green', text: '运行中'}
        case 2:
          return {class: 'orange', text: '已暂停'}
      }
    },
    dialogShow (type, line) {
      this.dialogVisible = true
      switch (type) {
        case 'add':
          this.dialogTitle = '新增流水线'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
          })
          break
        case 'edit':
          this.dialogTitle = '编辑流水线'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
            this.form.id = line.id
            this.form.name = line.name
            this.form.desc = line.desc
          })
          break
      }
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let msgType
          if (this.dialogTitle === '新增流水线') {
            msgType = 30
          } else {
            msgType = 31
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
    }
  },
  mounted () {
    this.getTable(1)
  }
}
</script>