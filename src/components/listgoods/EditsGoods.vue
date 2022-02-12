<template>
  <div>
    <el-dialog title="商品编辑" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="goodsName" label="商品名:" :required="true">
          <el-input
            v-model="addFormModel.goodsName"
            placeholder="商品名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="goodsPrice" label="价格:" :required="true">
          <el-input
            v-model="addFormModel.goodsPrice"
            placeholder="价格"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="goodsNumber" label="库存:" :required="true">
          <el-input
            v-model="addFormModel.goodsNumber"
            placeholder="库存"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="goodsWeight" label="重量(克):" :required="true">
          <el-input
            v-model="addFormModel.goodsWeight"
            placeholder="重量"
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
import { valiGoodsPrice, valiGoodsNumber, valiGoodsName ,valiGoodsWeight} from "../../util/regexp";
export default {
  name: "Edits",
  data() {
    return {
      dialogVisible: false,
      addFormModel: [],
      rules: {
        goodsName: [{ validator: valiGoodsName, trigger: "blur" }],
        goodsNumber: [{ validator: valiGoodsNumber, trigger: "blur" }],
        goodsPrice: [{ validator: valiGoodsPrice, trigger: "blur" }],
        goodsWeight: [{ validator: valiGoodsWeight, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.$bus.$on("subuserdia", (list) => {
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
          this.$bus.$emit("submitGoodsEdit", this.addFormModel);
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