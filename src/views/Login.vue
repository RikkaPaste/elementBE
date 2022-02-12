<template>
  <div @keyup.enter="submitForm('ruleForm')">
    <el-card class="loginbox">
      <el-row slot="header">
        <el-col :span="24" class="logo">
          <img src="@/assets/qa.jpg" alt="" height="64" />
        </el-col>
        <el-col style="padding-top: 10px"><h3>登录</h3></el-col>
      </el-row>
      <!--ref:用于dom选择元素对象
            model:绑定data中的对象
            rules:绑定data中的验证对象-->
      <!--  :label-position="'right'"设置标签对齐方式 -->
      <el-form
        :label-position="'right'"
        status-icon
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="70px"
      >
        <el-form-item label="用户名:" prop="name">
          <!-- clearable输入框可清空 
               show-password 密码框可隐藏-->
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            show-password
            clearable
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { valiName, valiPass } from "@/util/regexp";
import req from "@/util/request";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ validator: valiName, trigger: "blur" }],
        password: [{ validator: valiPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            let data = await req.post("/users/login", {
              username: this.ruleForm.name,
              passwd: this.ruleForm.password,
            });
            if (data.code != 200) {
              this.$msg.error("用户名或密码错误");
            } else {
              this.$msg({
                message: "登陆成功",
                type: "success",
              });
              localStorage.setItem("token", data.data.token);
              this.$router.push({path:"/index"});
            }
          } else {
            this.$msg({
              message: "请正确输入用户名/密码",
              type: "warning",
            });
            return false;
          }
        } catch (error) {
          this.$msg.error(error);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.loginbox {
  width: 450px;
  height: 370px;
  margin: calc((100vh * 0.5) - 187px) auto;
  border-radius: 10px;
}
.logo {
  img {
    border-radius: 50%;
    box-shadow: 3px 3px 3px #ccc;
  }
}
.el-form {
  .el-form-item {
    margin: 0 auto 35px;
    width: 80%;
  }
}
.el-row{
    width:100%;
    white-space:nowrap
}
</style>