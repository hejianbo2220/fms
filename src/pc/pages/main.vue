<template>
  <el-container>
    <el-header height="100px">工厂管理系统</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :unique-opened="true" :router="true">
          <template v-for="(item, index) in menu">
            <el-submenu v-if="item.submenu" :key="index" :index="String(index)">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="(subItem, subIndex) in item.submenu" :key="subIndex" :index="String(index) + '-' + String(subIndex)" :route="{path: subItem.path}">
                <i :class="item.icon"></i>
                <span slot="title">{{subItem.title}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="index" :index="String(index)" :route="{path: item.path}">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main :style="{minHeight: height}">
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
      menu: [
        {
          title: '角色管理',
          icon: 'el-icon-goods',
          path: '/pc/main/role'
        },
        {
          title: '用户管理',
          icon: 'el-icon-tickets',
          path: '/pc/main/user'
        },
        {
          title: '流水线管理',
          icon: 'el-icon-minus',
          path: '/pc/main/line'
        },
        {
          title: '产品管理',
          icon: 'el-icon-document',
          submenu: [
            {
              title: '产品类型',
              path: '/pc/main/product/class'
            },
            {
              title: '产品编码',
              path: '/pc/main/product/data'
            }
          ]
        },
        {
          title: '关键数据管理',
          icon: 'el-icon-star-off',
          submenu: [
            {
              title: '配置表',
              path: '/pc/main/key/config'
            },
            {
              title: '内容列表',
              path: '/pc/main/key/data'
            },
            {
              title: '统计图',
              path: '/pc/main/key/chart'
            }
          ]
        }
      ],
      height: ''
    }
  },
  mounted () {
    // 撑满浏览器高度
    this.height = (innerHeight - 100) + 'px'
    onresize = () => {
      this.height = (innerHeight - 100) + 'px'
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
.el-menu{
  border-right: none;
}
.el-main{
  border-left: 1px solid #e6e6e6;
}
</style>