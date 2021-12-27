<template>
  <div>
    <el-dialog title="详情编辑" width="40%" :visible.sync="dialogVisible">
      <quill-editor
        v-model="addFormModel.goodsDesc"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
      <span>
        <el-button type="primary" @click="addFormSubmit">编辑</el-button>
        <el-button type="warning" @click="dialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { setItem } from "@/util/localStorage.js";
import quillConfig from "../../util/quillconfig";
import { mapActions } from "vuex";
export default {
  name: "Ccontent",
  props: ["setAddForms", "addGoods"],
  created() {
    //设置quill传送图片到后端保存的目录,
    //在/utils/quillconfig.js中读取
    setItem("quillUploadFolder", "goodsdetail");
  },
  data() {
    return {
      dialogVisible: false,
      addFormModel: {
        id: "",
        goodsId: "",
        goodsDesc: "",
      },
      editorOption: quillConfig,
    };
  },
  methods: {
    ...mapActions("listgoods", {
      getGoodsLabel: "listlabel",
    }),
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    //修改
    addFormSubmit() {
      this.$bus.$emit("goodsEditLabel", this.addFormModel);
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.$bus.$on("subeditlabeldia", async (id) => {
      let data = await this.getGoodsLabel({ goodsid: id });
      if (data) {
        this.addFormModel = {
          goodsDesc: data.goodsDesc ? decodeURIComponent(data.goodsDesc) : "",
          goodsId: data.goodsId,
          id: data.id,
        };
      } else {
        //如果没有该标签id就不设置
        this.addFormModel.id = "";
        this.addFormModel.goodsId = id;
      }
      this.dialogVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("subeditlabeldia");
  },
  filters: {},
};
</script>

<style lang='less' scoped>
.el-button {
  margin-top: 30px;
}
.ql-snow {
  height: 130px;
}
</style>