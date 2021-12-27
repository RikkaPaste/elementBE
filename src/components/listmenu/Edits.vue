<template>
  <div>
    <el-dialog title="编辑权限" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="menuname" label="角色名:" :required="true">
          <el-input
            v-model="addFormModel.menuname"
            placeholder="角色名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="menupath" label="路径:" :required="true">
          <el-input
            v-model="addFormModel.menupath"
            placeholder="角色名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="menuicon" label="图标:">
          <el-input
            v-model="addFormModel.menuicon"
            placeholder="图标"
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
import { valiMenuName,valiMenuPath} from "../../util/regexp";
export default {
  name: "Edits",
  data() {
    return {
      dialogVisible: false,
      addFormModel: [],
      rules: {
        menuname: [{ validator: valiMenuName, trigger: "blur" }],
        menupath: [{ validator: valiMenuPath, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$bus.$on("subeditdia", (list) => {
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
          this.$bus.$emit("subEditMenu", this.addFormModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  beforeDestroy() {
    this.$bus.$off("subeditdia");
  },
};
</script>

<style>
</style>