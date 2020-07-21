<template>
  <HeaderWrap>
    <div class="page-wraper">
      <div class="header avatar-name-bar" v-show="coachInfo">
        <div class="avatar"><img :src="coachInfo.headImageUrl" /></div>
        <div class="name">{{coachInfo.nickName}}</div>
      </div>

      <div class="day-picker">
        <div class="day-list" ref="dayListDom">
          <ul>
            <li v-for="(item, index) of dayList" :key="index" :class="{selected: currentDayIndex === index}" @click="selectDate(index)">
              <strong>{{ item.label }}</strong>
              周{{ item.week }}
              <span class="line"></span>
            </li>
          </ul>
        </div>
        <div class="extra" @click="scrollTimeList"><van-icon name="arrow" /></div>
      </div>

      <div class="time-picker">
        <div class="time-list" v-for="(item, index) of timeList" :key="index">
          <h4 class="title">{{ item.label }}</h4>
          <ul>
            <li
              v-for="(time, timeIndex) of item.list"
              :key="timeIndex"
              @click="selectTime(index, timeIndex)"
            ><span
              :class="{selected: currentTimeIndexs[0] === index && currentTimeIndexs[1] === timeIndex, disabled: time.free !== true}"
              class="inner">{{ time.time }}<van-icon name="success" v-if="time.free === false" /></span></li>
          </ul>
        </div>
      </div>

    </div>

    <van-button type="primary" block class="bottom-btn" @click="onConfirm">确定</van-button>
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import { getCoachInfo } from "@/api/coach";
import { getAllBeginTimeOnOneDay, } from "@/api/FormalLessonOrderController";
import { getDayList, getTimeList } from '@/utils/date'
import { apiCatchHandler } from '@/utils';

export default {
  created() {
    /** 默认取第一个 */
    if(this.dayList && this.dayList.length > 0){
      this.getCoachTimeList(this.dayList[0]);
    }

    this.getCoachInfo();

  },
  data() {

    const {coachId} = this.$route.query;

    const dayList = getDayList();
    const timeList = getTimeList();

    dayList[0].label = '今天';
    dayList[1].label = '明天';
    dayList[2].label = '后天';

    return {
      coachId,
      dayList,
      dateStr : '',
      currentDayIndex: 0,
      timeList,
      currentTimeIndexs: [-1, -1],
      coachInfo:null,
    };
  },
  computed: {
  },
  methods: {

    getCoachInfo(){

      getCoachInfo({
        coachId: this.coachId
      }).then(res => {

        const { code ,data } = res;

        if(code === 0 && data){
          this.coachInfo = data;
        }else{
          apiCatchHandler(res);
        }

      }).catch(apiCatchHandler);

    },

    getCoachTimeList(params){

      this.$toast.loading();

      const {year, month ,date,} = params;

      const trueMonth = month + 1;

      const dateStr = year + '-' + (trueMonth > 9 ? trueMonth : `0${trueMonth}`) + '-' + (date > 9 ? date : `0${date}`);

      this.dateStr = dateStr;

      return getAllBeginTimeOnOneDay({
        coachId: this.coachId,
        dateStr,
      }).then(res => {
        const {code ,data} = res;
        if(code === 0){
          this.updateDate(data);
        }else{
          this.$toast(res.msg);
        }

        this.$toast.clear();
      });
    },

    updateDate(dateList){

      const newList = [
        {
          label: '上午',
          list: [],
        },
        {
          label: '下午',
          list: [],
        },
        {
          label: '晚上',
          list: [],
        },
      ];

      dateList.forEach(item => {
        const {group, time, free} = item;

        let list;
        if(group === '上午'){
          list = newList[0].list;
        }else if(group === '下午'){
          list = newList[1].list;
        }else{
          list = newList[2].list;
        }

        list.push(item);
      });

      this.timeList = newList;

    },

    selectDate(index) {
      this.currentDayIndex = index;

      this.currentTimeIndexs = [-1, -1,];

      this.getCoachTimeList(this.dayList[index]);
    },
    selectTime(index, timeIndex) {

      if(this.checkIsFreeTime(index, timeIndex)){
        this.currentTimeIndexs = [index, timeIndex];
      }
    },
    scrollTimeList() {
      this.$refs.dayListDom.scrollLeft += 30;
    },

    getSelectTime(index, timeIndex){
      if(index > -1 && timeIndex > -1) {
        const timeList = this.timeList[index];

        if(timeList){
          return timeList.list[timeIndex];
        }
      }

      return null;
    },

    checkIsFreeTime(index, timeIndex){

      const time = this.getSelectTime(index, timeIndex);

      return time && time.free;
    },

    onConfirm() {
      const [index, timeIndex] = this.currentTimeIndexs;

      if(this.checkIsFreeTime(index, timeIndex)){

        const time = this.getSelectTime(index, timeIndex);
         this.$store.commit("order/SET_OrderId", '');

        this.$router.push({
          path:'/confirmOrder',
          query:{
            coachId: this.coachId,
            date: `${this.dateStr} ${time.time}:00`,
          }
        });

      }else{
        this.$toast('请选择一个有效的时候段');
      }

    }
  },
  components: {
    HeaderWrap
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper{
  padding-bottom: 60px;
}
.page-wraper{
  min-height: 100vh;
  padding:0;
  background: #f2f2f2;
}

.header{
  margin-bottom: 1px;
}

.day-picker{
  display: flex;
  align-items: center;

  margin-bottom: 7px;

  background: #fff;
  color:#333;

  .extra{
    width: 30px;
    text-align: center;

    font-size: 18px;
  }
}
.day-list{
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;

  ul{
    display: flex;
    padding-left: 20px;
    font-size: 12px;
    line-height: 1.2;
  }

  li{
    position: relative;
    flex: 1;
    padding: 13px 11px 9px 11px;
    text-align: center;

    transition: color .5s;

    strong{
      display: block;
      width: 50px;
      padding-bottom: 3px;
      font-size: 18px;
    }

    .line{
      position: absolute;
      bottom: 0;
      left:0;
      height: 4px;
      width: 100%;

      &::after{
        content: ' ';
        display: block;
        height: 4px;
        width: 0;
        margin: 0 auto;

        border-radius: 2px;
        overflow: hidden;
        background-color: #1BC1B1;
        transition: width .5s;
      }

    }
  }

  .selected{
    color:#1BC1B1;

    .line{
      &::after{
        width: 46px;
      }
    }

  }
}

.time-picker{
  padding:10px 18px;
}

.time-list{
  margin-bottom: 14px;

  border-radius: 10px;
  background: #fff;
  color: #3f3f3f;
  .title{
    padding:10px;
    margin:0;
  }
  ul{
    display: flex;
    justify-content: flex-start;
    flex-flow: row wrap;

    padding-top: 8px;
    padding-left: 10px;
    font-size: 14px;
  }
  li{
    margin: 0 0 10px 0;
    flex: 0 0 25%;
  }

  .inner{
    display: inline-block;
    padding: 10px 14px;

    border-radius: 20px;
    background: #f2f2f2;

    margin-bottom: 10px;

    transition: color .5s;
  }

  .disabled{
    position: relative;
    background: #b2b2b2;
    color:#fff;

    .van-icon{
      position: absolute;
      right: -10px;
      bottom: -1px;

      width: 24px;
      height: 24px;

      border-radius: 12px;
      border: 2px solid #fff;

      background: #b2b2b2;
      color:#fff;
      text-align: center;
      line-height: 20px;
    }

  }

  .selected{
    background: #1bc2b1;
    color:#fff;
  }
}
</style>
