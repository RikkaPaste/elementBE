<template>
  <div>
    <el-row :gutter="20">
      <!-- span:设置列的宽度-->
      <el-col :span="10">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="商品名"
          clearable
          @clear="getList"
        ></el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="getList" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button type="info" @click="subadd">添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
       queryParams: {
        goodsName: "",
      }
    };
  },
  methods: {
    subadd() {
        this.$router.push({path:"/goodsadd"});
    },
    getList() {
      this.$bus.$emit("subSearch", this.queryParams);
    },
  },
  watch: {
    queryParams: {
      deep: true,
      handler(newv) {
        this.queryParams.goodsName = this.queryParams.goodsName.trim();
        if (!newv.goodsName.trim()) {
          this.getList();
        }
      },
    },
  },
};
</script>

<style>
</style>