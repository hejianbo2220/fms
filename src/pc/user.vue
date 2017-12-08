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
          <el-table-column label="用户名" prop="accID"></el-table-column>
          <el-table-column label="角色" prop="rolename"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
              <el-button v-if="scope.row.accID !== 'admin'" type="danger" size="mini" icon="el-icon-delete" @click="isDelete(scope.row.accID)">删除</el-button>
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
      <el-form :model="form" label-width="82px" ref="dialogForm">
        <template v-if="dialogTitle === '新增用户'">
          <el-form-item :rules="{required: true, message: '请输入用户名', trigger: 'blur'}" label="用户名" prop="userid">
            <el-input v-model="form.userid" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item :rules="{required: true, message: '请输入密码', trigger: 'blur'}" label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item :rules="{type: 'number', required: true, message: '请选择角色'}" label="角色" prop="roleid">
            <el-select v-model="form.roleid" placeholder="请选择角色">
              <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="用户名" prop="userid">
            <el-input v-model="form.userid" placeholder="请输入用户名" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item v-if="form.userid === 'admin'" label="角色" prop="roleid">
            <el-select v-model="form.roleid" placeholder="请选择角色" :disabled="true">
              <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else :rules="{type: 'number', required: true, message: '请选择角色'}" label="角色" prop="roleid">
            <el-select v-model="form.roleid" placeholder="请选择角色">
              <el-option v-for="(item, index) in roles" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </template>
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
  name: 'user',
  data () {
    return {
      table: [],
      tableTotal: 89,
      dialogTitle: '',
      dialogVisible: false,
      roles: [],
      form: {
        userid: '',
        password: '',
        roleid: ''
      }
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {msgType: 4}).then(data => {
        this.table = data.list
      })
    },
    dialogShow (type, user) {
      this.dialogVisible = true
      if (type === 'add') {
        this.dialogTitle = '新增用户'
        this.$nextTick(() => {
          this.$refs.dialogForm.resetFields()
        })
      } else {
        this.dialogTitle = '编辑用户'
        this.$nextTick(() => {
          this.$refs.dialogForm.resetFields()
          this.form.userid = user.accID
          this.form.roleid = user.role_id
        })
      }
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let msgType
          if (this.dialogTitle === '新增用户') {
            msgType = 2
          } else {
            msgType = 3
          }
          axios(this, {
            msgType: msgType,
            username: '',
            userID: this.form.userid,
            role_id: this.form.roleid,
            password: this.form.password
          }).then(data => {
            this.dialogVisible = false
            this.$message({
              message: this.dialogTitle + '成功',
              type: 'success',
              duration: 1500
            })
            this.getTable()
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
          msgType: 40,
          userID: id
        }).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.getTable()
        })
      }).catch(() => {})
    },
    pageChanged (page) {
      console.log(page)
    }
  },
  mounted () {
    axios(this, {msgType: 6}).then(data => {
      this.roles = data.list
    })
    this.getTable()
  }
}
</script>

<style scoped>
.el-select{
  width: 100%;
}
</style>