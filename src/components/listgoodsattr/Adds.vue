<template>
  <div>
    <el-dialog title="添加分类" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="formModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addForms"
      >
        <el-form-item prop="attrName" label="参数名:" :required="true">
          <el-input
            v-model="formModel.attrName"
            placeholder="参数名"
          ></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button type="primary" @click="addFormSubmit">添加</el-button>
        <el-button type="warning" @click="dialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { valiAttrName } from "../../util/regexp";
export default {
  name: "Adds",
  data() {
    let _self = this;
    return {
      cascaderSelectId: 0,
      dialogVisible: false,
      formModel: {
        attrSel: "",
        catId: "",
        attrWrite: "",
        attrName: "",
        cateLevel: 0,
      },
      rules: {
        attrName: [{ validator: valiAttrName, trigger: "blur" }],
      },
    };
  },
  methods: {
    addFormSubmit() {
      this.$refs.addForms.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("subAddGoodsAttrbute", this.formModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("subAddbia", (row) => {
      this.dialogVisible = true;
      this.formModel=Object.assign({},row);
    });
  },
  beforeDestroy() {
    this.$bus.$off("subAddbia");
  },
};
</script>

<style lang='less' scoped>
</style>