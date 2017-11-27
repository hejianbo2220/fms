<template>
  <el-container>
    <el-header height="100px">工厂管理系统</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true" :style="{minHeight: height}">
          <el-menu-item index="0" :route="{path: '/pc/main/role'}">
            <i class="el-icon-goods"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="1" :route="{path: '/pc/main/user'}">
            <i class="el-icon-tickets"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default{
  name: 'main',
  data () {
    return {
      height: ''
    }
  },
  mounted () {
    // 撑满浏览器高度
    this.height = (window.innerHeight - 100) + 'px'
    window.onresize = () => {
      this.height = (window.innerHeight - 100) + 'px'
    }
  }
}
</script>

<style scoped>
.el-header{
  background-color: #409EFF;
  line-height: 100px;
  font-size: 26px;
  color: #fff;
}
</style>