<template>
  <HeaderWrap>
    <div class="page-wraper">
      <div class="panel-result">
        <div class="content">
          <div class="icon loading">
            <van-icon v-if="status == 1" name="checked" />
            <div class="crossS" v-if="status == 2">
            <van-icon name="cross" />

            </div>
            <van-loading v-if="status == -1" type="spinner" />
          </div>

          <div v-if="status == 1"><h3 class="title">支付成功</h3></div>
          <div v-if="status == -1"><h3 class="title">支付中</h3></div>
          <div v-if="status == 0"><h3 class="title">未支付</h3></div>
          <div v-if="status == 2"><h3 class="title">支付失败</h3></div>
        </div>

        <div class="operation">
          <van-button round @click="back">返回</van-button>
          <van-button round class="btn-view-order" @click="seeOrder"
            >查看订单</van-button
          >
        </div>
      </div>

      <van-divider />

      <div class="coash-list">
        <div class="panel-normal">
          <div class="header">
            <h3 class="title">推荐教练</h3>
          </div>

          <div>
            <router-link
              v-if="index < 2"
              v-for="(item, index) in coachList"
              :key="item.userId"
              :to="{ path: '/forwardCoach', query: { coachId: item.userId } }"
            >
              <CoachInfoCard :data="item" />
            </router-link>
          </div>
        </div>
      </div>
      <BottomNavBar />
    </div>
  </HeaderWrap>
</template>

<script>
import BottomNavBar from "../components/bottomNavBar";

import HeaderWrap from "../components/HeaderWrap";
import CoachInfoCard from "../components/coachInfoCard";
import { getRecommendCoach } from "@/api/coach";
import { getFormalOrderStatus } from "@/api/FormalLessonOrderController";
export default {
  created() {
    this.getRecommendCoach();
    this.getStatus();
  },
  data() {
    return {
      coachList: [],
      status: -1,
      timer:''
    };
  },
  beforeDestroy() {
    if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearTimeout(this.timer); //关闭
    }
},
  methods: {
    getStatus() {
      getFormalOrderStatus({
        orderId: this.$route.query.orderId
      }).then(({ data }) => {
        this.status=data
        if(data==-1){
            this.timer = setTimeout(() => {
                    this.getStatus()
                }, 1000)
        }else{
          clearTimeout(this.timer)
        }
      });
    },
    getRecommendCoach() {
      getRecommendCoach().then(res => {
        const { code, data } = res;

        if (code === 0 && data) {
          this.coachList = data.records.map(item => {
            const { tag } = item;
            item.tagList = tag ? item.tag.split(" ") : [];

            return item;
          });
        }
      });
    },
    back() {
      this.$router.push("/");
    },
    seeOrder() {
      this.$router.push({
        path: "/orderInfo",
        query: {
          orderId: this.$route.query.orderId
        }
      });
    }
  },
  computed: {},
  components: {
    HeaderWrap,
    BottomNavBar,
    CoachInfoCard
  }
};
</script>

<style lang="scss" scoped>
.crossS{
  color:white;
  background: rgb(255,46,63);
  border-radius: 50%;
  font-size: 40px;
  min-height: 70px;
  width: 70px;
  margin:0 auto;
  .van-icon{
    margin-top:15px
  }
}
.page-wraper {
}
.loading {
  min-height: 80px;
}
.coash-list {
  padding: 10px;
}
</style>
