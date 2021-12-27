<template>
  <div>
    <el-row :gutter="20">
      <!-- span:设置列的宽度-->
      <el-col :span="10">
        <el-input
          v-model="queryParams.clientname"
          placeholder="用户名"
          clearable
          @clear="getList"
        ></el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="getList" icon="el-icon-search"
          >搜索</el-button
        >
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
        clientname:''
      },
    };
  },
  methods: {
    subadd() {
      this.$bus.$emit("addMenudia");
    },
    getList() {
      this.$bus.$emit("subSearch", this.queryParams);
    }
  },
  watch: {
    queryParams: {
      deep: true,
      handler(newv) {
        this.queryParams.clientname = this.queryParams.clientname.trim();
        if (!newv.clientname.trim()) {
          this.getList();
        }
      },
    },
  },
};
</script>

<style>
</style>