<template>
  <div>
    <el-table
      :data="tableData.tableData"
      border
      stripe
      fit
      height="550"
      v-loading="loading"
      element-loading-text="拼命加载中......"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
         <el-table-column label="序号" prop="id" fixed="left"></el-table-column>
        <el-table-column label="缩略图" prop="goodsSmallLogo" >
          <template slot-scope="scope">
            <img :src="scope.row.goodsSmallLogo|src" style="width:100%"/>
          </template>
        </el-table-column>
        <el-table-column label="商品名" prop="goodsName"></el-table-column>
        <el-table-column label="价格" prop="goodsPrice"></el-table-column>
        <el-table-column label="重量" prop="goodsWeight"></el-table-column>
        <el-table-column label="数量" prop="goodsNumber" ></el-table-column>
        <el-table-column label="上/下架" prop="chkStatus" >
          <template slot-scope="scope">
            <el-switch @change="changeChkStatus({chkStatus:scope.row.chkStatus,id:scope.row.id})"
             :active-value="1"
              :inactive-value="2"
             v-model="scope.row.chkStatus"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否首页" prop="isLayout" >
          <template slot-scope="scope">
            <el-switch @change="changeChkStatus({isLayout:scope.row.isLayout,id:scope.row.id})"
             :active-value="1"
              :inactive-value="2"
             v-model="scope.row.isLayout"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="createdAt" >
            <template slot-scope="scope">
                {{scope.row.createdAt | formatDate}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-dropdown size="small" >
            <span class="el-dropdown-link">
              选择操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span style="display:block;" 
                  @click="btnEdit(scope.row)">基本编辑</span>
              </el-dropdown-item>
              <el-dropdown-item >
                <span style="display:block;" 
                  @click="btnEditLogo(scope.row)">编辑头像</span></el-dropdown-item>
              <el-dropdown-item >
                <span style="display:block;" 
                  @click="btnEditDetail(scope.row.id)">编辑详情</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: "Table",
  props: ["tableData"],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    changeChkStatus(row) {
      this.$bus.$emit("changeChkStatus",row);
    },
    //商品编辑
    btnEdit(row){
    this.$bus.$emit('subuserdia',row);
    },
    //编辑
    btnEditLogo(row){
      this.$bus.$emit('subedititemdia',row);
    },
    btnEditDetail(id){
      this.$bus.$emit('subeditlabeldia',id);
    }
  },
  mounted() {
    this.$bus.$on("ShowLoading", (flog) => {
      this.loading = flog;
    });
  },
  filters:{
    src(src){
      return 'http://lqgapidemo.quechao.xyz/images/upload/prd/'+src;
    },
    formatDate(value, str = 'YYYY-MM-DD HH:mm:ss') {
                return dayjs(value).format(str);
    }
  },
  updated() {
    // this.loading = false;
  },
  beforeDestroy() {
    this.$bus.$off("ShowLoading");
  },
  watch: {
    tableData: {
      deep: true,
      handler(newv) {
        this.loading = false;
      },
    },
  },
};
</script>

<style lang="less" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>