<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="dialogFormVisible"
      width="45%"
      center
    >
      <el-form
        :rules="rules"
        :model="addFormModel"
        id="add-form"
        label-width="90px"
        status-icon
        ref="addFormRef"
      >
        <el-form-item prop="imgurl" label="图片路径:" :required="true">
          <el-upload
            class="upload-demo"
            :headers="uploadHeaders"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :file-list="fileList"
            list-type="picture-card"
            :on-exceed="handleExceed"
            :limit="1"
            :before-upload="beforeUpload"
            :data="{ folder: 'rootswiper', isResize: 2 }"
            ref="logo"
          >
            <el-button
              size="small"
              style="border: none; background: none; font-size: 24px"
              >+</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png/gif类型的文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="naviurl" label="导航路径:">
          <el-input
            v-model="addFormModel.naviurl"
            placeholder="导航路径"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subAdd">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getItem } from "../../util/localStorage";
import { mapActions } from "vuex";
export default {
  name: "additem",
  data() {
    return {
      addFormModel: {
        imgurl: undefined,
        naviurl: undefined,
        id: undefined,
        chkStatus: undefined,
      },
      dialogFormVisible: false,
      fileList: [],
      uploadHeaders: { Authorization: "Bearer " + getItem("token") },
      uploadUrl: "http://lqgapidemo.quechao.xyz/upload/image",
      rules: {
        imgurl: [
          { required: true, message: "请选择一张图片", taggle: "blur" },
          { min: 10, max: 50, message: "长度是10-50个字符", taggle: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions("listswiper", {
      add: "addItem",
    }),
    handleRemove(file, fileList) {
      this.addFormModel.imgurl = "";
    },
    handleExceed(files, fileList) {
      this.$message.warning("只能上传1个文件!");
    },
    handlePreview(file) {
      this.previewSrc = file.url;
      this.previewImg = true;
    },
    uploadSuccess(res) {
      if (res.data) {
        this.addFormModel.imgurl = res.data.path;
      }
    },
    beforeUpload(file) {
      let fileType = this.getCaption(file.name);
      const isDCM =
        fileType === "jpg" || fileType === "png" || fileType === "gif";
      const isLt2M = file.size / 1024 / 1024 < 2; //小于2M才能上传
      if (!isDCM) {
        this.$msg.error("上传文件只能是jpg,png,gif格式!");
        return false;
      }
      if (!isLt2M) {
        this.$msg.error("上传文件大小不能超过 2MB!");
        return false;
      }
      return isDCM && isLt2M;
    },
    getCaption(obj) {
      let index = obj.lastIndexOf(".");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    },
    subAdd() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return false;
        }
        await this.add(this.addFormModel);
        await this.$bus.$emit("subSearch", {
          imgurl: "",
          pageNo: 1,
          pageSize: 20,
        });
        this.$refs.addFormRef.resetFields(); //重置表单
        this.$refs.logo.clearFiles(); //清空图片
        this.dialogFormVisible = false;
      });
    },
  },
  mounted() {
    this.$bus.$on("subAddbia", () => {
      this.dialogFormVisible = true;
    });
  },
  beforeDestroy() {
    this.$bus.$off("subAddbia");
  },
};
</script>

<style>
</style>