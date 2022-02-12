<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>客户管理</el-breadcrumb-item>
        <el-breadcrumb-item>客户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :params="params" />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
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
import Search from "../components/listclient/Search";
import Table from "../components/listclient/Table";
import Paging from "../components/listclient/Paging";

export default {
  name: "manager",
  components: { Search, Table, Paging},
  data() {
    return {
      params: { clientNick: "", clientname: "", pageNo: 1, pageSize: 20 },
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
      this.getClient(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getClient(this.params);
    },
    ...mapActions("listclient", {
      getClient: "getclientlist",
    }),

    subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };
      //发送请求
      this.getClient(this.params);
    },
  },
  beforeUpdate() {
    //显示加载状态
    this.$bus.$emit("ShowLoading", true);
  },
  computed: {
    ...mapState("listclient", { tableData: "ClientList" }),
  },
  //初始化请求
  mounted() {
    this.getClient(this.params);
    this.$bus.$on("subSearch", this.subSearch);
  },
  beforeDestroy() {
    this.$bus.$off([
      "subSearch",
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