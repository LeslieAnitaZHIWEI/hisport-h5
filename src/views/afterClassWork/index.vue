<template>
  <HeaderWrap>
    <div class="wrapper">

      <CardInfo v-if="!noData" :tag="false" :info="info"></CardInfo>

      <div class="workTitle">
        <span class="day">{{
          afterClassWorkInfo.name.replace("项目", "")
        }}</span>
        <span>{{ afterClassWorkInfo.startDate }}</span>
        <span
          >大约需要
          <span class="min">{{ afterClassWorkInfo.time }}min</span></span
        >
        <span class="tag">{{ status }}</span>
      </div>

      <div class="video-list">
        <!-- <div class="video-item">
          <div class="media">
            <video x5-video-player-type="h5" x5-video-player-fullscreen="true">
              <source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
            </video>
            <van-button type="default" @click="showVideo('', $event)"><van-icon name="play-circle-o" /></van-button>
          </div>

          <div class="detail">
            <h3 class="title">xxxx组111</h3>
            <p class="sub-title">动作要点</p>
            <p class="content">
              asdfasdf</p>
          </div>
        </div> -->
        <div
          class="video-item"
          v-for="(item, index) in afterClassWorkInfo.list"
          :key="index"
        >
          <div class="media">
            <video x5-video-player-type="h5" x5-video-player-fullscreen="true">
              <source :src="item.video" type="video/mp4">
            </video>
            <van-button type="default" @click="showVideo(item.video, $event)"><van-icon name="play-circle-o" /></van-button>
          </div>

          <div class="detail">
            <h3 class="title">{{ item.action }}组</h3>
            <p class="sub-title">动作要点</p>
            <p class="content">
              {{ item.actionInfo && item.actionInfo.length >40 ? item.actionInfo.substring(0,40)+'...' : item.actionInfo }}</p>
          </div>
        </div>

      </div>

      <div class="question">
        我的提问
        <van-button
          type="mini"
          style="float:right;width:64.5px;height:28px;margin-top:-4.5px"
          @click="show = true"
          >提问</van-button
        >
      </div>

      <questionLIst :list="list"></questionLIst>
      <NoDataComponent v-if="!pageLoading && list.length === 0" tip="暂无提问" />
    </div>

    <van-dialog
      v-model="show"
      :showConfirmButton="false"
      @close="onClose"
      width="292.5"
    >
      <div class="success">
        <div class="questT">
          提问
        </div>
        <van-field
          type="textarea"
          v-model="value"
          class="questionC"
          placeholder="您有什么疑问都可以写下来哦~"
        />
        <div class="primary-btn-wrap marginT29">
          <van-button
            style="margin:0 auto;width: 145.5px;font-weight:300"
            class="primary-btn"
            type="info"
            @click="askAQuestion"
            >发布</van-button
          >
        </div>
      </div>
      <div class="close" @click="show = false">
        <img :src="close" alt="" />
      </div>
    </van-dialog>

    <van-overlay class="overlay-video" :show="videoVisible">
      <van-button type="default" @click="hideVideo"
        ><van-icon name="close"
      /></van-button>
      <div class="video-wrap">
       <video ref='video' controls width="100%" height="100%" loop="loop">
         <source type="video/mp4">
       </video>
      </div>
    </van-overlay>
  </HeaderWrap>
</template>

<script>
import BottomNavBar from "../components/bottomNavBar";
import HeaderWrap from "../components/HeaderWrap";
import CardInfo from "../components/CardInfo";
import NoDataComponent from "../components/noDataComponent";
import * as api from "../../api/AfterClassWork";
import { listByOrderId, addQanda } from "@/api/QAndAController";
import questionLIst from "@/views/components/questionLIst";
import close from "@/assets/close.png";
import { mapGetters } from "vuex";
import { apiCatchHandler } from '@/utils';

