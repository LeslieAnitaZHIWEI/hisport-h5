<template>
  <HeaderWrap>
    <div class="page-progress">
      <span style="width:100%"></span>
    </div>
    <div class="wrapper">
      <div class="project-card-wrap" v-if="target">
        <div class="project-card">
          <h2 class="title">{{target.name || ''}}</h2>
          <van-button class="btn-modify" @click="goBack">修改</van-button>
          <p class="content">
            {{target.content}}
          </p>
        </div>
      </div>

      <div class="data-select">
        <div class="datewrap" :style="{ width: xWidth + 'px' }">
          <div
            class="piece"
            v-for="(c, index) of dateList"
            :class="{ checked: index == check }"
            :key="index"
            @click="changeList(index)"
          >
            <div class="title">
              {{ c.day }}
            </div>
            {{ c.week }}
          </div>
        </div>
      </div>
      <div class="dateCard">
        <h5>上午</h5>
        <div class="card-list">
          <div
            @click="changeTagList(item.id)"
            class="tag-wrap"
            v-for="(item, index) in am"
            :key="index"
          >
            <div class="individuationTag tag"
            :class="{ dateChecked: item.id == timeC }">
              {{ item.time }}
            </div>
          </div>
        </div>
      </div>
      <div class="dateCard">
        <h5>下午</h5>
        <div class="card-list">
          <div
            @click="changeTagList(item.id)"
            class="tag-wrap"
            v-for="(item, index) in pm"
            :key="index"
          >
            <div class="individuationTag tag"
              :class="{ dateChecked: item.id == timeC }">
              {{ item.time }}
            </div>
          </div>
        </div>
      </div>
      <div class="dateCard">
        <h5>晚上</h5>
        <div class="card-list">
          <div
            @click="changeTagList(item.id)"
            class="tag-wrap"
            v-for="(item, index) in ev"
            :key="index"
          >
            <div class="individuationTag tag"
              :class="{ dateChecked: item.id == timeC }">
            {{ item.time }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-button type="primary" block class="bottom-btn" @click="go">立刻免费预约体验</van-button>
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import { currentUserInfo, appointment,getTrainingTaget } from "@/api/makeAnAppointment";
const timeList = [
  { time: "09:00", id: 0 },
  { time: "10:00", id: 1 },
  { time: "11:00", id: 2 },
  { time: "12:00", id: 3 },
  { time: "13:00", id: 4 },
  { time: "14:00", id: 5 },
  { time: "15:00", id: 6 },
  { time: "16:00", id: 7 },
  { time: "17:00", id: 8 },
  { time: "18:00", id: 9 },
  { time: "19:00", id: 10 },
  { time: "20:00", id: 11 }
];

const oneDayTime = 24*60*60*1000;
let startDate = new Date(new Date().getTime()+ oneDayTime);

// 初始化结束时间
const endDate = new Date(startDate.valueOf() + 29 * oneDayTime);

// 创建日期数组
let dataArr = [];

// 创建周数据
const weeks = ["日", "一", "二", "三", "四", "五", "六"];
let dayIndex = 1;

// while循环  结束时间与开始时间毫秒数相减
console.log(endDate.getTime() - startDate.getTime());
while (endDate.getTime() - startDate.getTime() >= 0) {
  // 判断月，天长度 是否是1，是一位数前面加0 ，否则直接使用
  let month = startDate.getMonth() + 1;

  let day = startDate.getDate();
  let monthDay;

  const week = `周${weeks[startDate.getDay()]}`;

  if(dayIndex === 1){
    monthDay = '明天';
  }else if(dayIndex === 2){
    monthDay = '后天';
  }else{
    monthDay = month + "/" + day;
  }

  month =
    month.toString().length == 1
      ? "0" + month.toString()
      : month;

  day =
    day.toString().length == 1
      ? "0" + day
      : day;

  dataArr.push({
    week,
    day: monthDay,
    date: `${month}-${day}`,
  });

  startDate.setDate(startDate.getDate() + 1);
  dayIndex ++;
}

export default {
  created() {
    this.getTrainingTaget();
    this.currentUserInfo();
  },
  data() {
    return {
      beginTime: "",
      dateList: dataArr,
      check: 0,
      timeC: 0,
      target: null
    };
  },
  appointmentData: {},
  computed: {
    xWidth() {
      return this.dateList.length * 68;
    },
    am() {
      return timeList.slice(0, 4);
    },
    pm() {
      return timeList.slice(4, 10);
    },
    ev() {
      return timeList.slice(10, 12);
    }
  },
  methods: {
    getTrainingTaget() {
      const { query } = this.$route;
      const { goalId } = query;

      if (goalId) {
        getTrainingTaget().then(res => {

          /** 找到当前选的项目 */
          const targets = res.data.filter(item => {
            return item.id === goalId;
          });
          if (targets && targets.length === 1) {
            this.target = targets[0];
          } else {
            history.back();
          }
        });
      } else {
        history.back();
      }


    },
    currentUserInfo() {
      currentUserInfo();
    },
    changeList(index) {
      this.check = index;
    },
    changeTagList(index) {
      this.timeC = index;
    },
    go() {

      let date = this.dateList[this.check].date;
      let time;
      timeList.forEach(ele => {
        if (ele.id == this.timeC) {
          time = ele.time;
        }
      });

      appointment({
        beginTime: date + " " + time
      }).then(res=>{

        if(res.code === 0){
          this.$store.commit("order/SET_OrderId", res.data.orderId);
          /** 强制刷新用户是否完善信息 */
          this.$store.dispatch('user/checkisFinished', {force: true});
          this.$router.push({path:'/makeAnAppointment/four',query:{obj:res.data}});
        }else{
          this.$toast(res.msg || '抱歉，请稍侯再试。');
          this.$router.push('/');

          this.$store();
        }

      });
    },
    goBack(){
      history.back();
    }
  },
  components: {
    HeaderWrap
  }
};
</script>

<style lang="scss" scoped>
.wrapper{
  min-height: 100vh;
  padding: 0 0 60px 0;
  background-color:#F2F2F2;
}
.project-card-wrap{
  padding: 5px 34px;
  background: #fff;
  margin-bottom: 4px;
}
.project-card{
  position: relative;
  background: #1bc2b1;
  border:1px solid #1bc2b1;
  color: white;
  padding: 10px 20px 16px 20px;
  border-radius: 10px;
  line-height: 1.8;
  text-align: center;
  font-size: 12px;
  .title {
    margin:0;
    padding-bottom: 5px;
    font-weight: normal;
    font-size: 16px;
  }
  .content{
    margin:0;
  }

  .btn-modify{
    position: absolute;
    top: 10px;
    right: 16px;
    height: 28px;
    border-radius: 15px;
    padding: 0 18px;
    color:#1BC1B1;
  }
}
.data-select{
  overflow-x:scroll;
  background: #fff;
  margin-bottom: 8px;
}
.dateCard {
  background: #fff;
  margin:0 10px 10px 10px;
  border-radius: 10px;

  h5{
    padding: 10px 10px;
    font-size: 14px;
  }
}
.datewrap {
  height: 64px;
  text-align: center;
  font-size: 12px;
  .title{
    padding: 14px 0 2px 0;
    font-size: 18px;
    font-weight: normal;
  }
}
h5 {
  margin: 0;
  padding: 20px;
}
.piece {
  float: left;
  width: 40px;
  height: 100%;
  margin: 0 14px;
}
.checked {
  position: relative;
  color: #1bc2b1;

  &::before{
    content: '';
    position: absolute;
    left: 4px;
    bottom:0;

    width: 32px;
    height: 2px;

    background:#1BC1B1;
  }
}
.card-list{
  padding: 10px 5px;
}
.tag-wrap{
  display: inline-block;
  width: 25%;
  margin-bottom: 10px;
  text-align: center;
}
.tag {
  padding: 5px 14px;
  background-color: #F1F1F1;
  border:none;
  line-height: 1.8;
  color:#333333;
  border-radius: 25px;
}
.disabledTag{
  position: relative;
  background: #B2B2B2;
  color:#fff;

  .van-icon{
    position: absolute;
    top: 10px;
    right: -12px;
    width:24px;
    height: 24px;

    border: 2px solid #fff;
    border-radius: 20px;

    line-height: 24px;
    text-align: center;
    background: #B2B2B2;
  }
}
.dateChecked {
  background: #1BC1B1;
  color: #fff;
}
</style>
