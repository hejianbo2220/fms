<template>
  <div>
    <el-row>
      <el-col :span="21">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path: '/pc/main/index'}">工厂管理系统</el-breadcrumb-item>
          <el-breadcrumb-item>自检自测</el-breadcrumb-item>
          <el-breadcrumb-item>配置表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="dialogShow" class="pc-add-btn">新增自检自测</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="table" :stripe="true">
          <el-table-column label="自检自测名称" prop="name"></el-table-column>
          <el-table-column label="产品类型" prop="productClass"></el-table-column>
          <el-table-column label="操作">
            <el-button slot-scope="scope" size="mini" icon="el-icon-news" @click="detail(scope.row)">查看</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination @current-change="pageChanged" :total="tableTotal"></el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新增自检自测" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="82px" ref="dialogForm">
        <el-form-item :rules="{required: true, message: '请选择产品类型', trigger: 'change'}" label="产品类型" prop="productClass">
          <el-select v-model="form.productClass" placeholder="请选择产品类型">
            <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="attr-add" @click="attrAdd">添加属性</el-button>
        <div v-for="(item, index) in form.attrs" :key="index">
          <el-form-item :rules="{required: true, message: '请输入属性名称', trigger: 'blur'}" label="属性名称" :prop="'attrs.' + index + '.value'" class="attr-wrap">
            <el-input v-model="item.value" placeholder="请输入属性名称"></el-input>
            <el-button class="attr-delete" @click="attrDelete(item)">删除属性</el-button>
          </el-form-item>
        </div>
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
  name: 'inspectionConfig',
  data () {
    return {
      table: [
        {
          name: '自检自测123',
          productClass: '类型1'
        },
        {
          name: '自检自测3',
          productClass: '类型1'
        }
      ],
      tableTotal: 89,
      dialogVisible: false,
      classOptions: [
        {
          label: '产品类型1',
          value: 'class1'
        },
        {
          label: '产品类型2',
          value: 'class2'
        },
        {
          label: '产品类型3',
          value: 'class3'
        },
        {
          label: '产品类型4',
          value: 'class4'
        }
      ],
      form: {
        productClass: '',
        attrs: [
          {
            value: ''
          }
        ]
      }
    }
  },
  methods: {
    dialogShow () {
      this.form.attrs = [{
        value: ''
      }]
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
    },
    attrAdd () {
      this.form.attrs.push({
        value: ''
      })
    },
    attrDelete (attr) {
      const index = this.form.attrs.indexOf(attr)
      this.form.attrs.splice(index, 1)
    },
    detail () {
      this.$alert('<strong>这里是自检自测详情内容</strong>', {
        title: '自检自测详情',
        dangerouslyUseHTMLString: true,
        showConfirmButton: false
      }).catch(() => {})
    },
    pageChanged (page) {
      console.log(page)
    }
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
.attr-add{
  position: absolute;
  right: 0;
  top: 63px;
  z-index: 2;
}
.attr-wrap{
  padding-right: 108px;
}
.attr-delete{
  position: absolute;
  right: -108px;
  top: 0;
  z-index: 1;
}
</style>