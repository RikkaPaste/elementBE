<template>
  <div>
    <el-dialog title="添加角色" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="roleName" label="角色名:" :required="true">
          <el-input
            v-model="addFormModel.roleName"
            placeholder="角色名"
            clearable
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
import { valiRoleName } from "../../util/regexp";
export default {
  name: "Edits",
  data() {
    return {
      dialogVisible: false,
      addFormModel: { role_name: "", roleName: "" },
      rules: {
        roleName: [{ validator: valiRoleName, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$bus.$on("subAddbia", () => {
      this.dialogVisible = true;
    });
  },
  methods: {
    addFormSubmit() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("subAddRole", this.addFormModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("subAddbia");
  },
};
</script>

<style>
</style>