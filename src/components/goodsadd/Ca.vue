<template>
  <div>
    <!-- 判断是否为空对象 -->
    <el-form v-if="JSON.stringify(dynamicParam) != '{}'">
      <el-form-item
        :label="item.attrName"
        v-for="item in dynamicParam"
        :key="item.id"
        position="top"
      >
        <el-checkbox-group v-model="item.attrVals">
          <el-checkbox
            :label="val"
            v-for="(val, i) in item.attrVals"
            :key="i"
            border
            @change="checkboxChange"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-alert
      v-else
      title="请选择商品/所选商品没有可添加的参数"
      type="info"
      :closable="false"
      center
      show-icon
      style="margin-bottom: 16px"
    >
    </el-alert>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Ca",
  data() {
    return {
      addFormModel: {
        dynamicParam: [],
      },
      dynamicParam: {},
    };
  },
  methods: {
    ...mapActions("goodsadd", {
      //获取属性
      getGoodsAttrbute: "getGoodListAttribute",
    }),
    checkboxChange() {},
  },
  computed: {
    ...mapState("goodsadd", { tableData: "goodsListAttribute" }),
  },
  mounted() {
    this.$bus.$on("showCa", async (list) => {
      await this.getGoodsAttrbute(list);
      //渲染
      this.dynamicParam = Object.assign({}, this.tableData);
      //格式化变量
      this.addFormModel.dynamicParam=[];
       this.goodsCate=[];
       //筛选需要的属性值
      this.tableData.forEach((item) => {
        const newObj = {
          attrId: item.id,
          attrValue: item.attrVals.join("_"),
          attrName: item.attrName,
        };
        this.addFormModel.dynamicParam.push(newObj);
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("showCa");
  },
  watch: {
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
  padding-left: 40px;
}

.el-checkbox {
  margin: 0 5px 0 0 !important;
}
.el-form {
  margin: 50px;
}
.el-alert {
  margin: calc((100vh * 0.5) - 187px) auto;
}
</style>