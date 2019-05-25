<template>
  <div class="register-container">
    <el-form
      class="login-form"
      autocomplete="on"
      :model="registerForm"
      :rules="loginRules"
      ref="registerForm"
      label-position="right"
      label-width="80px"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
        <!-- <lang-select class="set-language"></lang-select> -->
      </div>
      <!-- <el-form-item prop="identity" label="账号">
        <el-input
          name="identity"
          type="text"
          v-model="registerForm.identity"
          autocomplete="on"
          placeholder="identity"
        />
      </el-form-item>-->

      <el-form-item prop="name" label="名字">
        <el-input name="name" type="text" v-model="registerForm.name" placeholder="请输入用户名"/>
      </el-form-item>

      <el-form-item prop="tel" label="手机号码">
        <el-input
          style="width:180px;"
          name="tel"
          type="tel"
          v-model="registerForm.tel"
          placeholder="请输入手机号码"
          @input="onTelChange"
        />
        <el-button type="primary" :disabled="!isTelValid" @click="genVercode">发送验证码</el-button>
      </el-form-item>

      <el-form-item prop="smsCode" label="验证码">
        <el-input name="smsCode" type="text" v-model="registerForm.smsCode" placeholder="请输入验证码"/>
      </el-form-item>

      <el-form-item prop="password" label="密码">
        <el-input
          name="password"
          :type="passwordType"
          v-model="registerForm.password"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-form-item prop="repassword" label="确认密码">
        <el-input
          name="password"
          :type="passwordType"
          v-model="registerForm.repassword"
          placeholder="请再次确认密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width:100%;margin-left:0px;"
        @click.native.prevent="handleSubmit"
      >确认</el-button>
    </el-form>
  </div>
</template>

<script>
import LangSelect from "@/components/LangSelect";
import { register, genVercode } from "@/api/ma/user";

export default {
  components: { LangSelect },
  name: "login",
  data() {
    return {
      isTelValid: false,
      registerForm: {
        name: "",
        tel: "",
        smsCode: "",
        repassword: "",
        password: ""
      },
      loginRules: {
        name: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("用户名不能为空"));
              } else {
                callback();
              }
            }
          }
        ],
        password: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value.length < 6) {
                callback(new Error("密码不能小于6位"));
              } else {
                callback();
              }
            }
          }
        ],
        repassword: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.registerForm.password !== value) {
                callback(new Error("两次密码不一致"));
              } else {
                callback();
              }
            }
          }
        ],
        tel: [
          {
            trigger: ["change", "blur"],
            validator: (rule, value, callback) => {
              if (!/^1[34578]\d{9}$/.test(value)) {
                callback(new Error("手机号码不正确"));
              } else {
                callback();
              }
            }
          }
        ],
        smsCode: [
          {
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("验证码不能为空"));
              } else {
                callback();
              }
            }
          }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false
    };
  },

  methods: {
    async genVercode () {
      genVercode(this.registerForm.tel)
    },
    async onTelChange() {
      this.$refs.registerForm.validateField("tel", err => {
        this.isTelValid = !err;
      });
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleSubmit() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const {
            tel,
            name,
            password,
            smsCode,
            repassword
          } = this.registerForm
          await register({
            identity: tel,
            name,
            password,
            repassword,
            smsCode,
            sourceType: 'web'
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 47px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
    height: 47px;
  }
  .el-form-item__content {
    margin-left: 100px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>
