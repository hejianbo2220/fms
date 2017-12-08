<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>角色权限</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增角色</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="角色名称" prop="name"></el-table-column>
          <el-table-column label="角色说明" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" v-if="scope.row.name !== '管理员'" size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="desc">
          <el-input v-model="form.desc" placeholder="请输入角色说明"></el-input>
        </el-form-item>
        <el-form-item label="模块权限" prop="permission">
          <el-checkbox-group v-model="form.permission">
            <el-checkbox v-for="(item, index) in permissions" :key="index" :label="item"></el-checkbox>
          </el-checkbox-group>
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
  name: 'role',
  data () {
    return {
      table: [],
      tableTotal: 1,
      dialogTitle: '',
      dialogVisible: false,
      permissions: ['角色管理', '用户管理', '流水线管理', '产品管理', '关键数据', '自检自测', '质量检测', '问题提交', '数据预览'],
      form: {
        id: '',
        name: '',
        desc: '',
        permission: []
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        desc: [
          {
            required: true,
            message: '请输入角色说明',
            trigger: 'blur'
          }
        ],
        permission: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个模块',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    getTable (startPage) {
      axios(this, {
        msgType: '6',
        startNo: startPage - 1,
        num: 10
      }).then(data => {
        this.table = data.list
        this.tableTotal = data.total
      })
    },
    dialogShow (type, role) {
      this.dialogVisible = true
      switch (type) {
        case 'add':
          this.dialogTitle = '新增角色'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
          })
          break
        case 'edit':
          this.dialogTitle = '编辑角色'
          this.$nextTick(() => {
            this.$refs.dialogForm.resetFields()
            this.form.id = role.id
            this.form.name = role.name
            this.form.desc = role.desc
            for (let i = 0; i < role.permissions.length; i++) {
              if (role.permissions[i] === '1') {
                this.form.permission.push(this.permissions[i])
              }
            }
          })
          break
      }
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          let msgType
          if (this.dialogTitle === '新增角色') {
            msgType = 7
          } else {
            msgType = 8
          }
          let permission = Array(9).fill('0')
          this.form.permission.forEach(selectedItem => {
            this.permissions.forEach((item, index) => {
              if (item === selectedItem) {
                permission[index] = '1'
              }
            })
          })
          permission = permission.join('')
          axios(this, {
            msgType: msgType,
            id: this.form.id,
            name: this.form.name,
            desc: this.form.desc,
            permission: permission
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
    pageChanged (page) {
      this.getTable(page)
    }
  },
  mounted () {
    this.getTable(1)
  }
}
</script>

<style scoped>
.el-checkbox{
  width: 94px;
  margin-left: 30px;
}
</style>