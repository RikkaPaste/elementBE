<template>
  <div>
     <el-footer>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="20"
        :total="tableData.count"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
export default {
  name:'Paging',
  props:['tableData'],
  methods:{
    handleCurrentChange(v){
      this.$emit('handleCurrentChange',v);
    },
    handleSizeChange(v){
      this.$emit('handleSizeChange',v);
    }
  },
  mounted() {
  },
}
</script>

<style lang='less' scoped>
.el-footer{
 margin-top:20px;
}
</style>