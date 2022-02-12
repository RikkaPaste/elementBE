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
    >
      <el-table-column prop="id" label="序号" fixed="left"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="chkStatus" label="状态">
        <template slot-scope="props">
          <el-switch
            v-model="props.row.chkStatus"
            @change="changeChkStatus(props.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="rname" label="角色名"> </el-table-column>
      <el-table-column prop="address" label="操作" width="200" fixed="right">
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
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="btnRoles(scope.row.id)"
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
      this.$bus.$emit("onChangeStripe", {
        id: row.id,
        chkStatus: row.chkStatus ? 1 : 2,
      });
    },
    //编辑
    btnEdit(list) {
      this.$bus.$emit("subuserdia", true, list);
    },
    btnDel(id) {
      this.$bus.$emit("subdeldia", id);
    },
    btnRoles(id) {
      this.$bus.$emit("subgetrolesbia", id);
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
      },
    },
  },
};
</script>

<style>
</style>