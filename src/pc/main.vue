<template>
  <el-container>
    <el-header height="100px">
      生产数据采集系统
      <el-button type="text" @click="logout" class="logout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :unique-opened="true" :router="true" :default-active="menuActive">
          <template v-for="(item, index) in menu" v-if="item.permission === '1'">
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
          title: '角色权限',
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
            },
            {
              title: '基础数据',
              path: '/pc/main/product/basic'
            },
            {
              title: '统计图',
              path: '/pc/main/product/chart'
            },
            {
              title: '重量正态分布',
              path: '/pc/main/product/nd'
            }
          ]
        },
        {
          title: '关键数据',
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
        },
        {
          title: '自检自测',
          icon: 'el-icon-date',
          submenu: [
            {
              title: '配置表',
              path: '/pc/main/inspection/config'
            },
            {
              title: '内容列表',
              path: '/pc/main/inspection/data'
            },
            {
              title: '统计图',
              path: '/pc/main/inspection/chart'
            },
            {
              title: '废料记录',
              path: '/pc/main/inspection/waste'
            }
          ]
        },
        {
          title: '质量检测',
          icon: 'el-icon-bell',
          submenu: [
            {
              title: '配置表',
              path: '/pc/main/quality/config'
            },
            {
              title: '内容列表',
              path: '/pc/main/quality/data'
            },
            {
              title: '统计图',
              path: '/pc/main/quality/chart'
            }
          ]
        },
        {
          title: '问题列表',
          icon: 'el-icon-edit-outline',
          path: '/pc/main/question'
        },
        {
          title: '数据预览',
          icon: 'el-icon-view',
          path: '/pc/main/preview'
        },
        {
          title: '工艺管理',
          icon: 'el-icon-news',
          path: '/pc/main/tech'
        }
      ],
      menuActive: '',
      height: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit('set', {token: '', permis: ''})
      this.$router.push('/pc')
    }
  },
  mounted () {
    // 判断是否登录
    if (this.$store.state.token === '') {
      this.$router.push('/pc')
      return false
    }

    // 撑满浏览器高度
    this.height = (innerHeight - 100) + 'px'
    onresize = () => {
      this.height = (innerHeight - 100) + 'px'
    }

    // 菜单权限和激活项
    this.menu.forEach((item, index) => {
      item.permission = this.$store.state.permission[index]
      if (item.submenu) {
        item.submenu.forEach((subItem, subIndex) => {
          if (subItem.path === this.$route.path) {
            this.menuActive = String(index) + '-' + String(subIndex)
          }
        })
      } else {
        if (item.path === this.$route.path) {
          this.menuActive = String(index)
        }
      }
    })
  }
}
</script>

<style>
/*global*/
ul{
  list-style: none;
}
.el-message-box__message{
  max-height: 400px;
  overflow-y: auto;
}
.add-btn{
  margin-top: -8px;
  float: right;
}
.breadcrumb-height{
  height: 25px;
}
.filter{
  float: right;
  margin: -13px 0 0 10px;
}
.chart{
  height: 240px;
}
.detail-wrap{
  width: 420px;
}
.detail-wrap .el-dialog__body{
  padding: 10px 20px 30px;
}
.el-header{
  background-color: #409EFF;
  line-height: 100px;
  font-size: 26px;
  color: #fff;
}
.logout{
  float: right;
  margin-top: 40px;
  color: #fff;
}
.logout:hover{
  color: #fff;
  text-decoration: underline;
}
.el-menu{
  border-right: none;
}
.el-main{
  border-left: 1px solid #e6e6e6;
}
</style>