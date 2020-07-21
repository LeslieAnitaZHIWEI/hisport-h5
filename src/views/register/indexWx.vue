/* * @Description: * @Author: juyang * @Date: 2020-06-28 19:13:22 * @Last
Modified by: juyang * @Last Modified time: 2020-06-29 17:19:29 */
<template>
  <div class="login-container">
    <van-form ref="loginForm" :show-error-message="false">
      <!-- <div class="nick-name">
        <van-field
          v-model="nickName"
          name="nickName"
          placeholder="请输入您的昵称"
          :rules="[{ required: true, message: '请输入您的昵称' }]"
          @input="onMobileChange"
        />
      </div> -->
      <div class="login-header">
        <div class="hiLogo">
          <img :src="hiLogo" alt="" />
        </div>
      </div>
      <van-field
        v-model="mobile"
        name="mobile"
        type="tel"
        placeholder="请输入您的手机号码"
        @focus="changeStyleW"
        @blur="changeStyleG"
        :rules="[{ required: true, message: '请输入您的手机号码' }]"
        @input="onMobileChange"
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
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
        :class="{ whiteY: whiteY }"
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
            @click.stop="getCode"
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
          native-type="button"
          :disabled="mobile == '' || code == ''"
          @click="onSubmit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { isMobile, isVerificationCode } from "@/utils/validate";
import { getWxPhoneCode, login, loginWx } from "@/api/user";
import { registerWX, upload } from "@/api/register";
import { apiCatchHandler } from "@/utils/index";
import { setToken } from "@/utils/auth";
import hiLogo from "@/assets/hiLogo.png";

export default {
  name: "registerWX",
  data() {
    return {
      fileList: [],
      isUploading: false,
      nickName: "",
      mobile: "",
      code: "",
      isLoadingSms: false,
      loading: false,
      initSecond: 59,
      leftSeconds: 0,
      avatarUrl: "",
      hasAvatar: false,
      whiteC: false,
      whiteY: false,
      hiLogo
    };
  },

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
      this.canGetSms = !isMobile(val);
    },

    getCode() {
      if (!isMobile(this.mobile)) {
        this.$toast("请输入正确的手机号码");
        return;
      } /** 如果倒计时 */

      if (this.leftSeconds > 0) {
        return;
      }

      this.isLoadingSms = true;
      getWxPhoneCode({
        mobile: this.mobile
      })
        .then(res => {
          if (!res.data) {
          } else {
            this.timer();
          }
          this.$toast(res.msg);
          this.isLoadingSms = false;
        })
        .catch(res => {
          apiCatchHandler(res);
          this.canGetSms = false;
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

        const query = this.$route.query;
        const { openid, headImage, nickname,page } = query;

        this.loading = true;

        registerWX({
          headImage,
          nickName: nickname,
          phone: this.mobile,
          code: this.code,
          openid
        })
          .then(res => {
            const { code, data } = res;

            if (code === 0) {
              loginWx({
                openid,
                grant_type: "wxmp_openid"
              })
                .then(async res => {
                  const { code, data } = res;

                  this.$store.commit("user/SET_TOKEN", res.access_token);
                  setToken(res.access_token, res.refresh_token);
                  const isFinished = await this.$store.dispatch(
                    "user/checkisFinished"
                  );
                  if (!isFinished) {
                    this.$router.push({ path: "/makeAnAppointment/one" });
                  } else {
                    this.$router.push(`/${page}`);
                  }

                  this.loading = false;
                })
                .catch(res => {
                  this.loading = false;
                  apiCatchHandler(res);
                });
            } else {
              this.loading = false;
              apiCatchHandler(res);
            }
          })
          .catch(res => {
            this.loading = false;
            apiCatchHandler(res);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url(../../assets/reg-bg.jpg);
}

.avatar-wrap {
  margin-bottom: 40px;
  text-align: center;
}

.nick-name {
  ::v-deep {
    .van-field__control {
      text-align: center;
    }
  }
}

::v-deep {
  .van-uploader__wrapper,
  .van-uploader__wrapper img,
  .van-uploader__upload,
  .van-image {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    overflow: hidden;
  }
  .van-uploader__preview {
    display: none;
  }
}
.hiLogo {
  width: 109px;
  margin: 0 auto;
  margin-bottom: 40px;
  img {
    width: 100%;
  }
}
</style>
