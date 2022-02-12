<template>
  <div>
    <el-container style="height: 100vh">
      <el-aside
        :width="!isCollapse ? 'auto' : '150px'"
        style="background-color:#d2d3d2"
      >
      <el-radio-group v-model="isCollapse" >
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
        <el-menu
          unique-opened
          router
          background-color="#dfdfdf"
          text-color="#3d3d3d"
          active-text-color="#df6704"
          :collapse="isCollapse"
          class="el-menu-vertical-demo"
        >
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-user"></i
              ><span slot="title">系统管理</span></template
            >
            <el-menu-item index="/manager"
              ><i class="el-icon-menu"></i>管理员列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-s-shop"></i
              ><span slot="title">商品管理</span></template
            >
            <el-menu-item index="/listgoods"
              ><i class="el-icon-menu"></i>商品列表</el-menu-item
            >
            <el-menu-item index="/listgoodscate"
              ><i class="el-icon-menu"></i>商品分类列表</el-menu-item
            >
            <el-menu-item index="/listgoodsattr"
              ><i class="el-icon-menu"></i>商品参数属性列表</el-menu-item
            >
            <el-menu-item index="/listswiper"
              ><i class="el-icon-menu"></i>轮播图列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-place"></i
              ><span slot="title">权限管理</span></template
            >
            <el-menu-item index="/listrole"
              ><i class="el-icon-menu"></i>角色列表</el-menu-item
            >
            <el-menu-item index="/listmenu"
              ><i class="el-icon-menu"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-tickets"></i
              ><span slot="title">订单管理</span></template
            >
            <el-menu-item index="/listorder"
              ><i class="el-icon-menu"></i>订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-user"></i
              ><span slot="title">客户管理</span></template
            >
            <el-menu-item index="/listclient"
              ><i class="el-icon-menu"></i>客户列表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-card>
          <router-view />
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style lang='less' scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  line-height: 60px;
  position: relative;
  .el-breadcrumb {
    position: absolute;
    top: 45%;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-width: 150;
  min-height: 400px;
}

.el-container {
  background-color: #ffffff;
}
.el-aside {
  color: #333;

}
.el-submenu,
.el-submenu * {
  text-align: left;
}
.el-card {
  overflow-y: inherit;
  width: 100%;
}
</style>