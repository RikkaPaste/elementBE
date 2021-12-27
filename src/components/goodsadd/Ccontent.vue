<template>
  <div>
    <quill-editor
      v-model="addFormModel.goodsDesc"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
    </quill-editor>
    <div class="ql-container ql-snow">
      <div class="ql-editor">
        {{ addFormModel.goodsDesc }}
      </div>
    </div>
    <el-button @click="addgoods" type="primary">添加商品</el-button>
  </div>
</template>

<script>
import { setItem } from "@/util/localStorage.js";
import quillConfig from "../../util/quillconfig";
export default {
  name: "Ccontent",
  created() {
    //设置quill传送图片到后端保存的目录,
    //在/utils/quillconfig.js中读取
    setItem("quillUploadFolder", "goodsdetail");
  },
  data() {
    return {
      addFormModel: {
        goodsDesc: "<p></p>",
      },
      editorOption: quillConfig,
    };
  },
  methods: {
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    addgoods() {
      this.$emit("addGoods");
    },
  },
  watch: {
    addFormModel: {
      deep: true,
      handler(newv) {
        if (!newv.goodsDesc.trim()) {
          newv.goodsDesc = "<p></p>";
        }
        this.$emit("setAddForms", this.addFormModel);
      },
    },
  },
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