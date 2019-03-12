<style lang="stylus">
  .lay-l,
  .lay 
    color #ffffff
    display flex
    align-items center
    img
      margin 0 10px
  .lay 
    justify-content center
</style>

<template>
  <el-container style="height: 100%;">
    <el-header>
      <el-col :span="20" class="lay-l">
        <img src="/static/images/common/logo.png">
        <span>{{ clientName }}</span>
      </el-col>
      <el-col :span="4" style="font-size:14px" class="lay">
        <img src="/static/images/common/top_icon_user.png">
        <span class="el-dropdown-link">
          欢迎您， {{ userName }}
        </span>
        <img src="/static/images/common/top_icon_out.png" @click="logout">
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="$route.path" router unique-opened>
          <el-submenu v-for="menu in menus" :index="menu.code" :key="menu.code">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item v-for="child in menu.childItems" :index="child.code" :key="child.code">{{ child.name }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import dialog from "comp/dialog";
import login from "views/Login";
export default {
  name: "root",
  components: {
    ...dialog
  },
  computed: {},
  data() {
    return {
      userName: localStorage.getItem("userName"),
      clientName: localStorage.getItem("clientName"),
      menus: [
        {
          name: '体检管理',
          code: '1',
          childItems: [
            {
              name: '体检查看',
              code: '/view',
            },
            {
              name: '登记审核',
              code: '/register',
            },
            {
              name: '体检补打',
              code: '/printform',
            },
            {
              name: '条码打印',
              code: '/printcode',
            },
            {
              name: '效验发证',
              code: '/certification',
            }
          ]
        },{
          name: '体检检查',
          code: '2',
          childItems: [
            {
              name: '体征检查',
              code: '/sign',
            },
            {
              name: '胸透检查',
              code: '/xrays',
            },
            {
              name: '肛拭检查',
              code: '/analswab',
            },
            {
              name: '血液检查',
              code: '/blood',
            }
          ]
        },{
          name: '检验管理',
          code: '3',
          childItems: [
            {
              name: '肛拭结果录入',
              code: '/analswabin',
            },
            {
              name: '肛拭结果审核',
              code: '/analswabaudit',
            },
            {
              name: '血液结果录入',
              code: '/bloodin',
            },
            {
              name: '血液结果审核',
              code: '/bloodaudit',
            }
          ]
        },{
          name: '报表管理',
          code: '4',
          childItems: [
            {
              name: '颁证统计表',
              code: '/certificationtb',
            }
          ]
        },{
          name: '权限',
          code: '5',
          childItems: [
            {
              name: '账号管理',
              code: '/account',
            },
            {
              name: '角色管理',
              code: '/role',
            }
          ]
        }
      ]
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.replace("/login");
    }
  }
};
</script>
