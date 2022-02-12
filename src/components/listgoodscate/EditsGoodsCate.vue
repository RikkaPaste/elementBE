<template>
  <div>
    <el-dialog title="编辑分类" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="cateName" label="分类名:" :required="true">
          <el-input
            v-model="addFormModel.cateName"
            placeholder="分类名"
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
import {valiCateName} from "../../util/regexp";
export default {
  name: "Edits",
  data() {
    return {
      dialogVisible: false,
      addFormModel: [],
      rules: {
        cateName: [{ validator: valiCateName, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$bus.$on("subcatedia", (list) => {
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
          this.$bus.$emit("subEditGoodsCate", this.addFormModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("subcatedia");
  },
};
</script>

<style>
</style>