export default {
  created() {
    const {orderId, name} = this.$route.query;
    this.getAfterClassWorkInfo(orderId, name);
  },
  data() {

    const {orderId, isFormal } = this.$route.query;

    return {
      pageLoading: true,
      isFormal: `${isFormal}` === 'true',
      orderId,
      afterClassWorkInfo: {
        H5LessonOrderListVO: {}, // 订单信息
        name: "", // 课程名 day1...
        startDate: "", // 开始时间
        time: "", // 大约所需时间
        status: "", // 状态：0未开始 1已开始 2已结束
        list: [] // 动作列表 action：动作名 actionInfo：动作要点 video：视频地址
      },
      info: {
        beginTime: "",
        coachAvatar: "",
        coachNickName: ""
      },
      videoVisible: false,
      videoUrl: "",
      noData: true,
      list: [],
      show: false,
      value: "",
      close
    };
  },
  computed: {
    status() {
      switch (this.afterClassWorkInfo.status) {
        case 0:
          return "未开始";
        case 1:
          return "已开始";
        case 2:
          return "已结束";
        default:
          return "";
      }
    },
    ...mapGetters(["isEligibility"])
  },
  methods: {
    /**
     * 获取某天的课后作业信息
     *
     * @param orderId
     * @param name
     */
    getAfterClassWorkInfo(orderId, name) {

      const getData = this.isFormal ? api.getFormalAfterClassWorkInfo : api.getAfterClassWorkInfo;

      getData({
        orderId,
        name
      })
      .then(res => {
        const {code ,data} = res;

        if(code === 0){
          this.afterClassWorkInfo = res.data;
          this.info = res.data.lessonOrder;
          this.noData = false;
        }else{
          apiCatchHandler(res);
        }
      })
      .catch((res) => {
        apiCatchHandler(res);
      });

      this.listByOrderId();
    },

    showVideo(url, e) {
      this.videoVisible = true;
      this.videoUrl = url;
      const videoDom = this.$refs.video;
      videoDom.src = this.videoUrl;
      videoDom.play();

    },
    hideVideo() {
      this.videoVisible = false;
    },
    askAQuestion() {
      if (this.value) {
        if (this.isFormal) {
          addQanda({
            orderId: this.info.orderId,
            question: this.value,
            type: 1
          }).then(() => {
            this.show = false;
            this.listByOrderId();
          });
        } else {
          addQanda({
            orderId: this.info.orderId,
            question: this.value,
            type: 0
          }).then(() => {
            this.show = false;
            this.listByOrderId();
          });
        }
      }
    },
    listByOrderId() {
      listByOrderId({
        orderId: this.orderId
      }).then(({ data }) => {
        this.list = data;
        this.pageLoading = false;
      });
    },
    onClose() {
      this.value = "";
    }
  },
  components: {
    HeaderWrap,
    BottomNavBar,
    CardInfo,
    questionLIst,
    NoDataComponent,
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .van-dialog {
    overflow: visible;
  }
}
.close {
  position: absolute;
  bottom: -75px;
  left: 120px;
  width: 52.5px;
  z-index: 2005;
  img {
    width: 100%;
  }
}
.questT {
  color: #333;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
.questionC {
  background: #ededed;
  height: 207px;
  margin: 29px 0 18px 0;
  border-radius: 3px;
  padding: 12px;
  ::v-deep{
    .van-field__control{
      height: 180px;
    }
  }
}
.success {
  height: 352.5px;
  padding: 15px 30px;
}
.workTitle {
  padding: 26px 0 10px 0;

  .day {
    font-size: 24px;
  }

  span {
    margin-left: 5px;
  }
  .min {
    margin-left: 0;
  }
  .tag {
    display: inline-block;
    background: #cff2ee;
    border-radius: 10px;
    font-size: 12px;
    padding: 3px 10px;
    color: #1bc2b1;
  }
}

.video-list {
  .video-item {
    display: flex;
    padding: 10px 0;
    font-size: 12px;
    border-bottom: 1px solid #ececec;
  }
  .media {
    position: relative;
    width: 90px;
    display: inline-block;
    background: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;

    ::v-deep {
      .van-button {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 100%;
        background: none;
        border: none;

        font-size: 36px;
        color: #fff;
        filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));
      }
    }

    video {
      width: 90px;
      height: 90px;
      pointer-events: none;
    }
  }

  .detail {
    flex: 1;
    padding-left: 16px;
  }

  h3,
  p {
    margin: 0;
    padding: 0;
  }
  .title {
    font-size: 16px;
    padding: 4px 0 2px 0;
    color: #353535;
  }
  .sub-title {
    font-size: 14px;
    margin: 10px 0 4px 0;
    color: #353535;
  }
  p {
    color: #757575;
  }
}

.overlay-video {
  background: #000;
  video {
    width: 100%;
    height: 100%;
  }

  .video-wrap {
    height: 90%;
    padding: 40px 0;
    overflow: hidden;
  }

  ::v-deep {
    .van-button {
      position: absolute;
      top: 0;
      right: 0;
      background: none;
      border: none;
      color: #fff;
      filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3));

      font-size: 18px;
    }
  }
}
.question {
  font-weight: 700;
  color: #333;
  font-size: 17px;
  margin: 15px 0px;
}
</style>
