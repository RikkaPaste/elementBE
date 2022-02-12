<template>
  <div>
    <el-row :gutter="20">
      <!-- span:设置列的宽度-->
      <el-col :span="8">
        <el-input
          v-model="queryParams.username"
          placeholder="用户名"
          clearable
          @clear="getList"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-input
          v-model="queryParams.email"
          placeholder="邮箱"
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
        username: "",
        email: "",
      },
    };
  },
  methods: {
    subadd() {
        this.$bus.$emit('subAddbia');
    },
    getList() {
      this.$bus.$emit("subSearch", this.queryParams);
    },
  },
  watch: {
    queryParams: {
      deep: true,
      handler(newv) {
        this.queryParams.username = this.queryParams.username.trim();
        this.queryParams.email = this.queryParams.email.trim();
        if (!newv.username.trim() && !newv.email.trim()) {
          this.getList();
        }
      },
    },
  },
};
</script>

<style>
</style>