<template>
  <div>
    <el-row :gutter="20">
      <!-- span:设置列的宽度-->
      <el-col :span="10">
        <el-input
          v-model="queryParams.order_number"
          placeholder="订单号"
          clearable
          @clear="getList"
        ></el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="getList" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-select v-model="value" placeholder="请选择" @change="select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      queryParams: {
        isSend: null,
        isCancel: 1,
        order_number: "",
        pageNo: 1,
        pageSize: 20,
      },
      value: "",
      options: [
        { value: "1", label: "待发货" },
        { value: "2", label: "已发货" },
        { value: "3", label: "申请/取消" },
      ],
    };
  },
  methods: {
    subadd() {
      this.$bus.$emit("addMenudia");
    },
    getList() {
      this.$bus.$emit("subSearch", this.queryParams);
    },
    select() {
      if (this.value == 1) {
        this.queryParams = {
          ...this.queryParams,
          ...{ isSend: 2, isCancel: null },
        };
      } else if (this.value == 2) {
        this.queryParams = {
          ...this.queryParams,
          ...{ isSend: 1, isCancel: null },
        };
      } else {
        this.queryParams = {
          ...this.queryParams,
          ...{ isSend: null, isCancel: 1 },
        };
      this.$bus.$emit("subSearch", this.queryParams);  
      }
    },
  },
  watch: {
    queryParams: {
      deep: true,
      handler(newv) {
        this.queryParams.order_number = this.queryParams.order_number.trim();
        if (!newv.order_number.trim()) {
          this.getList();
        }
      },
    },
  },
};
</script>

<style>
</style>