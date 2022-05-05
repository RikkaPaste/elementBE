<template>
  <el-dialog title="预览" :visible.sync="dialogFormVisible" width="45%" center>
    <img :src="url | src" style="width: 80%; margin: auto; display: flex" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false"
        >确定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "imgPvw",
  data() {
    return {
      dialogFormVisible: false,
      url: "",
    };
  },
  mounted() {
    this.$bus.$on("subimgshowdia", (url) => {
      this.dialogFormVisible = true;
      this.url = url;
    });
  },
  beforeDestroy() {
    this.$bus.$off("subimgshowdia");
  },
  filters: {
    src(src) {
      return "https://api.rikkas.xyz/images/upload/rootswiper/" + src;
    },
  },
};
</script>

<style lang="less" scoped>
</style>