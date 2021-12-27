<template>
  <div>
    <el-dialog
      title="分配角色"
      width="35%"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form  label-width="80px" status-icon ref="formRef">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in tableroles"
            :key="item.roleName"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="edtFormSubmit">编辑</el-button>
        <el-button type="warning" @click="dialogFormVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Roles",
  props: ["tableroles"],
  data() {
    return {
      dialogFormVisible: false,
      id: "",
      value: "",
    };
  },
  methods: {
    edtFormSubmit() {
        if(this.value==""||this.value==undefined){
            this.$msg.error('请选择一个角色')
            return;
        }
     this.$bus.$emit('submitEdit',{id:this.id,roleid:this.value});
      this.dialogFormVisible = false;
      this.value='';
    },
  },
  mounted() {
    this.$bus.$on("subgetrolesbia", (id) => {
      this.id = id;
      this.dialogFormVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("subgetrolesbia");
  },
};
</script>

<style>
</style>