<template>
  <div class="content">
    <van-cell class="avatar" @click="goSettingCenter" is-link>
      <div slot="title">
        <div class="van-cell-text">
          <div class="avaContent">
            <div class="avaPic">
              <img :src="avatar ? avatar : userP" alt="" />
            </div>
            <div class="name">
              <div class="nickName">
                {{ nickName }}
              </div>
              <div class="phone">
                {{ phone }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-cell>
    <van-cell class="list marginT10" is-link @click="goOrder">
      <div slot="title" class="listSection">
        <div class="listPic">
          <img :src="order" alt="" />
        </div>
        <div class="listT">我的订单</div>
      </div>
    </van-cell>
    <van-cell class="list" is-link @click="goQA">
      <div slot="title" class="listSection">
        <div class="listPic">
          <img :src="service" alt="" />
        </div>
        <div class="listT">我的提问</div>
      </div>
    </van-cell>
    <van-cell class="list marginT10" is-link @click="goAd">
      <div slot="title" class="listSection">
        <div class="listPic">
          <img :src="question" alt="" />
        </div>
        <div class="listT">联系我们</div>
      </div>
    </van-cell>
    <van-cell class="list" is-link @click="goAbout">
      <div slot="title" class="listSection">
        <div class="listPic">
          <img :src="aboutus" alt="" />
        </div>
        <div class="listT">关于我们</div>
      </div>
    </van-cell>
    <van-cell class="list" is-link @click="goFeed">
      <div slot="title" class="listSection">
        <div class="listPic">
          <img :src="complain" alt="" />
        </div>
        <div class="listT">投诉建议</div>
      </div>
    </van-cell>
    <BottomNavBar index="my" />
  </div>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import BottomNavBar from "../components/bottomNavBar";
import { mapGetters } from "vuex";
import userP from "@/assets/user.png";
import order from "@/assets/order.png";
import question from "@/assets/question.png";
import service from "@/assets/service.png";
import aboutus from "@/assets/aboutus.png";
import complain from "@/assets/complain.png";
import { currentUserInfo } from "@/api/CustomerH5Controller";
export default {
  created() {
    this.currentUserInfo();
  },
  data() {
    return {
      userP,
      order,
      question,
      service,
      aboutus,
      complain,
      avatar: "",
      nickName: ""
    };
  },

  computed: {
    ...mapGetters(["phone"])
  },
  methods: {
    goSettingCenter() {
      this.$router.push("/settingCenter");
    },
    currentUserInfo() {
      currentUserInfo().then(({ data }) => {
        const { headImageStr, nickName, username } = data;
        this.avatar = headImageStr;
        if (nickName) {
          this.nickName = nickName;
        } else {
          this.nickName = username;
        }
        console.log(this.avatar, "this.avatar");
      });
    },
    goOrder() {
      this.$router.push("/myOrder");
    },
    goQA() {
      this.$router.push("/myQA");
    },
    goFeed() {
      this.$router.push("/feedBacks");
    },
    goAd() {
      this.$router.push("/myAdviser");
    },
    goAbout() {
      this.$router.push("/aboutUs");
    }
  },
  components: {
    HeaderWrap,
    BottomNavBar
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: rgb(242, 242, 242);
  height: 100%;
  position: absolute;
  width: 100%;
}
.avatar {
  min-height: 150px;
  box-sizing: border-box;
  padding: 32px 14px;
  .avaContent {
    width: 100%;
    position: relative;
    display: flex;
    .avaPic {
      width: 86.5px;
      height: 86.5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    // &::after {
    //   content: ">";
    //   color: #c3c6cc;
    //   position: absolute;
    //   right: 0;
    //   line-height: 86.5px;
    // }
  }
  ::v-deep {
    .van-icon-arrow {
      margin-top: 31.5px;
    }
  }
  .name {
    margin-left: 17px;

    .nickName {
      margin-top: 19.5px;
      font-size: 20px;
      font-weight: 700;
      color: #443c48;
      line-height: 19px;
      min-height: 19px;
    }
  }
  .phone {
    margin-top: 17.5px;
    font-size: 14px;
  }
}
.list {
  height: 58.5px;
  padding: 19px 16px;
  font-weight: 700;
}
.marginT10 {
  margin-top: 10px;
}
.listSection {
  display: flex;
  .listT {
    margin-left: 20.5px;
  }
}
.listPic {
  width: 19px;
  display: inline-block;
  img {
    width: 100%;
    vertical-align: middle;
  }
}
</style>
