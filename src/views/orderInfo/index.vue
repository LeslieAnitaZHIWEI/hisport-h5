<template>
  <HeaderWrap>
    <van-skeleton title :row="3" :loading="pageLoading">
      <div class="page-wraper">

        <div class="ticket" v-if="beginTime">
          <div class="header">
            <div>
              <h3 class="title">{{beginTime.month() + 1}}月{{beginTime.date()}}日 周{{cnWeekList[beginTime.day()]}} {{orderInfo.beginTime.substr(11,5)}}</h3>
              <div class="content">正式课 <em>45-56min</em></div>
            </div>
          </div>
          <div class="rip"><div class="line"></div></div>
          <div class="footer">
            <div class="avatar-name-bar">
              <div class="avatar">
                <img :src="orderInfo.coachAvatar" alt="" />
              </div>
              <div class="name">{{orderInfo.coachNickName}}</div>
            </div>
          </div>
        </div>

        <div class="panel-normal">
          <div class="header">
            <h4 class="title">订单信息</h4>
          </div>

          <van-cell-group v-if="orderInfo" class="description-list">
            <van-cell title="实付款" value="￥299" />
            <van-cell title="付款方式" :value="payMethodName" />
            <van-cell title="订单编号" :value="orderInfo.id" />
            <van-cell v-if="orderInfo.payTime" title="付款时间" :value="orderInfo.payTime" />
            <van-cell v-if="orderInfo.createTime" title="创建时间" :value="orderInfo.createTime" />
            <van-cell v-if="orderInfo.beginTime" title="上课时间" :value="orderInfo.beginTime" />
            <van-cell v-if="orderInfo.classOverTime" title="下课时间" :value="orderInfo.classOverTime" />
            <van-cell v-if="orderInfo.planBookPushTime" title="课后总结时间" :value="orderInfo.planBookPushTime" />
          </van-cell-group>
        </div>

        <van-button class="btn-service" plain hairline round block @click="connectService">联系客服</van-button>

        <van-button v-if="orderInfo" class="bottom-btn" @click="goNext" :class="{bottomBtnPrimary: orderInfo.status === 0}" block>{{buttonTextMap[orderInfo.status] || '查看课程'}}</van-button>

      </div>
    </van-skeleton>
  </HeaderWrap>
</template>
<script>
import moment from 'moment';
import HeaderWrap from "../components/HeaderWrap";
import {getFormalLessonOrderById, pay} from '@/api/FormalLessonOrderController';
import { apiCatchHandler } from '@/utils/index';
import {cnWeekList} from '@/utils/date';
import {getPayMethod} from '@/utils/order';

export default {
  components: {
    HeaderWrap
  },
  data() {
    const {orderId} = this.$route.query;
    return {
      pageLoading: true,
      orderId,
      payMethod: '',
      orderInfo:null,
      beginTime: null,
      cnWeekList,
      payMethodName: '',
      buttonTextMap: {
        0: '立即付款',
        5: '立即评价',
      }
    };
  },
  created(){
    getFormalLessonOrderById({
      id: this.orderId,
    }).then(res => {

      const { code, data } = res;
      if(code === 0 && data){
        this.orderInfo = data;
        this.beginTime = moment(data.beginTime);

        const payMethod = getPayMethod(data.payType);

        this.payMethodName = payMethod ? payMethod.label: '';

      }

      this.pageLoading = false;

    }).catch(apiCatchHandler);
  },
  methods: {
    connectService(){
      this.$router.push('/myAdviser');
    },

    goNext(){
      /** 如果要支付 */
      const {status} = this.orderInfo;
      if(status === 0){
          this.$store.commit('order/SET_OrderId',this.orderInfo.id)

          this.$router.push({
          path: "/confirmOrder"
          ,
          query: {
            date: this.orderInfo.beginTime,
            coachId: this.orderInfo.coachId,
          }
        });
      }else if(status == 5){
        this.$router.push({path: '/evaluate', query: { orderId: this.orderId, isFormal: true}});
      }else{
        this.$router.push('/dashboard');
      }
    },
  }
};
</script>
<style lang="scss" scope>
.page-wraper{
  padding:10px 10px 80px 10px;
}
.ticket{
  margin-bottom: 5px;
}
.panel-normal{
  margin-bottom: 10px;
  > .header{
    padding: 5px 0;
  }
}

.btn-hairline {
  margin-top: 60px;
}
.bottomBtnPrimary{
  background: #1bc2b1;
}
</style>
