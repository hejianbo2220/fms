<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>流水线管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增流水线</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="流水线名称" prop="name"></el-table-column>
          <el-table-column label="描述" prop="desc"></el-table-column>
          <el-table-column label="状态" prop="status">
            <span slot-scope="scope" :class="classSwitch(scope.row.status)">{{scope.row.status}}</span>
          </el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
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
export default{
  name: 'line',
  data () {
    return {
      table: [
        {
          name: '流水线1',
          desc: '这是生产水泥的流水线',
          status: '运行中'
        },
        {
          name: '流水线2',
          desc: '这是生产瓷砖的流水线',
          status: '已关闭'
        },
        {
          name: '流水线3',
          desc: '这是生产地板的流水线',
          status: '已暂停'
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
    classSwitch (status) {
      switch (status) {
        case '运行中':
          return 'green'
        case '已关闭':
          return 'red'
        case '已暂停':
          return 'orange'
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
            this.form.name = line.name
            this.form.desc = line.desc
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
    pageChanged (page) {
      console.log(page)
    }
  }
}
</script>