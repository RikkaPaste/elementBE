<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :param="params" />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <Edits :form="form" />
      <Delete />
      <Adds />
      <Roles :tableroles="tableroles" />
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
import { mapState, mapActions } from "vuex";
import Search from "../components/manager/Search";
import Table from "../components/manager/Table";
import Paging from "../components/manager/Paging";
import Delete from "../components/manager/Delete";
import Edits from "../components/manager/Edits";
import Adds from "../components/manager/Adds";
import Roles from "../components/manager/Roles";

export default {
  name: "manager",
  components: { Search, Table, Paging, Delete, Edits, Adds, Roles },
  data() {
    return {
      params: {
        username: "",
        email: "",
        pageNo: 1,
        pageSize: 20,
      },
      form: {
        username: undefined,
        email: undefined,
        mobile: undefined,
      },
    };
  },
  methods: {
    //条数
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.getUsers(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getUsers(this.params);
    },
    ...mapActions("users", {
      getUsers: "getUsersList",
      updUsers: "edit",
      delUsers: "delete",
      addUsers: "add",
      getRoles: "getRolesList",
    }),

    //删除处理
    handleDel(id) {
      if (this.form.hasOwnProperty("userId")) {
        this.form.userId = id;
      } else {
        this.$set(this.form, "userId", id);
      }
      this.$bus.$emit("setcenter", true);
    },

    //发送编辑请求方法
    async submitEdit(form) {
        await this.updUsers(form);
        await this.getUsers(this.params);
    },

    //发送删除请求方法
    async subDel(id) {
      await this.delUsers({ id:id});
      await this.getUsers(this.params);
    },

    //搜索请求
    subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };
      //发送请求
      this.getUsers(this.params);
    },

    //发送添加请求
    async subAdd(data) {
      await this.addUsers(data);
      await this.getUsers(this.params);
    },

    //改变状态
    onChangeStripe(list) {
      this.updUsers(list);
    },

    async subEditRoles(list) {
      await this.updUsers(list);
      await this.getUsers(this.params);
    },
  },
  computed: {
    ...mapState("users", { tableData: "usersList", tableroles: "rolesList" }),
  },
  beforeUpdate() {
    this.$bus.$emit("ShowLoading", true);
  },
  //初始化请求
  mounted() {
    this.getUsers(this.params);
    this.getRoles();
    this.$bus.$on("subSearch", this.subSearch);
    this.$bus.$on("onChangeStripe", this.onChangeStripe);
    this.$bus.$on("handleDel", this.handleDel);
    this.$bus.$on("submitEdit", this.submitEdit);
    this.$bus.$on("subDel", this.subDel);
    this.$bus.$on("subAdd", this.subAdd);
    this.$bus.$on("subRoles", this.subEditRoles);
  },
  beforeDestroy() {
    this.$bus.$off([
      "subSearch",
      "onChangeStripe",
      "handleDel",
      "subDel",
      "submitEdit",
      "subAdd",
      "subRoles",
    ]); /*  */
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