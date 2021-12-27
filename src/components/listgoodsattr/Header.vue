<template>
  <div style="text-align: left">
    <el-alert
      title="注意！只允许为第三级分类设置参数属性"
      type="warning"
      :closable="false"
      show-icon
      style="margin-bottom: 16px"
    >
    </el-alert>
    <el-row>
      <el-col>
        <span>选择商品分类: </span>
        <el-cascader
          :props="goodsCateProps"
          clearable
          v-model="cascaderSelectId"
          @change="cascaderChange"
          size="medium"
          :show-all-levels="false"
        ></el-cascader>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first"></el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      :disabled="isButtonDisable"
      size="mini"
      @click="add"
      >添加参数</el-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    let _self = this;
    return {
      activeName: "first",
      cascaderSelectId: 0,
      isButtonDisable: true,
      goodsCateProps: {
        lazy: true,
        checkStrictly: false,
        emitPath: false,
        expandTrigger: "hover",
        lazyLoad(node, resolve) {
          const { level, data } = node;
          let id = data ? data.value : 0;
          _self.formModel.cateLevel = level * 1;
          if (level == 3) {
            resolve([]);
            return false;
          }
          _self.getGoodsAttr({ pid: id }).then(function (data) {
            const nodes = data.data.map((item) => ({
              value: item.id,
              label: `${item.cateName}`,
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          });
        },
      },
      formModel: {
        attrSel: 2,
        catId: 0,
        attrWrite: 2,
        attrName: undefined,
      },
      dynamicsAttr: [],
    };
  },
  methods: {
    ...mapActions("listgoodsattr", {
      //获取分类名
      getGoodsAttr: "getGoodsListAttr",
    }),

    cascaderChange() {
      if (this.cascaderSelectId) {
        this.$bus.$emit("subGetGoodsAttrbute", {
          catId: this.cascaderSelectId,
          attrSel: this.formModel.attrSel,
        });
      }
    },
    async getByCateIdAndSel() {},
    add() {
        this.$bus.$emit('subAddbia',this.formModel);
    },
  },
  watch: {
    cascaderSelectId: {
      deep: true,
      handler(newv) {
        if (newv) {
          this.isButtonDisable = false;
        } else {
          this.isButtonDisable = true;
          //清空
          this.$bus.$emit("subGetGoodsAttrbute", {
          catId:"",
          attrSel:""
        });
        }
        this.formModel.catId=newv;
      },
    },
    
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.el-col {
  text-align: left;
}
.el-button {
  margin-bottom: 20px;
}
</style>