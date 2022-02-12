<template>
  <div>
    <el-row :gutter="20">
      <!-- span:设置列的宽度-->
      <el-col :span="10">
        <el-input
          v-model="queryParams.imgurl"
          placeholder="图片地址"
          clearable
          @clear="getList"
        ></el-input>
      </el-col>
      <el-col :span="2.5">
        <el-button type="primary" @click="getList" icon="el-icon-search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button type="info" @click="subadd">添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
       queryParams: {
        imgurl: "",
      }
    };
  },
  methods: {
    subadd() {
        this.$bus.$emit('subAddbia');
    },
    getList() {
      this.$bus.$emit("subSearch", this.queryParams);
    },
  },
  watch: {
    queryParams: {
      deep: true,
      handler(newv) {
        this.queryParams.imgurl = this.queryParams.imgurl.trim();
        let src="http://lqgapidemo.quechao.xyz/images/upload/rootswiper/";
        if (!newv.imgurl.trim()) {
          this.getList();
        }
        if(newv.imgurl.indexOf(src)!=-1){
            this.queryParams.imgurl=newv.imgurl.substring(src.length+1,newv.imgurl.length);
        }
      },
    },
  },
};
</script>

<style>
</style>