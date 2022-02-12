<template>
  <div class="img">
    <el-upload
      class="upload-demo"
      :headers="uploadHeaders"
      :action="uploadUrl"
      :on-success="uploadLogoSuccess"
      :limit="8"
      :before-upload="beforeLogoUpload"
      :on-exceed="handleExceed"
      multiple
      list-type="picture-card"
      :data="{ folder: 'prd' }"
      ref="logo"
    >
      <el-button
        size="small"
        style="border: none; background: none; font-size: 24px"
        >+</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png/gif类型和600*600的文件，且不超过2大小，不超过8张
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getItem } from "../../util/localStorage";
export default {
  name: "Cimg",
  data() {
    return {
      //给请求头加上jwttoken
      uploadHeaders: { Authorization: "Bearer " + getItem("token") },
      uploadUrl: "http://lqgapidemo.quechao.xyz/upload/image",
      formModel: {
        pics: [],
      },
    };
  },
  methods: {
    handleExceed(files, fileList) {
      //配合limit属性限制上传图片数量
      this.$msg.warning("只能上传8个文件!");
    },
    beforeLogoUpload(file) {
      let fileType = this.getCaption(file.name);
      const isDCM =
        fileType === "jpg" || fileType === "png" || fileType === "gif";
      const isLt2M = file.size / 1024 / 1024 < 2; //小于2M才能上传
      if (!isDCM) {
        this.$msg.error("上传文件只能是jpg,png,gif,jpeg格式!");
        return false;
      }
      if (!isLt2M) {
        this.$msg.error("上传文件大小不能超过 2MB!");
        return false;
      }
      return isDCM && isLt2M;
    },
    async uploadLogoSuccess(res) {
      if (res.data) {
        this.formModel.pics.push(res.data);
      }
    },
    getCaption(obj) {
      let index = obj.lastIndexOf(".");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    },
  },
  watch: {
    formModel: {
      deep: true,
      handler(newv) {
        this.$emit("setAddForms", this.formModel);
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>