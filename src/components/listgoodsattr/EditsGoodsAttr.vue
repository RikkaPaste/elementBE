<template>
  <div>
    <el-dialog title="编辑动态参数" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="attrName" label="属性名:" :required="true">
          <el-input
            v-model="addFormModel.attrName"
            placeholder="属性名"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span>
        <el-button type="primary" @click="addFormSubmit">编辑</el-button>
        <el-button type="warning" @click="dialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { valiGoodsAttr} from "../../util/regexp";
export default {
  name: "Edits",
  data() {
    return {
      dialogVisible: false,
      addFormModel: [],
      rules: {
        attrName: [{ validator: valiGoodsAttr, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$bus.$on("subattrdia", (list) => {
      if (list) {
        this.addFormModel = Object.assign({}, list);
      }
      this.dialogVisible = true;
    });
  },
  methods: {
    addFormSubmit() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("subUpdGoodsAttrbute", this.addFormModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("subattrdia");
  },
};
</script>

<style>
</style>