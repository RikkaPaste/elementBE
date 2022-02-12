<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :params="params" />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 编辑商品 -->
      <ToView />
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
import Search from "../components/listorder/Search";
import Table from "../components/listorder/Table";
import Paging from "../components/listorder/Paging";
import ToView from "../components/listorder/ToView";

export default {
  name: "manager",
  components: { Search, Table, Paging,ToView },
  data() {
    return {
      params: {
        isSend: null,
        isCancel: null,
        order_number: "",
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
      this.getOrder(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getOrder(this.params);
    },
    ...mapActions("listorder", {
      getOrder: "getorderlist",
      addOrder: "add",
      updOrder: "edit",
      delOrder: "delete",
    }),

    subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };
      //发送请求
      this.getOrder(this.params);
    },
    //编辑角色
    async OrderEdit(data) {
      await this.updOrder(data);
      await this.getOrder(this.params);
    },
    //添加角色
    async OrderAdd(data) {
      await this.addOrder(data);
      await this.getOrder(this.params);
    },
    //删除角色名
    async OrderDel(id) {
      await this.delOrder({ id: id });
      await this.getOrder(this.params);
    },
  },
  beforeUpdate() {
    //显示加载状态
    this.$bus.$emit("ShowLoading", true);
  },
  computed: {
    ...mapState("listorder", { tableData: "OrderList" }),
  },
  //初始化请求
  mounted() {
    this.getOrder(this.params);
    this.$bus.$on("subSearch", this.subSearch);
    this.$bus.$on("subAddOrder", this.OrderAdd);
    this.$bus.$on("subEditOrder", this.OrderEdit);
    this.$bus.$on("subDelOrder", this.OrderDel);
  },
  beforeDestroy() {
    this.$bus.$off([
      "subSearch",
      "subAddOrder",
      "subEditOrder",
      "subDelOrder"
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