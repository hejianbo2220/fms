<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增用户</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="角色" prop="role"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
              <el-button v-if="scope.row.username !== 'admin'" type="danger" size="mini" icon="el-icon-delete" @click="isDelete(scope.$index)">删除</el-button>
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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" :disabled="form.username === 'admin'"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色" :disabled="form.username === 'admin'">
            <el-option v-for="(item, index) in roles" :key="index" :value="item.name"></el-option>
          </el-select>
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
  name: 'user',
  data () {
    return {
      table: [
        {
          username: 'admin',
          role: '管理员'
        },
        {
          username: 'user1',
          role: '角色1'
        },
        {
          username: 'user2',
          role: '角色2'
        },
        {
          username: 'user3',
          role: '角色3'
        }
      ],
      tableTotal: 89,
      dialogTitle: '',
      dialogVisible: false,
      roles: [
        {
          name: '管理员',
          desc: '这是管理员角色',
          permission: ['角色管理', '用户管理', '模块3', '模块4']
        },
        {
          name: '角色1',
          desc: '这是角色1',
          permission: ['用户管理', '模块3']
        },
        {
          name: '角色2',
          desc: '这是角色2',
          permission: ['角色管理']
        },
        {
          name: '角色3',
          desc: '这是角色3',
          permission: ['角色管理', '模块3', '模块4']
        }
      ],
      form: {
        username: '',
        password: '',
        role: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    dialogShow (type, user) {
      this.dialogVisible = true
      switch (type) {
        case 'add':
          this.dialogTitle = '新增用户'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
          })
          break
        case 'edit':
          this.dialogTitle = '编辑用户'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
            this.form.username = user.username
            this.form.role = user.role
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
        console.log(this.table[index].username + '已删除')
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