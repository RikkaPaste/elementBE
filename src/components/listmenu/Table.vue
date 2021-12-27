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
      <el-table-column label="权限名" prop="menuname"></el-table-column>
      <el-table-column label="路径" prop="menupath"></el-table-column>
      <el-table-column label="级别" prop="menuLevel">
        <template slot-scope="scope">
            <el-tag v-if="scope.row.menuLevel==1">一级</el-tag>
            <el-tag v-else-if="scope.row.menuLevel==2" type="success">二级</el-tag>
            <el-tag v-else type="danger">三级</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" fixed="right">
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
export default {
  name: "Table",
  props: ["tableData"],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    changeChkStatus(row) {
      this.$bus.$emit("changeChkStatus", row);
    },
    //删除
    btnDel(id) {
      this.$bus.$emit("delMenudia", id);
    },
    //编辑
    btnEdit(row) {
      this.$bus.$emit("subeditdia", row);
    },
    //分配角色
    btnRoles(row) {
      this.$bus.$emit("getprivilegesdia", row);
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