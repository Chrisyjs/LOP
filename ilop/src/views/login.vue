<template>
  <div class="login">
    <div class="title text-center">
      <div class="small">{{ appGreet }}</div>
      <div class="big">{{ appName }}</div>
    </div>
    <div class="form">
      <van-cell-group>
        <van-field
          v-model="phone"
          @focus="() => resetErrMsg('phoneErrMsg')"
          label="手机号"
          :border="true"
          :error-message="phoneErrMsg"
          clearable
          maxlength="11"
          type="number"
          placeholder="请输入手机号"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="validCode"
          :error-message="validCodeErrMsg"
          @focus="() => resetErrMsg('validCodeErrMsg')"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button
            slot="button"
            @click.native="sendValidCode"
            size="small"
            type="primary"
            :disabled="isSending"
            >{{ isSending ? `${validText}S` : validText }}</van-button
          >
        </van-field>
      </van-cell-group>
      <div class="submitBtn">
        <van-button size="large" type="primary" @click.native="submit"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getValidCode, login } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      phone: "",
      phoneErrMsg: "",
      validCode: "",
      validCodeErrMsg: "",
      validText: "发送验证码",
      isSending: false,
      appName: appConfig.appName,
      appGreet: appConfig.appGreet,
    };
  },
  created() {
    // console.log(test)
    this.isWeiXinEnv &&
      this.$notify({
        message: "如遇问题，可尝试用浏览器打开",
        type: "primary",
      });
    if (!isPro) {
      this.phone = "15700084697";
    }
  },
  methods: {
    ...mapMutations(["setAuthList", "setToken"]),
    sendValidCode() {
      if (this.isSending) return;
      this.checkPhone();
      if (this.phoneErrMsg) return;
      this.$toast({
        message: "验证码已发送",
        duration: 800,
      });
      this.isSending = true;
      this.validText = 60;
      getValidCode({ mobile: this.phone });
      const interval = window.setInterval(() => {
        this.validText = this.validText - 1;
        if (this.validText <= 0) {
          window.clearInterval(interval);
          this.isSending = false;
          this.validText = "发送验证码";
        }
      }, 1000);
    },
    resetErrMsg(val) {
      this[val] = "";
    },
    checkPhone() {
      if (!this.phone) {
        this.phoneErrMsg = "手机号必填";
      }
      if (this.phone && !/^1[3456789]\d{9}$/.test(this.phone)) {
        this.phoneErrMsg = "手机号错误";
      }
    },
    checkValidCode() {
      this.validCodeErrMsg = this.validCode ? "" : "验证码错误";
    },
    async submit() {
      this.checkPhone();
      this.checkValidCode();
      if (!this.phoneErrMsg && !this.validCodeErrMsg) {
        const { data, code } = await login({
          mobile: this.phone,
          code: this.validCode,
        });
        if (code === 200) {
          this.$utils.setCookie("mobile", data.mobile, 1000 * 60 * 60);
          this.$utils.setCookie("token", data.token, 1000 * 60 * 60);
          const authListJson = isPro
            ? JSON.stringify(data.authList)
            : JSON.stringify([
                {
                  name: "聚会预约",
                  key: 1,
                  authFlag: 1,
                },
                {
                  name: "场地预约",
                  key: 2,
                  authFlag: 1,
                },
                {
                  name: "为 i 认领",
                  key: 3,
                  authFlag: 1,
                },
              ]);
          localStorage.setItem('authList', authListJson);
          // 使用 cookie 存储 json 字符串，苹果手机会有问题
          // this.$utils.setCookie("authList", authList, 1000 * 60 * 60);
          this.$router.push({
            path: "/home",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 60px;
  .title {
    .small {
      color: rgba(16, 16, 16, 1);
      font-size: 20px;
    }
    .big {
      color: #0076ff;
      font-size: 72px;
      font-family: "Times New Roman";
    }
  }
  .form {
    padding: 0 10px;
    margin-top: 80px;
    .submitBtn {
      margin-top: 30px;
    }
  }
  ::v-deep .van-cell--center {
    align-items: baseline;
  }
}
</style>
