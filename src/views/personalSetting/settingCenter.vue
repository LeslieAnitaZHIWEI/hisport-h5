<template>
  <div class="content">
    <van-uploader
      v-model="fileList"
      :preview-full-image="false"
      :before-read="beforeRead"
      :max-count="10"
      :preview-image="false"
      :deletable="false"
      :max-size="3 * 100 * 1024"
      :after-read="afterRead"
      @oversize="onOversize"
      class="uploader"
    >
      <van-cell class="list marginT10" is-link>
        <div slot="title" class="listSection">
          <div>头像</div>
        </div>
        <div slot class="avatar">
          <img :src="avatar ? avatar : userP" alt="" />
        </div>
      </van-cell>
    </van-uploader>

    <van-cell @click="goEditNick" class="list marginT10" is-link>
      <div slot="title" class="listSection">
        <div>昵称</div>
      </div>
      <div slot>
        <span class="name"> {{ nickName }}</span>
      </div>
    </van-cell>

    <van-cell @click="logout" class="list marginT58">
      <div class="logout">退出登录</div>
    </van-cell>
  </div>
</template>
<script>
import userP from "@/assets/user.png";
import { currentUserInfo, upload, editInfo } from "@/api/CustomerH5Controller";
export default {
  data() {
    return {
      userP,
      fileList: [],
      avatar: "",
      nickName: ""
    };
  },
  created() {
    this.currentUserInfo();
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          message: "确认退出?"
        })
        .then(() => {
          // on confirm

          if (typeof window.AppJsBridge == "undefined") {
            this.$store.dispatch("user/logout");
            this.$router.push("/login");
          } else {
            this.$store.dispatch("user/logout");
            AppJsBridge.chat.onLogout({ params: {} }, function(result) {
              var ret = result.ret;
              var msg = result.msg;
              log("openLiveRoom callback,ret->" + ret + ",msg->" + msg);
            });
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    currentUserInfo() {
      currentUserInfo().then(({ data }) => {
        const { headImageStr, nickName } = data;
        this.avatar = headImageStr;
        this.nickName = nickName;
      });
    },
    goEditNick() {
      this.$router.push("/editNickName");
    },
    beforeRead(file) {
      if (file.type.indexOf("image/") === -1) {
        this.$toast("请上传正确格式的图片");
        return false;
      }
      return true;
    },
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不得超过300K");
    },
    afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);

      upload(formData).then(res => {
        const { code, data } = res;

        if (code === 0) {
          if (data && data.fileUrl) {
            editInfo({
              headImage: data.fileUrl
            }).then(res => {
              this.currentUserInfo();
            });
          }
        }
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.content {
  background: rgb(242, 242, 242);
  height: 100%;
  position: absolute;
  width: 100%;
}
.list {
  height: 58.5px;
  padding: 7px 16px;
  font-weight: 700;
  line-height: 44.5px;
  ::v-deep {
    .van-icon-arrow {
      margin-top: 10.25px;
    }
  }
}
.avatar {
  width: 45px;
  height: 45px;
  float: right;
  img {
    width: 100%;
    border-radius: 50%;
    height: 100%;
  }
}
.name {
  color: #666666;
  font-weight: 300;
}
.logout {
  position: absolute;
  margin: auto;
  top: 0;
  text-align: center;
  bottom: 0;
  left: 0;
  right: 0;
  color: #ff4651;
}
.marginT58 {
  margin-top: 58.5px;
}
.uploader {
  width: 100%;
}
::v-deep {
  .van-uploader__input-wrapper {
    width: 100%;
  }
}
</style>
