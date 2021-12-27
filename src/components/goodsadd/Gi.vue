<template>
  <div>
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
          placeholder="商品名格式:品牌名 商品特征简要描述"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="goodsPrice" label="价格:" :required="true">
        <el-input
          v-model="addFormModel.goodsPrice"
          placeholder="价格 如:100.00"
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
      <el-form-item label="父级分类:">
        <el-cascader
          :props="props"
          clearable
          v-model="cascaderSelectId"
          @change="cascaderChange"
          size="medium"
          :show-all-levels="true"
          ref="cserve"
        ></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  valiGoodsPrice,
  valiGoodsNumber,
  valiGoodsName,
  valiGoodsWeight,
} from "../../util/regexp";

import { mapActions } from "vuex";
export default {
  name: "Ccontent",
  data() {
    let _self = this;
    return {
      addFormModel: {
        goodsName: "",
        goodsPrice: 0,
        goodsNumber: 0,
        goodsWeight: 0,
        goodsCate: "",
      },
      formmodel: {
        attrSel: 2,
        catId: 0,
        cateLevel: 1,
      },
      cascaderSelectId: 0,
      rules: {
        goodsName: [{ validator: valiGoodsName, trigger: "blur" }],
        goodsNumber: [{ validator: valiGoodsNumber, trigger: "blur" }],
        goodsPrice: [{ validator: valiGoodsPrice, trigger: "blur" }],
        goodsWeight: [{ validator: valiGoodsWeight, trigger: "blur" }],
      },
      props: {
        lazy: true,
        checkStrictly: false,
        emitPath: false,
        expandTrigger: "hover",
        lazyLoad(node, resolve) {
          const { level, data } = node;
          let id = data ? data.value : 0;
          _self.formmodel.cateLevel = level * 1 + 1;
          if (level == 3) {
            resolve([]);
            return false;
          }
          _self.getLevel({ pid: id }).then(function (data) {
            const nodes = data.data.map((item) => ({
              value: item.id, //主键
              label: `${item.cateName}`, //分类名
            }));
            resolve(nodes);
          });
        },
      },
    };
  },
  methods: {
    ...mapActions("listgoodscate", {
      getLevel: "getLevel",
    }),

    cascaderChange() {
      if (this.cascaderSelectId === null) {
        this.formmodel.catId = 0;
        this.formmodel.cateLevel = 1;
      } else {
        this.formmodel.catId = this.cascaderSelectId;
      }
      //拼接  获取选中的级联所对应id
      this.addFormModel.goodsCate = this.$refs.cserve
        .getCheckedNodes()[0]
        .path.join("_");
    },
  },
  mounted() {
    this.$emit("setRules", this.$refs);
  },
  watch: {
    formmodel: {
      deep: true,
      handler(newv) {
        this.$bus.$emit("showCa", {
          catId: this.formmodel.catId,
          attrSel: this.formmodel.attrSel,
        });
      },
    },
    addFormModel: {
      deep: true,
      handler(newv) {
        this.$emit("setAddForms", this.addFormModel);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin: 50px;
}
.el-cascader {
  text-align: left;
}
</style>