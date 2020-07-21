<template>
  <HeaderWrap>
    <div class="page-wraper">

      <router-link :to="{ path: '/planbook', query:{ orderId: orderData.id, status: orderData.orderStatus} }">
        <div v-if="planLevelData" class="card-normal">
          <div class="main-content">
            <div class="header">
              <h3 class="title">{{planLevelData.title}}</h3>
              <p>{{planLevelData.description}}</p>
            </div>
            <div class="content">
              今天是<strong>第{{orderData.day}}天</strong>
            </div>
          </div>
          <div class="extra">
            查看<van-icon name="arrow" /><van-icon name="arrow" />
          </div>
        </div>
      </router-link>

      <van-divider />

      <div class="ticket" v-if="currentOrder" >
        <div class="header">
          <div>
            <h3 class="title">2003-32</h3>
            <div class="content">{{ isEligibility ? '正式课' : '体验课'}} <em>45-56min</em></div>
            <div v-if="currentOrder.tagList.length !== 0" class="tag-list">
              <van-tag
                v-show="tagIndex < 3"
                v-for="(tag, tagIndex) in currentOrder.tagList"
                :key="tagIndex"
              >
                {{ tag }}
              </van-tag>
              <van-tag v-if="currentOrder.tagList.length > 2">...</van-tag>
            </div>
          </div>
          <div class="extra">
            {{ isEligibility ? formalOrderStatusMap[currentOrder.status] : orderStatusMap[currentOrder.status] }}<van-icon v-if="currentOrder.status != 7" name="arrow" />
          </div>
        </div>
        <div class="rip"><div class="line"></div></div>
        <div class="footer">
          <div class="avatar-name-bar">
            <div class="avatar"  v-if="currentOrder.status!=0">
              <img :src="currentOrder.coachAvatar" :alt="currentOrder.coachNickName" />
            </div>
            <div class="name">{{ currentOrder.coachNickName }}</div>
          </div>
        </div>
      </div>

      <van-divider v-if="showPanel" />

      <div v-if="showPanel" class="panel-action">

        <img src="../../assets/forward-lession.jpg" alt="约新课程">

        <div class="content">

          <h3 class="title" v-if="">您预约的课程已上完<br />去约新课程吧！</h3>

          <van-button @click="forwardLession">立即约课</van-button>
        </div>

      </div>

      <div class="panel-normal">
        <div class="header">
          <h4 class="title">历史记录</h4>
        </div>

        <div class="ticket" v-for="(item, index) in historyList" :key="index" v-show="item.status==7||item.status==99">
          <div class="header">
            <div>
              <h3 class="title">2003-32</h3>
              <div class="content">体验课 <em>45-56min</em></div>
              <div v-if="item.tagList.length !== 0" class="tag-list">
                <van-tag
                  v-show="tagIndex < 3"
                  v-for="(tag, tagIndex) in item.tagList"
                  :key="tagIndex"
                >
                  {{ tag }}
                </van-tag>
                <van-tag v-if="item.tagList.length > 2">...</van-tag>
              </div>
            </div>
            <div class="extra">
              {{ orderStatusMap[item.status] }}<van-icon v-if="item.status != 7" name="arrow" />
            </div>
          </div>
          <div class="rip"><div class="line"></div></div>
          <div class="footer">
            <div class="avatar-name-bar">
              <div class="avatar"  v-if="item.status!=0">
                <img :src="item.coachAvatar" :alt="item.coachNickName" />
              </div>
              <div class="name">{{ item.coachNickName }}</div>
            </div>
          </div>
        </div>

        <van-list v-model="orderLoading" :finished="orderFinished" finished-text="" @load="onLoadOrders">
          <div class="ticket" v-for="(item, index) in formalHistoryList" :key="index" v-show="item.status==7||item.status==99">
            <div class="header">
              <div>
                <h3 class="title">2003-32</h3>
                <div class="content">体验课 <em>45-56min</em></div>
                <div v-if="item.tagList.length !== 0" class="tag-list">
                  <van-tag
                    v-show="tagIndex < 3"
                    v-for="(tag, tagIndex) in item.tagList"
                    :key="tagIndex"
                  >
                    {{ tag }}
                  </van-tag>
                  <van-tag v-if="item.tagList.length > 2">...</van-tag>
                </div>
              </div>
              <div class="extra">
                {{ formalOrderStatusMap[item.status] }}<van-icon v-if="item.status != 7" name="arrow" />
              </div>
            </div>
            <div class="rip"><div class="line"></div></div>
            <div class="footer">
              <div class="avatar-name-bar">
                <div class="avatar"  v-if="item.status!=0">
                  <img :src="item.coachAvatar" :alt="item.coachNickName" />
                </div>
                <div class="name">{{ item.coachNickName }}</div>
              </div>

            </div>
          </div>
        </van-list>

        <van-divider v-show="orderFinished" />


      </div>

      <BottomNavBar />

    </div>
  </HeaderWrap>
