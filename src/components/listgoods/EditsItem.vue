<template>
  <div>
    <el-dialog title="编辑商品图片" width="40%" :visible.sync="dialogVisible">
      <el-upload
        class="upload-demo"
        :headers="uploadHeaders"
        :action="uploadUrl"
        :on-success="uploadLogoSuccess"
        :limit="1"
        :before-upload="beforeLogoUpload"
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
          只能上传jpg/png/gif类型和600*600的文件，且不超过2M
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getItem } from "../../util/localStorage";
export default {
  name: "EditsItem",
  data() {
    return {
      dialogVisible: false,
      formModel: {
        goodsWeight: undefined,
        goodsNumber: undefined,
        goodsPrice: undefined,
        goodsName: undefined,
        id: undefined,
      },
      //给请求头加上jwttoken
      uploadHeaders: { Authorization: "Bearer " + getItem("token") },
      uploadUrl: "https://api.rikkas.xyz/upload/image",
    };
  },
  methods: {
    ...mapActions("listgoods", {
      updGoods: "edit",
      getGoods: "getGoodsList",
    }),
    beforeLogoUpload(file) {
      let fileType = this.getCaption(file.name); //.replace(/\.jpeg/g,".jpg")
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
    async uploadLogoSuccess(res) {
      if (res.data) {
        await this.updGoods({
          id: this.formModel.id,
          goodsSmallLogo: res.data.path,
        });
        await this.getGoods({
          goodsName: "",
          pageNo: 1,
          pageSize: 20,
        });
      }
      this.dialogVisible = false;
      this.$refs.logo.clearFiles(); //清空图片
    },
    getCaption(obj) {
      let index = obj.lastIndexOf(".");
      obj = obj.substring(index + 1, obj.length);
      return obj;
    },
  },
  mounted() {
    this.$bus.$on("subedititemdia", (data) => {
      this.dialogVisible = true;
      this.formModel = { ...this.formModel, ...data };
    });
  },
  beforeDestroy() {
    this.$bus.$off("subedititemdia");
  },
};
</script>

<style>
</style>