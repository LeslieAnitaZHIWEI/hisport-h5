<template>
  <HeaderWrap>

    <div v-if="isFormal" class="lesson-panel">

      <div class="bg" :style="`background-image:url(${info.coachAvatar})`">
        <div class="filter"></div>
      </div>

      <div class="content">
        <div class="header">
          <h3 class="title">{{isFormal ? '私教正式课' : '新会员体验课'}}</h3>
          <p>{{ time }}</p>
        </div>
        <van-button round @click="goInClass">{{ status }}</van-button>
      </div>

    </div>

    <div v-else class="headImg">
      <img :src="lessonImg" alt="" />
      <div class="title">
        <h3>新会员体验课</h3>
        <div class="date">{{ time }}</div>
        <div class="btn-wrap">
          <van-button round type="info" @click="goInClass">{{
            status
          }}</van-button>
        </div>
      </div>
    </div>

    <div v-if="info.status != 0" class="avatar-name-bar">
      <div class="avatar">
        <img :src="info.coachAvatar" alt="" />
      </div>
      <div class="name">{{ info.coachNickName }}</div>
    </div>

    <div class="pageContent" :class="{'pageContentStatus': info.status === 6}">
      <h4>
        <span class="dian"></span> 课程目标

        <van-button @click="gotoMofiy" class="edit" type="mini"
          >修改</van-button
        >
      </h4>
      <div class="card cardS">
        <h3 class="cardTitle">
          {{ user.title }}
        </h3>
        <div class="cardContent">
          {{ user.content }}
        </div>
      </div>
      <h4 class="section-title"><span class="dian"></span> 课程要求</h4>
      <div class="coachPreferences">
        <van-field
          v-model="coachPreferences"
          rows="3"
          autosize
          type="textarea"
          placeholder="写出对课程和教练的期望，方便教练准备哦"
          @blur="onBlur"
        />
      </div>
      <h4 class="section-title"><span class="dian"></span> 温馨提示</h4>
      <WarmPrompt />
    </div>
    <van-button type="primary" block class="bottom-btn" @click="goComment" v-if="(isFormal && this.info.status === 5) || (!isFormal && this.info.status === 6)">立即评价</van-button>
  </HeaderWrap>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderWrap from "../components/HeaderWrap";
import WarmPrompt from "../components/warmPrompt";
import {
  getByUserId,
  getlessonorderByOrderId,
  getFormalLessonOrderByOrderId,
  editGoalAndPreferences
} from "@/api/lessons";
import lessonImg from "@/assets/lesson.png";
import { getWeek } from "@/utils/index";
import { getTrainingTaget, getliveroominfo, getFormalLiveRoomInfo } from "@/api/makeAnAppointment";
import { orderStatusMap, formalOrderStatusMap } from "@/const/order";
import moment from "moment";
import Navigation from "../components/Navigation";
import { Toast } from "vant";
import Cookies from "js-cookie";
export default {
  created() {

    this.getByUserId();
    if(this.isFormal){
      this.getFormalLessonOrderByOrderId();
    }else{
      this.getlessonorderByOrderId();
    }


    this.getTrainingTaget();
  },
  data() {

    const {orderId, isFormal } = this.$route.query;

    return {
      info: {
        fitnessGoal: "",
        coachAvatar: "",
        coachNickName: ""
      },
      user: {
        title: "",
        content: ""
      },
      lessonImg,
      beginTime: "",
      coachPreferences: "",
      show: false,
      check: 0,
      target: [],
      trueOrderId: orderId || this.orderId,
      isFormal: `${isFormal}` === 'true',
    };
  },
  computed: {
    ...mapGetters(["userId", "orderId", 'isEligibility']),
    time() {
      if (this.beginTime) {
        let t = moment(this.beginTime);
        return (
          t.format("MM月DD日") + " " + getWeek(t) + " " + t.format("HH:mm")
        );
      } else {
        return "";
      }
    },
    status() {

      if(this.info){
        if(this.isFormal){

          return formalOrderStatusMap[this.info.status];
        }else{
          return orderStatusMap[this.info.status];
        }
      }

      return '';
    }
  },
  methods: {
    async goInClass() {

      this.$toast.loading();

      const getOrderById = this.isFormal ? this.getFormalLessonOrderByOrderId : this.getlessonorderByOrderId;

      await getOrderById();

      this.$toast.clear();

      const getliveroom = this.isFormal ? getFormalLiveRoomInfo : getliveroominfo;
      if(this.isFormal){
        if(this.info.status==0){
          this.$store.commit('order/SET_OrderId',this.info.id)
           this.$router.push({
          path: "/confirmOrder"
          ,
          query: {
            date: this.info.beginTime,
            coachId: this.info.coachId,

          }
          })
        }
      }
      if (this.info.status == 2 || this.info.status == 3) {
        getliveroom({
          orderId: this.info.id
        }).then(res => {
          if (res.code === 0) {
            if (res.data) {
              if ( typeof window.AppJsBridge=='undefined' ) {
                 // 其他环境
                Cookies.set(this.info.id, res.data, {
                  path: "/",
                  domain: "hidbb.com"
                  // domain: "local.hidbb.com"  //开发环境
                });

                window.location.href = "//live.hidbb.com?id=" + this.info.id;
                // "//live.local.hidbb.com?id=" + this.info.id;  //开发环境

              } else {
                // 表示是在我APP原生环境下，AppJsBridge 是我原生注入的命名空间对象
                AppJsBridge.chat.openLiveRoom(
                  { lessonId: this.info.id },
                  function(result) {
                    var ret = result.ret;
                    var msg = result.msg;
                    log("openLiveRoom callback,ret->" + ret + ",msg->" + msg);
                  }
                );
              }
            } else {
              this.$toast(res.msg);
            }
          } else {
            this.$toast(res.msg);
          }
        });
      } else if ((!this.isFormal && (this.info.status == 4 || this.info.status == 5)) || (this.isFormal && (this.info.status == 4))) {
        this.$toast("作业还在布置中,请耐心等待");
      } else if ((!this.isFormal && this.info.status == 6) || (this.isFormal && this.info.status == 5)) {
        this.$router.push("/training");
      } else {
      }
    },
    getByUserId() {
      getByUserId({
        userId: this.userId
      }).then(res => {
        if (res.code === 0) {
          this.user = res.data;
          this.coachPreferences = res.data.coachPreferences;
        }
      });
    },
    getlessonorderByOrderId() {
      getlessonorderByOrderId({
        id: this.trueOrderId
      }).then(res => {
        this.beginTime = res.data.beginTime;
        this.info = res.data;
      });
    },
    getFormalLessonOrderByOrderId(){
      getFormalLessonOrderByOrderId({
        id: this.trueOrderId
      }).then(res => {
        this.beginTime = res.data.beginTime;
        this.info = res.data;
      });
    },
    onBlur(e) {
      const { value } = e.target;
      editGoalAndPreferences({
        coachPreferences: value
      }).then(res => {
        if (res.code === 0) {
          this.$toast.success("要求已保存");
        }
      });
    },
    getTrainingTaget() {
      getTrainingTaget({
        sex: this.$store.state.user.sex
      }).then(res => {
        this.target = res.data;
      });
    },

    gotoMofiy(){
      this.$router.push({path:'/makeAnAppointment/two',query:{
        modify: 'goal',
        orderId: this.trueOrderId,
        goalId: this.user.fitnessGoal,
        isFormal: this.isFormal
      }});
    },

    goComment(){
      this.$router.push({path:'/evaluate', query: { orderId: this.trueOrderId, isFormal: this.isFormal }});
    }
  },
  components: {
    HeaderWrap,
    Navigation,
    WarmPrompt,
  }
};
</script>

