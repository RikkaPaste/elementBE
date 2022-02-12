<template>
  <div>
    <el-table
      :data="tableData.tableData"
      border
      stripe
      fit
      height="550"
      v-loading="loading"
      element-loading-text="拼命加载中......"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="clientname"></el-table-column>
      <el-table-column label="微信openid" prop="wxopenid"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "Table",
  props: ["tableData"],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    btnDetails(row) {
      this.$bus.$emit("setorderdia", row);
    },
  },
  mounted() {
    this.$bus.$on("ShowLoading", (flog) => {
      this.loading = flog;
    });
  },
  updated() {
    this.loading = false;
  },
  beforeDestroy() {
    this.$bus.$off("ShowLoading");
  },
  filters: {
    formatDate(value, str = "YYYY-MM-DD HH:mm:ss") {
      return dayjs(value).format(str);
    },
  },
  watch: {
    tableData: {
      deep: true,
      handler(newv) {
        // this.loading = false;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-row {
  margin-bottom: 5px;
}
</style>