</template>

<script>
import BottomNavBar from "../components/bottomNavBar";
import HeaderWrap from "../components/HeaderWrap";
import { checkIsEligibility } from "@/utils/order";
import { getMyLessonOrderPage, getPlan } from "@/api/dashbord";
import { getMyFormalLessonOrderPage } from "@/api/FormalLessonOrderController";
import { getPlanLevelByDay } from "@/utils/plan";
import {orderStatusMap, formalOrderStatusMap} from '@/const/order';
export default {
  data() {
    return {
      pageLoading: true,
      isEligibility: false,
      showPanel: false,
      orderData: {},
      planLevelData:null,
      currentOrder: null,
      historyList: [],
      /** 已经获得体验客列表的数据 */
      hasHistoryData: false,
      formalHistoryList: [],
      /** 已经获得正式客列表的数据 */
      hasFormalHistoryData: false,
      orderStatusMap,
      formalOrderStatusMap,
      orderLoading: false,
      orderFinished: false,
      orderNextPage: 1,
    };
  },
  created(){
    this.init();

  },
  methods: {
    async init(){

      const isEligibility = await checkIsEligibility();

      this.isEligibility = isEligibility;

      getPlan().then(res => {

          const {code ,data } = res;

          if(code === 0 && data){
            const {day} = data;
            this.orderData = data;

            this.planLevelData = getPlanLevelByDay(day);
          }
      });

      getMyLessonOrderPage().then(res => {

        const {code ,data } = res;

        if (code === 0 && data) {
          const { tag } = data;

          if(tag){
            data.tagList = tag.split(',');
          }else{
            data.tagList = [];
          }


          if(data.status !== 7){
            this.currentOrder = data;
          }else{
            this.historyList = [data];
          }

          this.hasHistoryData = true;
          this.checkShowPanel();

        } else {
          this.noFirst = false;
        }
      });

    },

    onLoadOrders(){

      getMyFormalLessonOrderPage({
        current: this.orderNextPage,
        size: 10,
      }).then(res => {

        const {code ,data } = res;

        if (code === 0 && data) {

          data.records.forEach(item => {

            const { tag, status } = item;

            if(tag){
              item.tagList = tag.split(',');
            }else{
              item.tagList = [];
            }
            if(status !== 6){
              this.currentOrder = item;
            }else{
              this.formalHistoryList.push(item);
            }

          });

          this.checkLastPage(data.pages);

        }

        this.hasFormalHistoryData = true;

        this.checkShowPanel();
      });
    },

    checkLastPage(pages){
      if(pages <= this.orderNextPage){
        this.orderFinished = true;
      }else{
        this.orderNextPage = this.orderNextPage + 1;
      }
    },

    checkShowPanel(){
      if(this.hasFormalHistoryData && this.hasHistoryData){

          this.showPanel = !(this.currentOrder);
      }
    },

    forwardLession(){

      const path = this.isEligibility ? '/recomcoach' : '/makeAnAppointment/one';

      this.$router.push({ path });
    }
  },
  components: {
    BottomNavBar,
    HeaderWrap
  }
};
</script>

<style lang="scss" scoped>
.panel-action{
  border-radius: 10px;
  overflow: hidden;

  .title{
    font-size: 20px;
    font-weight: normal;
  }
}
.van-divider{
  margin-bottom: 10px;
}
</style>
