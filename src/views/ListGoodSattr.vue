<template>
  <div style="width:100%">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品参数属性列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 头部组件 -->
      <Header />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 编辑分类 -->
      <EditsGoodsAttr />
      <!-- 删除分类 -->
      <Delete />
      <!-- 添加分类 -->
      <Adds :tableData="tableData" />
      <!-- 分页组件 -->
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "../components/listgoodsattr/Header";
import Table from "../components/listgoodsattr/Table";
import EditsGoodsAttr from "../components/listgoodsattr/EditsGoodsAttr";
import Delete from "../components/listgoodsattr/Delete";
import Adds from "../components/listgoodsattr/Adds";

export default {
  name: "manager",
  components: { Header, Table, EditsGoodsAttr, Delete, Adds },
  data() {
    return {};
  },
  methods: {
    ...mapActions("listgoodsattr", {
      //获取分类名
      getGoodsAttr: "getGoodsListAttr",
      //获取属性
      getGoodsAttrbute: "getGoodListAttribute",
      //添加
      addGoodsAttr: "addGoodsAttr",
      //修改
      updGoodsAttr: "editAttr",
      //删除
      delGoodsAttr: "deleteAttr",
    }),

    //查询请求
    goodsGetAttrbute(data) {
      //发送请求

      this.getGoodsAttrbute(data);
    },
    //编辑参数名
    async goodsEditAttrbute(data) {
      //先改后查
      await this.updGoodsAttr({
        id: data.id,
        attrName: data.attrName,
      });
      await this.getGoodsAttrbute({ catId: data.catId, attrSel: data.attrSel });
    },
    //删除参数名
    async goodsDelAttrbute(data) {
      await this.delGoodsAttr({ id: data.id });
      await this.getGoodsAttrbute({ catId: data.catId, attrSel: data.attrSel });
    },
    //添加参数名
    async goodsAddAttr(data) {
      await this.addGoodsAttr(data);
      await this.getGoodsAttrbute({ catId: data.catId, attrSel: data.attrSel });
    },
  },
    beforeUpdate(){
    this.$bus.$emit("ShowLoading", true);
  },
  //初始化数据
  computed: {
    ...mapState("listgoodsattr", { tableData: "goodsListAttribute" }),
  },
  //初始化请求
  mounted() {
    this.$bus.$on("subGetGoodsAttrbute", this.goodsGetAttrbute);
    this.$bus.$on("subAddGoodsAttrbute", this.goodsAddAttr);
    this.$bus.$on("subUpdGoodsAttrbute", this.goodsEditAttrbute);
    this.$bus.$on("subDelGoodsAttrbute", this.goodsDelAttrbute);
  },
  beforeDestroy() {
    this.$bus.$off([
      "subGetGoodsAttrbute",
      "subAddGoodsAttrbute",
      "subDelGoodsAttrbute",
      "subUpdGoodsAttrbute",
    ]);
    //销毁
    this.getGoodsAttrbute({ catId: null, attrSel: null });
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