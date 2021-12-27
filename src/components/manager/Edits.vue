<template>
  <div>
    <el-dialog title="编辑管理员" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="username" label="用户名:" :required="true">
          <el-input
            v-model="addFormModel.username"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机:">
          <el-input
            v-model="addFormModel.mobile"
            placeholder="手机"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:">
          <el-input
            v-model="addFormModel.email"
            placeholder="邮箱"
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
import { valiUserName, valiUserPhone, valiUserEmail } from "../../util/regexp";
export default {
  name: "Edits",
  data() {
    return {
      dialogVisible: false,
      addFormModel: [],
      rules: {
        username: [{ validator: valiUserName, trigger: "blur" }],
        mobile: [{ validator: valiUserPhone, trigger: "blur" }],
        email: [{ validator: valiUserEmail, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$bus.$on("subuserdia", (flog, list) => {
      if (list) {
        this.addFormModel = Object.assign({}, list);
      }
      this.dialogVisible = flog;
    });
  },
  methods: {
    addFormSubmit() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("submitEdit", this.addFormModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("subuserdia");
  },
};
</script>

<style>
</style>