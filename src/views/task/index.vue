<template>
  <HeaderWrap>
    <div class="wrapper">
      <CardInfo v-if="!noData" :tag="false" :info="info" :isFormal="false"></CardInfo>

      <div v-if="actionList.length !== 0" class="content day-steps">
        <van-steps direction="vertical" :active="checkDay">
          <van-step v-for="(item, index) in actionList" :key="item.id">
            <div class="card">
              <h3 class="title">{{ item.name.replace("项目", "") }}</h3>
              <div>
                <div
                  class="individuationTag"
                  v-for="(ele, i) in item.actionList"
                  :key="i"
                  v-if="i < 3"
                >
                  {{ ele }}
                </div>
                <div class="individuationTag" v-if="item.actionList.length > 3">
                  ...
                </div>
              </div>
              <div class="footer">
                大约需要 <span class="min">{{ item.time }}min</span>
                <van-button
                  type="mini"
                  @click="goDetail(item.name, false)"
                  style="float:right"
                  v-show="item.status == 2"
                  >查看</van-button
                >
                <van-button
                  type="mini"
                  style="float:right"
                  @click="goDetail(item.name, false)"
                  v-show="item.status == 1"
                  >开始训练</van-button
                >
                <div class="clearFix"></div>
              </div>
            </div>
          </van-step>
        </van-steps>
      </div>

      <CardInfo v-if="!formalNoData" :tag="false" :info="formalInfo" :isFormal="true"></CardInfo>

      <div v-if="formalActionList.length !== 0" class="content day-steps">
        <van-steps direction="vertical" :active="formalCheckDay">

          <van-step v-for="(item, index) in formalActionList" :key="item.id">
            <div class="card">
              <h3 class="title">{{ item.name.replace("项目", "") }}</h3>
              <div>
                <div
                  class="individuationTag"
                  v-for="(ele, i) in item.actionList"
                  :key="i"
                  v-if="i < 3"
                >
                  {{ ele }}
                </div>
                <div class="individuationTag" v-if="item.actionList.length > 3">
                  ...
                </div>
              </div>
              <div class="footer">
                大约需要 <span class="min">{{ item.time }}min</span>
                <van-button
                  type="mini"
                  @click="goDetail(item.name, true)"
                  style="float:right"
                  v-show="item.status == 2"
                  >查看</van-button
                >
                <van-button
                  type="mini"
                  style="float:right"
                  @click="goDetail(item.name, true)"
                  v-show="item.status == 1"
                  >开始训练</van-button
                >
                <div class="clearFix"></div>
              </div>
            </div>
          </van-step>
        </van-steps>
      </div>

    </div>

    <BottomNavBar index="training" />
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import * as api from "../../api/AfterClassWork";
import BottomNavBar from "../components/bottomNavBar";
import CardInfo from "../components/CardInfo";
import { mapGetters } from "vuex";

export default {
  created() {
    // this.listWork();

    const getWorkeInfo = this.isFormal ? api.getFormalAfterClassWorkInfo : api.getAfterClassWorkInfo;

    getWorkeInfo({
      orderId: this.orderId,
      name: 'day1项目'
    }).then(res => {

      const { code, data } = res;

      if(code === 0){
        this.info = data.lessonOrder;
        this.noData = false;
      }

    });
    this.getAfterClassWorkList(this.orderId);
    // this.getAfterClassWorkList(this.orderId);
  },
  data() {
    const {orderId, isFormal} = this.$route.query;
    return {
      isFormal: `${isFormal}` === 'true',
      orderId,
      afterClassWorkList: [],
      formalAfterClassWorkList: [],
      info: {
        beginTime: "",
        coachAvatar: "",
        coachNickName: "",
        id: "",
        status: ""
      },
      formalInfo: {
        beginTime: "",
        coachAvatar: "",
        coachNickName: "",
        id: "",
        status: ""
      },
      actionList: [],
      formalActionList: [],
      checkDay: 0,
      formalCheckDay: 0,
      noData: true,
      formalNoData: true,
    };
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 250 + "px";
    },
    oneHeight: function() {
      return this.actionList.length * 72 + "px";
    },
    ...mapGetters(["isEligibility"])
  },
  methods: {

    /**
     * 获取指定订单的课后作业信息
     *
     * @param orderId 订单id
     */
    getAfterClassWorkList(orderId) {

      if (this.isFormal) {

        api
          .getFormalAfterClassWorkByOrderId({
            orderId
          })
          .then(res => {console.log(2222);
            this.formalAfterClassWorkList = res.data;
            this.formalActionList = res.data.list;
            res.data.list.forEach((ele, index) => {
              if (ele.status == 2) {
                this.formalCheckDay = index;
              }
              if (ele.status == 1) {
                this.formalCheckDay = index;
              }
            });
          })
          .catch(e => {
            console.log(333);
            this.$toast(e.msg | "");
          });
      } else {
        api
          .getAfterClassWorkByOrderId({
            orderId
          })
          .then(res => {
            this.afterClassWorkList = res.data;
            this.actionList = res.data.list;
            res.data.list.forEach((ele, index) => {
              if (ele.status == 2) {
                this.checkDay = index;
              }
              if (ele.status == 1) {
                this.checkDay = index;
              }
            });
          })
          .catch(e => {
            this.$toast(e.msg | "");
          });
      }
    },
    goDetail(name) {
      this.$router.push({
        path: "/afterClassWork",
        query: {
          orderId: this.info.orderId,
          name,
          isFormal: this.info.type === 1 ? 'true' : 'false',
        }
      });
    }
  },
  components: {
    HeaderWrap,
    BottomNavBar,
    CardInfo
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-bottom: 60px;
}
.content {
  padding: 0;
  overflow: auto;
}
.one {
  flex: 1;
  height: 200px;
}
.three {
  flex: 3;
}
.day-steps{
  margin-bottom: 20px;
}
</style>
