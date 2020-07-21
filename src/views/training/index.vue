<template>
  <HeaderWrap>
    <van-tabs class="site-tabs" v-model="activeName" @click="handleClick">
      <van-tab title="待训练" name="first">
        <div class="wrapper">
          <div v-if="noData && noDataF">
            <NoDataComponent />
          </div>

          <CardInfo
            :tag="false"
            v-show="info.id != ''"
            :info="info"
            :isFormal="false"
          ></CardInfo>

          <van-skeleton style="margin-top:30px" :row="7" :loading="loading">
            <div class="content day-steps" v-if="!noData">
              <van-steps direction="vertical" :active="step">
                <van-step v-if="isSingle || index < showMax" v-for="(item, index) in actionList" :key="index">
                  <div class="card">
                    <h3 class="title">{{ item.name.replace("项目", "") }}</h3>
                    <div class="tag-list">
                      <div
                        v-if="i < 3"
                        class="individuationTag"
                        v-for="(ele, i) in item.actionList"
                        :key="i"
                      >
                        {{ ele }}
                      </div>
                      <div
                        class="individuationTag"
                        v-if="item.actionList.length > 3"
                      >
                        ...
                      </div>
                    </div>
                    <div class="footer">
                      大约需要 <span class="min">{{ item.time }}min</span>
                      <van-button
                        type="mini"
                        @click="goDetail(item, false)"
                        style="float:right"
                        v-show="item.status == 2"
                        >查看</van-button
                      >
                      <van-button
                        type="mini"
                        style="float:right"
                        @click="goDetail(item, false)"
                        v-show="item.status == 1"
                        >开始训练</van-button
                      >
                      <div class="clearFix"></div>
                    </div>
                  </div>
                </van-step>
              </van-steps>

              <div v-if="!isSingle && actionList.length > 2" type="primary">
                <van-button block @click="showMore">{{showMax === 2 ? '显示更多' : '折叠'}}({{actionList.length}})</van-button>
              </div>

            </div>
          </van-skeleton>

          <CardInfo
            :tag="false"
            v-show="infoF.id != ''"
            :info="infoF"
          ></CardInfo>

          <van-skeleton style="margin-top:30px" :row="7" :loading="loadingF">
            <div class="content day-steps" v-if="!noDataF">
              <van-steps direction="vertical" :active="formalSetp">
                <van-step v-if="isSingle || index < showMaxF" v-for="(item, index) in actionListF" :key="index">
                  <div class="card">
                    <h3 class="title">{{ item.name.replace("项目", "") }}</h3>
                    <div class="tag-list">
                      <div
                        class="individuationTag"
                        v-for="(ele, i) in item.actionList"
                        :key="i"
                        v-if="i < 3"
                      >
                        {{ ele }}
                      </div>
                      <div
                        class="individuationTag"
                        v-if="item.actionList.length > 3"
                      >
                        ...
                      </div>
                    </div>
                    <div class="footer">
                      大约需要 <span class="min">{{ item.time }}min</span>
                      <van-button
                        type="mini"
                        @click="goDetail(item, true)"
                        style="float:right"
                        v-show="item.status == 2"
                        >查看</van-button
                      >
                      <van-button
                        type="mini"
                        style="float:right"
                        @click="goDetail(item, true)"
                        v-show="item.status == 1"
                        >开始训练</van-button
                      >
                      <div class="clearFix"></div>
                    </div>
                  </div>
                </van-step>
              </van-steps>

              <div v-if="!isSingle && actionListF.length > 2" type="primary">
                <van-button block @click="showMoreF">{{showMaxF === 2 ? '显示更多' : '折叠'}}({{actionListF.length}})</van-button>
              </div>

            </div>
          </van-skeleton>
        </div>
      </van-tab>
      <van-tab title="历史作业" name="second">
        <div class="wrapper history-wraper">
          <router-link :to="{ path: '/task',query: {orderId: item.orderId, isFormal: item.type === 1} }"
              v-for="(item, index) in historyList"
              :key="index">
            <CardInfo
              :tag="false"
              :tagList="item.actionList"
              :info="item"
            ></CardInfo>
          </router-link>

          <div v-if="historyList.length === 0">
            <NoDataComponent />
          </div>

        </div>
      </van-tab>
    </van-tabs>

    <div style="height:60px"></div>

    <BottomNavBar index="training" />
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import * as api from "../../api/AfterClassWork";
import CardInfo from "../components/CardInfo";
import NoDataComponent from "../components/noDataComponent";
import BottomNavBar from "../components/bottomNavBar";
import { mapGetters } from "vuex";

