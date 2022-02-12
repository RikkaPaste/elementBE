<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      width="35%"
    >
      <el-tree
        :data="powerlist"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="powers"
        @check="checkeds"
        ref="tree"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions } from "vuex";
export default {
  name: "privileges",
  data() {
    return {
      dialogFormVisible: false,
      powers: [],
      powerlist: {},
      id:'',
      selects: "",
      defaultProps: {
        children: "children",
        label: "menuname",
      },
    };
  },
  methods: {
    ...mapActions("listrole", {
      getPowerList: "getpowerlist",
      updRolesAndMenu: "rolesandmenu",
    }),
    cancel() {
      this.dialogFormVisible = false;
    },
    //拼接所有所选id
    checkeds() {
     let arr = [
        ...this.$refs.tree.getCheckedKeys(),
        ...this.$refs.tree.getHalfCheckedKeys()
      ]
      this.selects = arr.join("_");
    },
   async submitAdd() {
    await  this.updRolesAndMenu({roleid:this.id,idstr:this.selects});
      this.dialogFormVisible = false;
      //重定向
    //  this.$router.push({path:this.$router.history.current.path});
    await this.$bus.$emit('flush');
    this.selects='';
    },
  },
  async beforeMount() {
    //获取要分配的权限
    this.powerlist = (await this.getPowerList()).data;
  },
  mounted() {
    this.$bus.$on("getprivilegesdia", (list) => {
      this.id=list.id;
      this.dialogFormVisible = true;
      this.powers = [];
      for (let index = 0; index < list.children.length; index++) {
        for (let j = 0; j < list.children[index].children.length; j++) {
          this.powers.push(list.children[index].children[j].id);
        }
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off('getprivilegesdia');
  },
};
</script>

<style lang="less" scoped>
.el-dialog {
  height: 28%;
}
</style>