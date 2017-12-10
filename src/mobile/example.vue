<template>
  <div>
    <mt-header title="顶部标题">
      <mt-button icon="back" @click="back" slot="left"></mt-button>
    </mt-header>
    <mt-field label="文本" placeholder="请输入文本"></mt-field>
    <mt-field label="数字" placeholder="请输入数字" type="number"></mt-field>
    <mt-field label="文本域" placeholder="请输入文本域" type="textarea" rows="4"></mt-field>
    <mt-cell title="开关">
      <mt-switch></mt-switch>
    </mt-cell>
    <mt-radio title="单选框" :options="['选项A', '选项B', '选项C']"></mt-radio>
    <mt-checklist title="复选框" :options="['选项A', '选项B', '选项C']" v-model="checklist"></mt-checklist>
    <div class="btn-wrap">
      <mt-button type="primary" size="large">提 交</mt-button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'example',
  data () {
    return {
      checklist: []
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>