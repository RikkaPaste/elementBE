<template>
   <div>
    <el-dialog
      title="警告"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <span style="color: red">确定永久删除该权限吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "add",
  data() {
    return {
      menu: {},
      dialogFormVisible: false,
    };
  },
  methods: {
      
      subDel(){
        this.$bus.$emit('subDelMenu',this.menu.id);
        this.dialogFormVisible=false;
      }
  },
  mounted() {
    this.$bus.$on("delMenudia", (id) => {
      if(id)this.menu.id=id;
      this.dialogFormVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("delMenudia");
  },
};
</script>

<style lang="less" scoped>
.el-scrollbar__wrap {
  height: 50% !important;
}
</style>