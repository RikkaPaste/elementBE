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
      ><el-table-column label="" width="50" type="expand">
        <template slot-scope="scope">
          <el-row
            :class="['border-bottom', i === 0 ? 'border-top' : '']"
            v-for="(item, i) in scope.row.children"
            :key="item.id"
          >
            <el-col :span="5"
              ><el-tag>{{ item.menuname }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row v-for="(obj) in item.children" :key="obj.id">
                <el-col
                  ><el-tag type="success">{{ obj.menuname }}</el-tag></el-col
                >
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="角色名" prop="roleName"></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
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
            @click="btnRoles(scope.row)"
          >分配权限</el-button>
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
      this.$bus.$emit("subdeldia", id);
    },
    //编辑
    btnEdit(row) {
      this.$bus.$emit("subeditdia", row);
    },
    //分配角色
    btnRoles(row){
      this.$bus.$emit("getprivilegesdia", row);
    }
  },
  mounted() {
    this.$bus.$on("ShowLoading", (flog) => {
      this.loading = flog;
    });
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

.el-row{
    margin-bottom: 5px;
}
</style>