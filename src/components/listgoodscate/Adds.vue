<template>
  <div>
    <el-dialog title="添加分类" width="35%" :visible.sync="dialogVisible">
      <el-form
        :rules="rules"
        :model="formModel"
        id="add-form"
        label-width="80px"
        status-icon
        ref="addForms"
      >
        <el-form-item prop="cateName" label="分类名:" :required="true">
          <el-input
            v-model="formModel.cateName"
            placeholder="分类名"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <el-cascader
            :props="props"
            clearable
            v-model="cascaderSelectId"
            @change="cascaderChange"
            size="medium"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span>
        <el-button type="primary" @click="addFormSubmit">添加</el-button>
        <el-button type="warning" @click="dialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { valiCateName } from "../../util/regexp";
import { mapActions } from "vuex";
export default {
  name: "Adds",
  data() {
    let _self = this;
    return {
      cascaderSelectId:0,
      dialogVisible: false,
      formModel: {
        cateName: undefined,
        catePid: 0,
        cateLevel: 1,
        id: undefined,
      },
      rules: {
        cateName: [{ validator: valiCateName, trigger: "blur" }],
      },
      props: {
        lazy: true,
        checkStrictly: true,
        emitPath: false,
        expandTrigger: "hover",
        lazyLoad(node, resolve) {
          const { level, data } = node;
          let id = data ? data.value : 0;
          _self.formModel.cateLevel = level * 1 + 1;
          if (level == 2) {
            resolve([]);
            return false;
          }
          _self.getLevel({ pid: id }).then(function (data) {
            const nodes = data.data.map((item) => ({
              value: item.id, //主键
              label: `${item.cateName}`, //分类名
            }));
            resolve(nodes);
          });
        },
      },
    };
  },
  methods: {
    ...mapActions("listgoodscate", {
      getLevel: "getLevel",
    }),

    cascaderChange() {
      if (this.cascaderSelectId === null) {
        this.formModel.catePid = 0;
        this.formModel.cateLevel = 1;
      } else {
        this.formModel.catePid = this.cascaderSelectId;
      }
    },
    addFormSubmit() {
      this.$refs.addForms.validate(async (valid) => {
        if (valid) {
          this.$bus.$emit("subAddGoodsCate", this.formModel);
          this.dialogVisible = false;
        } else {
          return;
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("subAddbia", () => {
      this.dialogVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("subAddbia");
  },
};
</script>

<style lang='less' scoped>

</style>