export default {
  created() {
    this.listWork();
  },
  data() {
    return {
      isSingle: true,
      afterClassWorkList: [],
      formalAfterClassWorkList: [],
      historyList: [],
      activeName: "first",
      info: {
        beginTime: "",
        coachAvatar: "",
        coachNickName: "",
        id: "",
        status: ""
      },
      infoF: {
        beginTime: "",
        coachAvatar: "",
        coachNickName: "",
        id: "",
        status: ""
      },
      actionList: [],
      showMax: 2,
      actionListF: [],
      showMaxF: 2,
      checkDay: 0,
      loading: true,
      loadingF: true,
      noData: false,
      noDataF: false,
      step:0,
      formalSetp:0,
    };
  },
  computed: {
    scrollerHeight: function() {
      return window.innerHeight - 340 + "px";
    },
    oneHeight: function() {
      return this.actionList.length * 72 + "px";
    },
    ...mapGetters(["isEligibility"])
  },
  methods: {
    /**
     * 获取订单列表，待训练页面的数据状态为6
     *
     * @param status 全部：空
     * 待受理(0),
     待排课(1),
     待上课(2),
     待下课(3),
     待课后总结(4),
     待编写计划书(5),
     待评价(6),
     已完成(7),
     已取消(99);
     */
    listWork(status) {
      // if (this.isEligibility) {
      api
        .getWork()
        .then(res => {
          if (res.data.length !== 0) {

            let testItem;
            let formalItem;

            this.isSingle = res.data.length < 2;

            res.data.forEach(item => {
              /** 如果是体验 */
              if(!testItem && item.type == 0){
                testItem = item;
              }

              /** 如果是正式课 */
              if(!formalItem && item.type == 1){
                formalItem = item;
              }
            });

            if(testItem){
              this.info = testItem;
              this.getAfterClassWorkList(testItem.orderId);
              this.noData = false;
            }else{
              this.loading = false;
              this.noData = true;
            }

            if(formalItem){
              this.infoF = formalItem;
              this.getFormalAfterClassWorkList(formalItem.orderId);
              this.noDataF = false;
            }else{
              this.loadingF = false;
              this.noDataF = true;
            }

          } else {
            this.loadingF = false;
            this.loading = false;
            this.noData = true;
            this.noDataF = true;
          }
        });

    },

    /**
     * 获取指定订单的课后作业信息
     *
     * @param orderId 订单id
     */
    getAfterClassWorkList(orderId) {
      // if (this.isEligibility) {

      // } else {
      api
        .getAfterClassWorkByOrderId({
          orderId
        })
        .then(res => {
          this.loading = false;

          this.actionList = res.data.list;
          let step;
          res.data.list.forEach((ele, index) => {
            if (ele.status == 2) {
              this.checkDay = index;
            }
            if (ele.status == 1) {
              this.checkDay = index;
              step = index;
            }
          });

          this.step = step;
        })
        .catch(res => {
          this.loading = false;
        });
      // }
    },
    getFormalAfterClassWorkList(orderId) {
      api
        .getFormalAfterClassWorkByOrderId({
          orderId
        })
        .then(res => {
          this.loadingF = false;

          this.actionListF = res.data.list;
          let step;
          res.data.list.forEach((ele, index) => {
            if (ele.status == 2) {
              this.checkDay = index;
            }
            if (ele.status == 1) {
              this.checkDay = index;
              step = index;
            }
          });

          this.formalSetp = step;
        })
        .catch(res => {
          this.loadingF = false;
        });
    },

    /**
     * 获取历史作业订单
     */
    listHistory() {

      this.historyList = [];
      api.getHistory().then(res => {
        res.data.forEach(ant => {
          this.historyList.push(ant);
        });
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab == "second") {
        this.listHistory();
      } else {
        this.listWork();
      }
    },
    goDetail(orderData, isFormal) {
      this.$router.push({
        path: "/afterClassWork",
        query: {
          orderId: isFormal ? this.infoF.orderId : this.info.orderId,
          name: orderData.name,
          isFormal,
        }
      });
    },
    showMore(){
      this.showMax = this.showMax === 2 ? this.actionList.length : 2;
    },
    showMoreF(){
      this.showMaxF = this.showMaxF === 2 ? this.actionListF.length : 2;
    }
  },
  components: {
    HeaderWrap,
    CardInfo,
    BottomNavBar,
    NoDataComponent
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 0 10px 0;
}
.one {
  flex: 1;
  height: 200px;
}
.three {
  flex: 3;
}
.history-wraper{

  ::v-deep{
    .ticket{
      margin-bottom: 10px;
    }
  }
}
.day-steps{
  .van-button--block{
    border:none;
  }
}
</style>
