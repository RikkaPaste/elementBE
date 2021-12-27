<template>
  <div>
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :param="params" />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 编辑分类 -->
      <EditsGoodsCate />
      <!-- 删除分类 -->
      <Delete />
      <!-- 添加分类 -->
      <Adds :tableData="tableData" />
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
import Search from "../components/listgoodscate/Search";
import Table from "../components/listgoodscate/Table";
import Paging from "../components/listgoodscate/Paging";
import EditsGoodsCate from "../components/listgoodscate/EditsGoodsCate";
import Delete from "../components/listgoodscate/Delete";
import Adds from "../components/listgoodscate/Adds";

export default {
  name: "manager",
  components: { Search, Table, Paging, EditsGoodsCate, Delete, Adds },
  data() {
    return {
      params: {
        cateName: "",
        pageNo: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    //条数
    handleCurrentChange(val) {
      this.params.pageNo = val;
      this.getGoodsCate(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getGoodsCate(this.params);
    },
    ...mapActions("listgoodscate", {
      getGoodsCate: "getGoodsListCate",
      updGoodsCate: "edit",
      delGoodsCate: "delete",
      addGoodsCate: "add",
    }),

    //搜索
    subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };

      //发送请求
      this.getGoodsCate(this.params);
    },
    //编辑分类名
    async goodsEditCate(data) {
      await this.updGoodsCate(data);
      await this.getGoodsCate(this.params);
    },
    //删除分类名
    async goodsDelCate(cateid) {
      await this.delGoodsCate(cateid);
      await this.getGoodsCate(this.params);
    },
    //添加分类名
    async goodsAddCate(data) {
      await this.addGoodsCate(data);
      await this.getGoodsCate(this.params);
    },
  },
     beforeUpdate(){
    this.$bus.$emit("ShowLoading", true);
  },
  //初始化数据
  computed: {
    ...mapState("listgoodscate", { tableData: "goodsListCate" }),
  },
  //初始化请求
  mounted() {
    this.getGoodsCate(this.params);
    this.$bus.$on("subSearch", this.subSearch);
    this.$bus.$on("subEditGoodsCate", this.goodsEditCate);
    this.$bus.$on("subDelGoodsCate", this.goodsDelCate);
    this.$bus.$on("subAddGoodsCate", this.goodsAddCate);
  },
  beforeDestroy() {
    this.$bus.$off([
      "subSearch",
      "subEditGoodsCate",
      "subDelGoodsCate",
      "subAddGoodsCate",
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