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
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="pc-add-btn">新增角色</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="角色名称" prop="name"></el-table-column>
          <el-table-column label="角色说明" prop="desc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.name !== '管理员'" size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="desc">
          <el-input v-model="form.desc" placeholder="请输入角色说明"></el-input>
        </el-form-item>
        <el-form-item label="模块权限" prop="permission">
          <el-checkbox-group v-model="form.permission">
            <el-checkbox label="角色管理"></el-checkbox>
            <el-checkbox label="用户管理"></el-checkbox>
            <el-checkbox label="模块3"></el-checkbox>
            <el-checkbox label="模块4"></el-checkbox>
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
export default{
  name: 'role',
  data () {
    return {
      table: [
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
      tableTotal: 89,
      dialogTitle: '',
      dialogVisible: false,
      form: {
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
            this.form.name = role.name
            this.form.desc = role.desc
            this.form.permission = role.permission
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