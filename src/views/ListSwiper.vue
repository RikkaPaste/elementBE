<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :param="params" />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 删除组件 -->
      <Delete />
      <!-- 分页组件 -->
      <!-- 添加组件 -->
      <AddItem />
      <ImgPvw />
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
import Search from "../components/listswiper/Search";
import Table from "../components/listswiper/Table";
import Paging from "../components/listswiper/Paging";
import Delete from "../components/listswiper/Delete";
import AddItem from "../components/listswiper/AddItem";
import ImgPvw from "../components/listswiper/imgPvw";

export default {
  name: "manager",
  components: { Search, Table, Paging, Delete, AddItem,ImgPvw },
  data() {
    return {
      params: {
        imgurl: "",
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
      this.getListSwiper(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getListSwiper(this.params);
    },
    ...mapActions("listswiper", {
      getListSwiper: "getListSwiper",
      updListSwiper: "edit",
      delListSwiper: "delete",
    }),

    //搜索
    subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };
      //发送请求
      this.getListSwiper(this.params);
    },
    //修改状态
    changeChkStatus(list) {
      this.updListSwiper(list);
    },
    //删除轮播图列表
    async subDelListSwiper(data) {
      await this.delListSwiper(data);
      await this.getListSwiper(this.params);
    },

    //添加列表
    subAddListSwiper(data) {
      this.params = { ...this.params, ...data };
      this.getListSwiper( this.params);
    },
  },
  computed: {
    ...mapState("listswiper", { tableData: "listSwiper" }),
  },
  beforeUpdate() {
    this.$bus.$emit("ShowLoading", true);
  },
  //初始化请求
  mounted() {
    this.getListSwiper(this.params);
    this.$bus.$on("subSearch", this.subSearch);
    this.$bus.$on("changeChkStatus", this.changeChkStatus);
    this.$bus.$on("subDelListSwiper", this.subDelListSwiper);
    this.$bus.$on("getListSwiperArr", this.subAddListSwiper);
  },
  beforeDestroy() {
    this.$bus.$off([
      "subSearch",
      "changeChkStatus",
      "subDelListSwiper",
      "getListSwiperArr",
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