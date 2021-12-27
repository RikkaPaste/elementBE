<template>
  <div>
    <el-dialog title="添加管理员" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addForms"
      >
        <el-form-item prop="username" label="用户名:" :required="true">
          <el-input
            v-model="addFormModel.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passwd" label="密码:" :required="true">
          <el-input v-model="addFormModel.passwd" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="手机:">
          <el-input v-model="addFormModel.mobile" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱:">
          <el-input v-model="addFormModel.email" placeholder="邮箱"></el-input>
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
import {
  valiUserName,
  valiUserPhone,
  valiUserEmail,
  valiPass,
} from "../../util/regexp";
export default {
  name: "Adds",
  data() {
    return {
      dialogVisible: false,
      addFormModel: {
        email: "",
        mobile: "",
        passwd: "",
        username: "",
      },
      rules: {
        username: [{ validator: valiUserName, trigger: "blur" }],
        mobile: [{ validator: valiUserPhone, trigger: "blur" }],
        email: [{ validator: valiUserEmail, trigger: "blur" }],
        passwd: [{ validator: valiPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    addFormSubmit() {
      this.$refs.addForms.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("subAdd", this.addFormModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("subAddbia", () => {
      this.dialogVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("subAddbia");
  },
};
</script>

<style>
</style>