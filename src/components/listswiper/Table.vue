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
      <el-table-column label="序号" prop="id" fixed="left" width="50"></el-table-column>
      <el-table-column label="图片预览" prop="imgurl">
        <template slot-scope="scope">
          <img
            :src="scope.row.imgurl | src"
            style="width: 100%"
            @click="imgShow(scope.row.imgurl)"
          />
        </template>
      </el-table-column>
      <el-table-column label="图片路径" prop="imgurl">
        <template slot-scope="scope">
          {{ scope.row.imgurl | src }}
        </template>
      </el-table-column>
      <el-table-column label="导航路径" prop="naviurl"></el-table-column>
      <el-table-column label="创建时间" prop="createdAt">
        <template slot-scope="scope">
          {{ scope.row.createdAt | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="chkStatus">
        <template slot-scope="scope">
          <el-switch
            @change="
              changeChkStatus({
                chkStatus: scope.row.chkStatus,
                id: scope.row.id,
              })
            "
            :active-value="1"
            :inactive-value="2"
            v-model="scope.row.chkStatus"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
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
    changeChkStatus(row) {
      this.$bus.$emit("changeChkStatus", row);
    },
    //删除
    btnDel(id) {
      this.$bus.$emit("subdeldia", id);
    },
    imgShow(url) {
      this.$bus.$emit("subimgshowdia", url);
    },
  },
  mounted() {
    this.$bus.$on("ShowLoading", (flog) => {
      this.loading = flog;
    });
  },
  filters: {
    src(src) {
      return "http://lqgapidemo.quechao.xyz/images/upload/rootswiper/" + src;
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