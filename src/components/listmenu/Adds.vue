<template>
  <div>
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible" width="35%">
      <el-form
        :model="menus"
        status-icon
        label-width="100px"
        ref="form"
        :rules="rules"
      >
        <el-form-item label="权限名:" :required="true" prop="menuname">
          <el-input
            v-model="menus.menuname"
            autocomplete="off"
            placeholder="权限名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="路径:" :required="true" prop="menupath">
          <el-input
            v-model="menus.menupath"
            autocomplete="off"
            placeholder="路径"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="图标:" prop="menuicon">
          <el-input
            v-model="menus.menuicon"
            autocomplete="off"
            placeholder="图标"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="父级权限:">
          <el-cascader
            :change-on-select="true"
            :props="props"
            v-model="menus.parentid"
            @change="cascaderChange"
            clearable
            size="medium"
            ref="cascader"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { valiMenuName, valiMenuPath } from "@/util/regexp";
import { mapActions } from "vuex";
export default {
  name: "add",
  data() {
    let _self = this;
    return {
      menus: {
        menuname: "",
        parentid: 0,
        menupath: "",
        menuLevel: 1,
        menuicon: "",
      },
      dialogFormVisible: false,
      rules: {
        menuname: [{ validator: valiMenuName, trigger: "blur" }],
        menupath: [{ validator: valiMenuPath, trigger: "blur" }],
      },
      props: {
        lazy: true,
        emitPath: false,
        expandTrigger: "hover",
        checkStrictly: true,
        lazyLoad(node, resolve) {
          const { level, data } = node;
          let id = data ? data.value : 0;
          // _self.menus.menuLevel = level * 1 + 1;
          if (level == 2) {
            resolve([]);
            return false;
          }
          _self.getLevel({ parentid: id }).then(function (data) {
            const nodes = data.data.map((item) => ({
              value: item.id, //主键
              label: `${item.menuname}`, //分类名
            }));
            resolve(nodes);
          });
        },
      },
    };
  },
  methods: {
    ...mapActions("listmenu", { getLevel: "getLevel" }),
    submitAdd(f) {
      this.$refs[f].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.$bus.$emit("subAddMenu", this.menus);

          //初始化
          this.menus = {
            menuname: "",
            parentid: 0,
            menupath: "",
            menuLevel: 1,
            menuicon: "",
          };
        } else {
          return false;
        }
      });
    },

    cascaderChange(id) {
      //获取选中的子级数
      this.menus.menuLevel =
        this.$refs["cascader"].getCheckedNodes()[0].level * 1 + 1;
      this.menus.parentid = id;
    },
  },
  mounted() {
    this.$bus.$on("addMenudia", () => {
      this.dialogFormVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("addMenudia");
  },
};
</script>

<style lang="less" scoped>
.el-scrollbar__wrap {
  height: 50% !important;
}
</style>