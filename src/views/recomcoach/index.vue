<template>
  <HeaderWrap>
    <div class="page-wrapper">

      <router-link v-if="orderData" :to="{ path: '/planbook', query:{ orderId: orderData.id, status: orderData.orderStatus} }">
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

      <div class="panel-normal">
        <div class="header">
          <h3 class="title">推荐教练</h3>
        </div>

        <div>

          <van-list v-model="listLoading" :finished="listFinished" finished-text="" @load="onLoadList">
            <router-link v-for="(item) in coachList" :key="item.userId" :to="{ path: '/forwardCoach', query:{ coachId: item.userId} }">
              <CoachInfoCard :data="item" />
            </router-link>
          </van-list>

        </div>

      </div>

    </div>
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import CoachInfoCard from "../components/coachInfoCard";
import { getRecommendCoach } from '@/api/coach';
import { getPlan } from "@/api/dashbord";
import { getPlanLevelByDay } from "@/utils/plan";
import { apiCatchHandler } from '@/utils';
export default {
  data(){
    return {
      orderData: null,
      planLevelData: null,
      coachList: [],
      listLoading: false,
      listFinished: false,
      nextPageNumber: 1,
    };
  },
  created() {

    getPlan().then(res => {

        const {code ,data } = res;

        if(code === 0 && data){
          const {day} = data;
          this.orderData = data;

          this.planLevelData = getPlanLevelByDay(day);
        }
    });

  },
  components: {
    HeaderWrap,
    CoachInfoCard,
  },
  methods: {

    onLoadList(){

      this.listLoading = true;

      getRecommendCoach({
        current: this.nextPageNumber,
      }).then(res => {

        const {code ,data } = res;

        if(code === 0 && data){
          this.coachList = this.coachList.concat(data.records.map(item => {

            const { tag } = item;
            item.tagList = tag ? item.tag.split(' ') : [];

            return item;

          }));

          this.checkLastPage(data.pages);

        }else{

        }

        this.listLoading = false;

      }).catch(e => {
        apiCatchHandler(e);
        this.listLoading = true;
      });
    },

    checkLastPage(pages){
      console.log(pages <= this.nextPageNumber, pages , this.nextPageNumber);
      if(pages <= this.nextPageNumber){
        this.listFinished = true;
      }else{
        this.nextPageNumber = this.nextPageNumber + 1;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper{
  padding: 15px;
}
</style>
