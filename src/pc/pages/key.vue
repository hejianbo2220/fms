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
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow" class="pc-add-btn">新增关键数据</el-button>
      </el-col>
    </el-row>
    <router-view />
    <el-dialog title="新增关键数据" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" label-width="82px" ref="dialogForm">
        <el-form-item label="工序名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入工序名称"></el-input>
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
  name: 'key',
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入产品类型名称',
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
    dialogShow () {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.dialogForm.resetFields()
      })
    },
    dialogSure () {
      this.dialogVisible = false
      this.$message({
        message: '添加成功',
        type: 'success',
        duration: 1500
      })
    }
  }
}
</script>