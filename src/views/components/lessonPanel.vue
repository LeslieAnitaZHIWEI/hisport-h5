<template>
  <router-link :to="{ path: '/lessons', query:{ orderId: data.id, isFormal: data.orderType === 1 }}">
    <div class="ticket">
      <div class="header">
        <div>
          <h3 class="title">{{date.month() + 1}}月{{date.date()}}日 周{{cnWeekList[date.day()]}} {{data.beginTime.substr(11,5)}}</h3>
          <div class="content">{{data.orderType === 1 ? '正式课' : '体验课'}} <em>45-56min</em></div>
          <div v-if="data.tagList.length !== 0" class="tag-list">
            <van-tag
              v-show="tagIndex < 3"
              v-for="(tag, tagIndex) in data.tagList"
              :key="tagIndex"
            >
              {{ tag }}
            </van-tag>
            <van-tag v-if="data.tagList.length > 2">...</van-tag>
          </div>
        </div>
        <div class="extra">
          {{ orderStatusMap[data.status] }}<van-icon v-if="data.orderType === 1 ? data.status != 6 : data.status != 7" name="arrow" />
        </div>
      </div>
      <div v-if="data.coachNickName" class="rip"><div class="line"></div></div>

      <div class="footer">
        <div v-if="data.coachNickName" class="avatar-name-bar">
          <div class="avatar" v-show="data.orderType != 1" v-if="data.status!=0">
            <img :src="data.coachAvatar" :alt="data.coachNickName" />
          </div>
          <div class="avatar" v-if="data.orderType === 1" >
            <img :src="data.coachAvatar" :alt="data.coachNickName" />
          </div>
          <div class="name">{{ data.coachNickName }}</div>
        </div>
      </div>

    </div>
  </router-link>
</template>
<script>
import moment from 'moment';
import {orderStatusMap, formalOrderStatusMap} from '@/const/order';
import {cnWeekList} from '@/utils/date';
export default {
  props: {
    data: {
      type: Object
    },
  },
  data(){
    console.log(this.data);
    return {
      date: moment(this.data.beginTime),
      orderStatusMap: this.data.orderType === 1 ? formalOrderStatusMap : orderStatusMap,
      cnWeekList,
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
</style>
