<template>
  <div>
    <el-table
      :data="tableData.rows"
      border
      stripe
      fit
      height="550"
      v-loading="loading"
      element-loading-text="拼命加载中......"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="#" width="50" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="cateName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="btnEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="btnDel(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
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
    //商品编辑
    btnEdit(row) {
      this.$bus.$emit("subcatedia", row);
    },
    //删除
    btnDel(id) {
      this.$bus.$emit("subdeldia", id);
    },
  },
  mounted() {
    this.$bus.$on("ShowLoading", (flog) => {
      this.loading = flog;
    });
  },
  filters: {
    src(src) {
      return "https://api.rikkas.xyz/images/upload/prd/" + src;
    },
    formatDate(value, str = "YYYY-MM-DD HH:mm:ss") {
      return dayjs(value).format(str);
    },
  },
  updated() {
    // this.loading = false;
  },
  beforeDestroy() {
    this.$bus.$off("ShowLoading");
  },
  watch: {
    tableData: {
      deep: true,
      handler(newv) {
        this.loading = false;
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
</style>