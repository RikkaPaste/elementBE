<template>
  <div class="app">
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <!-- 搜索组件 -->
      <Search :param="params" />
      <!-- 表单格式 -->
      <Table :tableData="tableData" />
      <!-- 编辑商品 -->
      <EditsGoods />
      <!-- 编辑图片 -->
      <EditsItem />
      <!-- 编辑详情 -->
      <EditLabel />
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
import Search from "../components/listgoods/Search";
import Table from "../components/listgoods/Table";
import Paging from "../components/listgoods/Paging";
import EditsGoods from "../components/listgoods/EditsGoods";
import EditsItem from "../components/listgoods/EditsItem";
import EditLabel from "../components/listgoods/EditLabel";

export default {
  name: "manager",
  components: { Search, Table, Paging, EditsGoods, EditsItem, EditLabel },
  data() {
    return {
      params: {
        goodsName: "",
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
      this.getGoods(this.params);
    },
    //改变页数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getGoods(this.params);
    },
    ...mapActions("listgoods", {
      getGoods: "getGoodsList",
      updGoods: "edit",
      updGoodsLabel: "editlabel",
    }),

    //搜索
    subSearch(data) {
      //展开赋值
      this.params = { ...this.params, ...data };
      //发送请求
      this.getGoods(this.params);
    },
    //修改状态
    changeChkStatus(list) {
      this.updGoods(list);
    },

    //编辑商品
    async goodsEdit(data) {
      await this.updGoods(data);
      await this.getGoods(this.params);
    },
    //编辑详情
    async goodsEditLabel(data) {
      await this.updGoodsLabel(data);
      await this.getGoods(this.params);
    },
  },
  computed: {
    ...mapState("listgoods", { tableData: "goodsList" }),
  },
  //更新之前渲染
  beforeUpdate() {
    this.$bus.$emit("ShowLoading", true);
  },
  //初始化请求
  mounted() {
    this.getGoods(this.params);
    this.$bus.$on("subSearch", this.subSearch);
    this.$bus.$on("changeChkStatus", this.changeChkStatus);
    this.$bus.$on("submitGoodsEdit", this.goodsEdit);
    this.$bus.$on('goodsEditLabel',this.goodsEditLabel);
  },
  beforeDestroy() {
    this.$bus.$off(["subSearch", "changeChkStatus", "submitGoodsEdit","goodsEditLabel"]);
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