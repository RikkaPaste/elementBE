<template>
  <div>
    <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="600px">
      <el-row :gutter="20">
        <el-col :span="8">订单号:{{ toviews.orderNumber }}</el-col>
        <el-col :span="8"
          >运单号:{{ toviews.expressNo ? toviews.expressNo : "无" }}</el-col
        >
        <el-col :span="8"
          >快递公司:{{
            toviews.expressCompany ? toviews.expressCompany : "无"
          }}</el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"
          >收货人名称:{{
            toviews.consigneeName ? toviews.consigneeName : "无"
          }}</el-col
        >
        <el-col :span="8"
          >收货人电话:{{
            toviews.consigneePhone ? toviews.consigneePhone : "无"
          }}</el-col
        >
        <el-col :span="8"
          >收货人地址:{{
            toviews.consigneeAddr ? toviews.consigneeAddr : "无"
          }}</el-col
        >
      </el-row>

      <el-table :data="toviews.goodsList" style="width: 100%;margin-top:15px" label>
        <el-table-column prop="id" label="序号" > </el-table-column>
        <el-table-column prop="goodsLogo" label="缩略图" >
        <template slot-scope="scope">
          <img :src="scope.row.goodsLogo|src" width="100%">
        </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名"> </el-table-column>
         <el-table-column prop="goodsPrice" label="价格"> </el-table-column>
         <el-table-column prop="goodsNumber" label="数量"> </el-table-column>
         <el-table-column prop="goodsTotalPrice" label="总计"> </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { valiMenuName, valiMenuPath } from "@/util/regexp";
export default {
  name: "edit",
  data() {
    return {
      toviews: {},
      dialogFormVisible: false,
      rules: {
        menuname: [{ validator: valiMenuName, trigger: "blur" }],
        menupath: [{ validator: valiMenuPath, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitEdit(f) {},
  },
  mounted() {
    this.$bus.$on("setorderdia", (toview) => {
      if (toview) {
        this.toviews = Object.assign({}, toview);
      }
      this.dialogFormVisible = true
    });
  },
  //销毁总线事件
  beforeDestroy() {
    this.$bus.$off("setorderdia");
  },
  filters: {
    src(src) {
      if (src !== "") {
        return "http://lqgapidemo.quechao.xyz/images/upload/prd/" + src;
      } else {
        return "noimg";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  padding: 10px 0px;
  border-bottom: 1px dashed rgba(78, 165, 177, 0.5);
  display: flex;
  align-items: center;
  justify-items: center;
  width:100%;
  white-space:normal;
}
</style>