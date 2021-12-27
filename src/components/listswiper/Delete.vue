<template>
  <div>
     <el-dialog
      title="警告"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <span style="color: red">确定永久删除该列表吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name:'delete',
    data() {
        return {
            id:'',
            dialogFormVisible:false
        }
    },
    methods:{
        subDel(){
            this.$bus.$emit('subDelListSwiper',{id:this.id});
             this.dialogFormVisible=false;
        }
    },
    mounted() {
        this.$bus.$on('subdeldia',(id)=>{
            this.dialogFormVisible=true;
            this.id=id;
        })
    },
    beforeDestroy() {
        this.$bus.$off('subdeldia')
    },
}
</script>

<style>

</style>