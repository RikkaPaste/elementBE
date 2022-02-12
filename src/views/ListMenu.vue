<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :params="params"/>
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 编辑商品 -->
      <Edits />
      <!-- 添加 -->
      <Adds />

      <!-- 删除 -->
      <Del />
      <!-- 分页组件 -->
      <Paging
        :tableData="tableData"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      />
    </el-card>
  </div>
</template>

<script>
import { valiUsername, valiMobile, valiEmail } from "@/util/regexp";
import { mapState, mapActions } from "vuex";
import Search from "../components/listmenu/Search";
import Table from "../components/listmenu/Table";
import Paging from "../components/listmenu/Paging";
import Edits from "../components/listmenu/Edits";
import Adds from "../components/listmenu/Adds";
import Del from "../components/listmenu/Del";

export default {
  name: "manager",
  components: { Search, Table, Paging, Edits, Adds, Del },
  data() {
    return {
      params: {
        pageNo: 1,
        pageSize: 20,
      },
      rules: {
        username: [{ validator: valiUsername, trigger: "blur" }],
        mobile: [{ validator: valiMobile, trigger: "blur" }],
        email: [{ validator: valiEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    //条数
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.getMenu(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getMenu(this.params);
    },
    ...mapActions("listmenu", {
      getMenu: "getmenulist",
      addMenu: "add",
      updMenu: "edit",
      delMenu: "delete",
    }),

      subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };
      //发送请求
      this.getMenu(this.params);
    },
    //编辑角色
    async MenuEdit(data) {
      await this.updMenu(data);
      await this.getMenu(this.params);
    },
    //添加角色
    async MenuAdd(data) {
      await this.addMenu(data);
      await this.getMenu(this.params);
    },
    //删除角色名
    async MenuDel(id) {
      await this.delMenu({ id: id });
      await this.getMenu(this.params);
    },
  },
  beforeUpdate(){
    //显示加载状态
    this.$bus.$emit("ShowLoading", true);
  },
  computed: {
    ...mapState("listmenu", { tableData: "MenuList" }),
  },
  //初始化请求
  mounted() {
    this.getMenu(this.params);
    this.$bus.$on("subSearch", this.subSearch);
    this.$bus.$on("subAddMenu", this.MenuAdd);
    this.$bus.$on("subEditMenu", this.MenuEdit);
    this.$bus.$on("subDelMenu", this.MenuDel);
/*     //分配刷新
    this.$bus.$on("flush", () => {
      this.getRole(this.params);
    }); */
  },
  beforeDestroy() {
    this.$bus.$off([
      "subSearch",
      "subAddMenu",
      "subEditMenu",
      "subDelMenu",
      "flush",
    ]);
  },
};
</script>

<style lang='less' scoped>
.el-dialog {
  text-align: center;
}
.el-card {
  height: 94vh;
}
</style>