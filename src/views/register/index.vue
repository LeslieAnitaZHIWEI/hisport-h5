/* * @Description: * @Author: juyang * @Date: 2020-06-28 19:13:22 * @Last
Modified by: juyang * @Last Modified time: 2020-06-29 17:19:29 */
<template>
  <div class="login-container">
    <van-form ref="loginForm" :show-error-message="false">
      <div class="avatar-wrap">
        <van-uploader
          v-model="fileList"
          :preview-full-image="false"
          :before-read="beforeRead"
          :max-size="3 * 100 * 1024"
          :after-read="afterRead"
          :deletable="false"
          @oversize="onOversize"
        >
          <img :src="uploadImgUrl" alt="添加头像" />
        </van-uploader>
      </div>

      <div class="nick-name">
        <van-field
          v-model="nickName"
          name="nickName"
          placeholder="请输入您的昵称"
          :rules="[{ required: true, message: '请输入您的昵称' }]"
          @input="onMobileChange"
        />
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
          :disabled="mobile==''||code==''"
          @click="onSubmit"
          >注册</van-button
        >

        <van-button
          round
          hairline
          block
          type="info"
          native-type="button"
          @click="goLogin"
          >返回</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { isMobile, isVerificationCode } from "@/utils/validate";
import { getRegPhoneCode, login } from "@/api/user";
import { register, upload } from "@/api/register";
import { apiCatchHandler } from "@/utils/index";
import { setToken } from "@/utils/auth";
import defaultAvatar from "@/assets/add-avatar.png";

export default {
  name: "Register",
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
      avatarUrl: '',
      uploadImgUrl: defaultAvatar,
      hasAvatar: false,
      whiteC:false,
      whiteY:false,
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
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
    onOversize(file) {
      console.log(file);
      this.$toast('文件大小不得超过300K')
    },
    beforeRead(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$toast("请上传正确格式的图片");
        return false;
      }
      return true;
    },

    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      const formData = new FormData();
      formData.append("file", file.file);

      upload(formData).then(res => {
        const { code, data } = res;

        if (code === 0) {
          if (data && data.fileUrl) {
            this.uploadImgUrl = file.content;
            file.url = data.fileUrl;
            file.status = "success";
            file.message = "上传成功";
            this.hasAvatar = true;
            this.avatarUrl = data.fileUrl;
          }
        }
      });

      // setTimeout(() => {
      //   file.status = 'failed';
      //   file.message = '上传失败';
      // }, 1000);
    },

    onMobileChange(val) {
      this.canGetSms = !isMobile(val);
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
      } /** 如果倒计时 */

      if (this.leftSeconds > 0) {
        return;
      }

      this.isLoadingSms = true;
      getRegPhoneCode({
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

        this.loading = true;
        register({
          headImage: this.avatarUrl,
          nickName: this.nickName,
          phone: this.mobile,
          code: this.code
        })
          .then(res => {
            const { code, data } = res;

            if (code === 0) {
              login({
                mobile: "SMS@" + this.mobile,
                code: this.code,
                grant_type: "mobile"
              })
                .then(res => {

                  const { code, data} = res;

                  if (typeof window.AppJsBridge=='undefined') {
                      // 其他环境
                    this.$store.commit("user/SET_TOKEN", res.access_token);
                    setToken(res.access_token, res.refresh_token);
                    this.$router.push({ path: "/makeAnAppointment/one" });

                  } else {
                    // 表示是在我APP原生环境下，AppJsBridge 是我原生注入的命名空间对象
                    AppJsBridge.chat.onRegistSuccess({ "params": res }, function(
                      result
                    ) {
                      var ret = result.ret;
                      var msg = result.msg;
                      log("openLiveRoom callback,ret->" + ret + ",msg->" + msg);
                    });

                  }

                  this.loading = false;

                })
                .catch(res=> {
                  this.loading = false;
                  apiCatchHandler(res);
                });
            }else{
              this.loading = false;
              apiCatchHandler(res);
            }

          })
          .catch(res=> {
            this.loading = false;
            apiCatchHandler(res);
          });
      });
    },

    goLogin(){
      this.$router.push({
        path: "/login"
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
  .van-uploader__preview{
    display: none;
  }
}
</style>
