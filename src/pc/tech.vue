<template>
  <div>
    <el-row>
      <el-col :span="7">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">生产数据采集系统</el-breadcrumb-item>
          <el-breadcrumb-item>工艺管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="17">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow('add')" class="add-btn">新增工艺</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="一级名称" prop="firstName"></el-table-column>
          <el-table-column label="二级名称" prop="secondName"></el-table-column>
          <el-table-column label="三级名称" prop="thirdName"></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" icon="el-icon-edit" @click="dialogShow('edit', scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="isDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" label-width="82px" ref="dialogForm">
        <el-form-item label="一级名称" prop="firstName">
          <el-input v-model="form.firstName" placeholder="请输入一级名称"></el-input>
        </el-form-item>
        <el-form-item label="二级名称" prop="secondName">
          <el-input v-model="form.secondName" placeholder="请输入二级名称"></el-input>
        </el-form-item>
        <el-form-item label="三级名称" prop="thirdName">
          <el-input v-model="form.thirdName" placeholder="请输入三级名称"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="上传工艺" prop="url">
          <el-upload :action="this.$store.state.pdfUpload" :http-request="upload">
            <el-button type="primary" size="medium" icon="el-icon-upload">上传文件</el-button>
          </el-upload>
          <el-input v-model="form.url" v-show="false"></el-input>
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
import axios from 'axios'
import axiosData from '@/axios'
export default{
  name: 'tech',
  data () {
    return {
      table: [],
      dialogTitle: '',
      dialogVisible: false,
      form: {
        firstName: '',
        secondName: '',
        thirdName: '',
        remarks: '',
        url: '',
        id: -1
      },
      rules: {
        firstName: [
          {
            required: true,
            message: '请输入一级名称',
            trigger: 'blur'
          }
        ],
        secondName: [
          {
            required: true,
            message: '请输入二级名称',
            trigger: 'blur'
          }
        ],
        thirdName: [
          {
            required: true,
            message: '请输入三级名称',
            trigger: 'blur'
          }
        ],
        url: [
          {
            required: true,
            message: '请上传工艺文件',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    getTable () {
      axiosData(this, {
        msgType: 122
      }).then(data => {
        this.table = []
        data.list.forEach(first => {
          first.children.forEach(second => {
            second.children.forEach(third => {
              this.table.push({
                firstName: first.name,
                secondName: second.name,
                thirdName: third.name,
                remarks: third.remarks,
                url: third.url,
                id: third.id
              })
            })
          })
        })
      })
    },
    dialogShow (type, tech) {
      this.dialogVisible = true
      if (type === 'add') {
        this.dialogTitle = '新增工艺'
        this.$nextTick(() => {
          this.$refs.dialogForm.resetFields()
          this.form.id = -1
        })
      } else {
        this.dialogTitle = '编辑工艺'
        this.$nextTick(() => {
          this.$refs.dialogForm.resetFields()
          this.form.firstName = tech.firstName
          this.form.secondName = tech.secondName
          this.form.thirdName = tech.thirdName
          this.form.remarks = tech.remarks
          this.form.url = tech.url
          this.form.id = tech.id
        })
      }
    },
    dialogSure () {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          axiosData(this, {
            msgType: 120,
            type: 1,
            firstName: this.form.firstName,
            secondName: this.form.secondName,
            thirdName: this.form.thirdName,
            remarks: this.form.remarks,
            url: this.form.url,
            id: this.form.id
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
    upload (event) {
      const formData = new FormData()
      formData.append('file', event.file)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(event.action, formData, config).then(res => {
        if (res.data.res === 0) {
          this.$message({
            message: '上传成功',
            type: 'success',
            duration: 1500
          })
          this.form.url = res.data.url
        } else {
          this.$alert(res.data.msg)
        }
      }).catch(err => {
        if (err.response) {
          this.$alert(err.response.data.message)
        } else {
          this.$alert(err.message)
        }
      })
    },
    isDelete (id) {
      this.$confirm('确认删除该项？', {
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        axiosData(this, {
          msgType: 121,
          id
        }).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500
          })
          this.getTable()
        })
      }).catch(() => {})
    }
  },
  mounted () {
    this.getTable()
  }
}
</script>