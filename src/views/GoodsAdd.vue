<template>
  <div>
    <el-header style="text-align: right; font-size: 12px; height: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/listorder' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
		<el-breadcrumb-item :to="{ path: '/listgoods' }">商品列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        :closable="false"
        center
        show-icon
        style="margin-bottom: 16px"
      ></el-alert>
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品logo"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs
        :before-leave="beforeTabLeave"
        :tab-position="'left'"
        style="height: 68vh; margin: 10px"
        @tab-click="select"
      >
        <el-tab-pane label="基本信息">
          <Gi @setAddForms="setAddForms" @setRules="setRules" />
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <Ca @setAddForms="setAddForms" />
        </el-tab-pane>
        <el-tab-pane label="商品logo">
          <Clogo @setAddForms="setAddForms" />
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <Cimg @setAddForms="setAddForms" />
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <Ccontent @setAddForms="setAddForms" @addGoods="addGoods" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Gi from "../components/goodsadd/Gi";
import Ca from "../components/goodsadd/Ca";
import Clogo from "../components/goodsadd/Clogo";
import Cimg from "../components/goodsadd/Cimg";
import Ccontent from "../components/goodsadd/Ccontent";
import { mapActions } from "vuex";
export default {
  name: "Goodsadd",
  components: { Gi, Ca, Clogo, Cimg, Ccontent },
  data() {
    return {
      active: 0,
      addForms: {
        goodsName: "",
        goodsPrice: 0.0,
        goodsWeight: "",
        goodsNumber: "",
        pics: [],
        goodsDesc: "",
        goodsCate: "",
        attrs: [],
        goodsSmallLogo: {},
        dynamicParam: [],
        staticAttr: [],
      },
      rules: undefined,
    };
  },
  methods: {
    ...mapActions("goodsadd", {
      addGoodss: "goodsadd",
    }),
    select(tab, event) {
      //控制步骤条在第一页所有商品信息填写完毕之后放行
      this.rules.addFormRef.validate((valid) => {
        if (valid) {
          //换取选中的步骤条
          if (tab.index >= 2 && tab.index <= 4) {
            this.active = tab.index * 1 + 1;
          } else {
            this.active = tab.index * 1;
          }
        }else{
          //默认停留第一页填写商品信息
           this.active=0;
        }
      })
    },
    beforeTabLeave(activeName, oldActiveName) {
      let flog;
      //控制页签必须填写完毕进行下一步操作
      if (activeName != 0) {
        //判断输入框是否填写完整
        this.rules.addFormRef.validate((valid) => {
          if (!valid) {
            this.$msg({
              message: "请确保所有必填项填写完整方可进行下一步操作",
              type: "warning",
            });
            flog = false;
          } else {
            flog = true;
          }
        });
        return flog;
      }
    },
    //存取商品信息dom实例
    setRules(rules) {
      this.rules = rules;
    },
    setAddForms(list) {
      this.addForms = { ...this.addForms, ...list };
    },
    async addGoods() {
      //添加商品并跳转
      await this.addGoodss(this.addForms);
      await this.$router.push({ path: "/listgoods" });
    },
  }
};
</script>

<style lang="less" scoped>
.el-card {
  height: 94vh;
}
</style>