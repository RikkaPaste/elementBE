<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 编辑商品 -->
      <Edits />
      <!-- 添加 -->
      <Adds />

      <!-- 删除 -->
      <Del />
      <!-- 权限分配 -->
      <Power />
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
import Search from "../components/listrole/Search";
import Table from "../components/listrole/Table";
import Paging from "../components/listrole/Paging";
import Edits from "../components/listrole/Edits";
import Adds from "../components/listrole/Adds";
import Del from "../components/listrole/Del";
import Power from "../components/listrole/Power";

export default {
  name: "manager",
  components: { Search, Table, Paging, Edits, Adds, Del, Power },
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
      this.getRole(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getRole(this.params);
    },
    ...mapActions("listrole", {
      getRole: "getrolelist",
      addRole: "add",
      updRole: "edit",
      delRole: "delete",
    }),
    //修改状态
    changeChkStatus(list) {
      this.updGoods(list);
    },

    //编辑角色
    async roleEdit(data) {
      await this.updRole(data);
      await this.getRole(this.params);
    },
    //添加角色
    async roleAdd(data) {
      await this.addRole(data);
      await this.getRole(this.params);
    },
    //删除角色名
    async roleDel(id) {
      await this.delRole({ id: id });
      await this.getRole(this.params);
    },
  },
  beforeUpdate(){
    //显示加载状态
    this.$bus.$emit("ShowLoading", true);
  },
  computed: {
    ...mapState("listrole", { tableData: "RoleList" }),
  },
  //初始化请求
  mounted() {
    this.getRole(this.params);
    this.$bus.$on("changeChkStatus", this.changeChkStatus);
    this.$bus.$on("subAddRole", this.roleAdd);
    this.$bus.$on("subEditRole", this.roleEdit);
    this.$bus.$on("subDelRole", this.roleDel);
    //分配刷新
    this.$bus.$on("flush", () => {
      this.getRole(this.params);
    });
  },
  beforeDestroy() {
    this.$bus.$off([
      "changeChkStatus",
      "submitGoodsEdit",
      "subAddRole",
      "subDelRole",
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