<style lang="scss" scoped>

.headImg {
  position: relative;
  img {
    width: 100%;
  }
  .title {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    flex-wrap: wrap;
    align-content: center;
    text-align: center;
    color: white;

    h3 {
      width: 100%;
      font-size: 32px;
      font-weight: normal;
      text-align: center;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 0;
    }

    .btn-wrap {
      width: 100%;
    }
    .van-button {
      height: 40px;
      padding: 0 40px;
      background: #fff;
      color: #333;
      font-size: 16px;
      border:none;
    }

    .date {
      width: 100%;
      font-size: 16px;
      padding: 15px 0;
    }
  }
}

.pageContent,
.pageContent-status {
  padding: 0 14px 20px 14px;
}
.pageContentStatus{
  padding-bottom: 60px;
}
h4 {
  position: relative;
  margin-top: 8px;
  margin-bottom: 12px;
  padding-top:10px;

  border-top: 1px solid #f6f6f6;
  font-size: 17px;
}
.section-title{
  margin: 20px 0 10px 0;
}
.cardContent {
  padding: 12px 0;
  line-height: 1.6;
  font-size: 13px;
}
.people {
  position: relative;
  padding: 10px;
  border-top: none;
  border-radius: 10px;
  display: flex;
}
.cardS {
  text-align: center;
  min-height: 110px;
  padding: 15px;
}
.cardTitle {
  margin: 0;
  font-size: 17px;
}
.name {
  line-height: 25px;
  margin-left: 5px;
}
.avatar {
  width: 25px;
  height: 25px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 25px;
  }
}
.edit {
  position: absolute;
  right: 0;
  padding: 4px 15px;
  font-size: 14px;
}
.coachPreferences {
  ::v-deep {
    .van-field{
      padding:0;
    }
    textarea {
      padding:5px 20px;
      background-color: #F4F4F4;
      font-size: 13px;
      border-radius: 5px;
    }
  }
}

.target {
  background: #1bc2b133;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  padding: 5px;
  color: #1bc2b1;
  text-align: center;
  margin-bottom: 5px;
  .title {
    font-weight: 700;
    font-size: 16px;
    padding-bottom: 5px;
  }
}
.checked {
  background: #1bc2b1;
  color: white;
}
.sureEdit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
}
</style>
