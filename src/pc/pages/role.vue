<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
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
              <el-button size="mini" icon="el-icon-edit-outline" @click="dialogShow('edit', scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="confirmShow(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="dialogForm">
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="desc">
          <el-input v-model="form.desc" placeholder="请输入角色说明"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSure">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="30%" :visible.sync="confirmVisible" :close-on-click-modal="false">
      <p>确认删除该项？</p>
      <div slot="footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSure">确 定</el-button>
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
          desc: '这是管理员角色'
        },
        {
          name: '角色1',
          desc: '这是角色1'
        },
        {
          name: '角色2',
          desc: '这是角色2'
        },
        {
          name: '角色3',
          desc: '这是角色3'
        }
      ],
      confirmVisible: false,
      deleteIndex: '',
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
        ]
      }
    }
  },
  methods: {
    dialogShow (type, user) {
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
            this.form.name = user.name
            this.form.desc = user.desc
          })
          break
      }
      this.dialogVisible = true
    },
    dialogSure () {},
    confirmShow (index) {
      this.deleteIndex = index
      this.confirmVisible = true
    },
    confirmSure () {}
  },
  mounted () {
    this.popoverVisible = Array(this.table.length).fill(false)
  }
}
</script>
