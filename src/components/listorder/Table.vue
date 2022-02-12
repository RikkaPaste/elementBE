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
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="订单编号" prop="orderNumber"></el-table-column>
      <el-table-column label="订单价格" prop="orderPrice"></el-table-column>
      <el-table-column label="是否发货" prop="isSend">
        <template slot-scope="scope">
          <span v-if="scope.row.isSend == 1">已发货</span>
          <span v-if="scope.row.isSend == 2">未发货</span>
          <span v-else>已完成</span>
        </template>
      </el-table-column>
      <el-table-column label="是否取消" prop="isCancel">
        <template slot-scope="scope">
          <span v-if="scope.row.isCancel == 1">已取消</span>
          <span v-if="scope.row.isCancel == 2">未取消</span>
          <span v-else>已申请</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" prop="createdAt">
        <template slot-scope="scope">
          {{ scope.row.createdAt | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" fixed="right">
        <template slot-scope="scope">
            <el-dropdown size="small" >
            <span class="el-dropdown-link">
              选择操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span style="display:block;" 
                  @click="btnDetails(scope.row)">订单详情</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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