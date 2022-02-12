<template>
  <div>
    <el-row :gutter="20">
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
    };
  },
  methods: {
    subadd() {
        this.$bus.$emit('subAddbia');
    },
  },
};
</script>

<style>
</style>