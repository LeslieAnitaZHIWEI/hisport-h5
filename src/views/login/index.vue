<template>
  <div class="login-container">
    <div class="login-header">
      <!-- <div class="logo">
        <svg-icon icon-class="site-logo" />
      </div>
      <div class="name">
        <svg-icon icon-class="site-name" />
      </div> -->
      <div class="hiLogo">
        <img :src="hiLogo" alt="">
      </div>
    </div>

    <van-form ref="loginForm" :show-error-message="false">
      <van-field
        v-model="mobile"
        name="mobile"
        type="tel"
        placeholder="请输入您的手机号码"
        :rules="[{ required: true, message: '请输入您的手机号码' }]"
        @input="onMobileChange"
        @focus="changeStyleW"
        @blur="changeStyleG"
        :class="{ whiteC: whiteC }"
      >
        <template #label>
          <svg-icon icon-class="mobile" />
        </template>
      </van-field>

      <van-field
        v-model="code"
        name="code"
        clearable
        @focus="changeStyleWY"
        @blur="changeStyleGY"
        :class="{ whiteY: whiteY }"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <svg-icon icon-class="sms" />
        </template>
        <template #button>
          <van-button
            :loading="isLoadingSms"
            class="login-btn"
            size="small"
            type="default"
            native-type="button"
            @click="getCode"
            >{{
              leftSeconds > 0 ? `(${leftSeconds})秒后重发` : "获取验证码"
            }}</van-button
          >
        </template>
      </van-field>

      <div class="form-operation">
        <van-button
          round
          block
          type="primary"
          :loading="loading"
          @click="onSubmit"
          :disabled="mobile==''||code==''"
          >登录</van-button
        >
        <van-button
          round
          hairline
          block
          type="info"
          native-type="button"
          @click="reg"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { isMobile, isVerificationCode } from "@/utils/validate";
import { getPhoneCode } from "@/api/user";
import { apiCatchHandler } from "@/utils/index";
import hiLogo from '@/assets/hiLogo.png'
export default {
  name: "Login",
  data() {
    return {
      mobile: "",
      code: "",
      isLoadingSms: false,
      loading: false,
      initSecond: 59,
      leftSeconds: 0,
      whiteC: false,
      whiteY:false,
      hiLogo
    };
  },
  watch: {},
  methods: {
    changeStyleW() {
      this.whiteC = true;
    },
    changeStyleG() {
      this.whiteC = false;
    },
    changeStyleWY() {
      this.whiteY = true;
    },
    changeStyleGY() {
      this.whiteY = false;
    },
    onMobileChange(val) {
      this.canGetSms = isMobile(val);
    },

    reg() {
      this.$router.push({
        path: "/register"
      });
    },
    getCode() {
      if (!isMobile(this.mobile)) {
        this.$toast("请输入正确的手机号码");
        return;
      }

      /** 如果倒计时 */
      if (this.leftSeconds > 0) {
        return;
      }

      this.isLoadingSms = true;
      getPhoneCode({
        mobile: this.mobile
      })
        .then(res => {
          if (!res.data) {
          } else {
            this.timer();
          }
          apiCatchHandler(res);
          this.isLoadingSms = false;
        })
        .catch(res => {
          apiCatchHandler(res);
          this.isLoadingSms = false;
        });
    },

    timer() {
      var _this = this;

      if (window["loginSmsTimer"]) {
        window.clearInterval(window["loginSmsTimer"]);
      }

      _this.leftSeconds = this.initSecond;

      window["loginSmsTimer"] = window.setInterval(function() {
        if (_this.leftSeconds < 1) {
          _this.leftSeconds = 0;
          window.clearInterval(window["loginSmsTimer"]);
        } else {
          _this.leftSeconds -= 1;
        }
      }, 1000);
    },

    onSubmit() {
      this.$refs.loginForm.validate().then(valid => {
        if (!isMobile(this.mobile)) {
          this.$toast("请输入正确的手机号码");
          return;
        }

        if (!isVerificationCode(this.code)) {
          this.$toast("请输入4位数字的验证码");
          return;
        }

        this.loading = true;
        this.$store
          .dispatch("user/login", {
            mobile: this.mobile,
            code: this.code
          })
          .then(() => {
            this.loading = false;

            this.$router.push({
              path: "/",
            });
          })
          .catch(res => {
            this.loading = false;
            apiCatchHandler(res);
          });
      }).catch(res => {
        this.loading = false;
        apiCatchHandler(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url(../../assets/login-bg.jpg);
}
.hiLogo{
  width: 109px;
  margin:0 auto;
  margin-bottom: 40px;
  img{
    width: 100%;
  }
}
</style>
