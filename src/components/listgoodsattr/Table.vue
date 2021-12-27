<template>
  <div>
    <el-table
      :data="tableData"
     border stripe
      height="420"
      v-loading="loading"
      element-loading-text="拼命加载中......"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      row-key="id"
    >
      <el-table-column width="50" type="expand">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.attrVals"
            :key="index"
            closable
            :disable-transitions="true"
            @close="handleClose(scope.row, index)"
          >
            {{ item }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(scope.row)"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="参数名" prop="attrName"></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
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
            @click="btnDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Table",
  props: ["tableData"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions("listgoodsattr", {
      //修改
      updGoodsAttr: "editAttr",
    }),
    changeChkStatus(row) {
      this.$bus.$emit("changeChkStatus", row);
    },
    //参数编辑
    btnEdit(row) {
      this.$bus.$emit("subattrdia", row);
    },
    btnDel(row) {
      this.$bus.$emit("subdeldia", row);
    },
    showInput(row) {
      //必须在el-table标签上加 row-key="id"属性 才不会报错
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(row) {
      if (!row.inputValue.trim()) {
        row.inputVisible = false;
        row.inputValue = "";
        return;
      }
      row.attrVals.push(row.inputValue);
      row.inputVisible = false;
      row.inputValue = "";
      await this.updGoodsAttr({
        id: row.id,
        attrVals: row.attrVals.join("_"),
      });
      return false;
    },
    async handleClose(row, item) {
      row.attrVals.splice(item, 1);
      await this.updGoodsAttr({
        id: row.id,
        attrVals: row.attrVals.join("_"),
      });
    },
  },
  mounted() {
    this.$bus.$on("ShowLoading", (flog) => {
      this.loading = flog;
    });
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>