<template>
  <div class="wrapperS">
    <CardInfo :tag="false" :info="info"></CardInfo>
    <div class="questionCard">
      <div class="question">
          <div class="questionT">
              要带球吗
          </div>
          <div class="questionP">
              <div class="pic">
                <img :src="customerAvatar" alt="">
              </div>
              <div class="remark">
                  {{customer}}提问于{{getTime(createTime)}}
              </div>
          </div>
      </div>
      <div class="answer">
           <div class="questionP">
              <div class="pic">
                <img :src="info.coachAvatar" alt="">
              </div>
              <div class="remark">
                  {{info.coachNickName}}
              </div>
          </div>
          <section class="answerContent">{{answer}}</section>
          <div class="answerTime">
              {{getTime(answerTime)}}
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getInfo } from "@/api/QAndAController";
import CardInfo from "../components/CardInfo";
import moment from 'moment'
export default {
  created() {
    console.log(this.$route);
    this.getInfo();
  },
  data() {
    return {
      info: {
        beginTime: "",
        coachAvatar: "",
        coachNickName: ""
      },
      customerAvatar:'',
      customer:'',
      createTime:'',
      answer:'',
      answerTime:''
    };
  },
  methods: {
    getInfo() {
      getInfo({
        id: this.$route.query.id
      }).then(({ data }) => {
        this.info = data.lessonOrder;
        this.customerAvatar=data.customerAvatar
        this.customer=data.customer
        this.createTime=data.createTime
        this.answer=data.answer
        this.answerTime=data.answerTime
      });
    }
  },
  components: {
    CardInfo
  },
  computed:{
      getTime(){
          return function(value){
              return moment(value).format('YYYY/MM/DD')
          }
      }
  }
};
</script>
<style lang="scss" scoped>
.wrapperS {
  padding: 19.5px 15px;
}
.pic{
    width: 27px;
    height: 27px;
    img{
        width: 100%;
        border-radius: 50%;
    }
}
.questionCard {
  min-height: 244px;
  position: relative;
}
.questionP{
    margin-top: 9.5px;
    display: flex;
}
.question {
  min-height: 81px;
  background: #ebfffd;
  margin-top: 11.5px;
  border-radius: 10px 10px 0 0;
//   position: absolute;
//   top: 0;
  width: 100%;
  padding: 16px 18.5px 10px;
}
.answer {
  min-height: 113px;
//   position: absolute;
//   bottom: 0;
  width: 100%;
  border-radius: 0 0 10px 10px;
  padding: 16px 18.5px 10px;
  box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.1);

  background: white;
}
.questionT{
    font-size: 17px;
    color: #333;
    font-weight: 700;
    line-height: 16px;
}
.remark{
    margin-left: 9.5px;
    font-size: 12px;
    color:#666;
    line-height: 27px;
}
.answerContent{
    font-size: 15px;
    color:#333;
    margin-top: 17px;
    font-weight: 700;
}
.answerTime{
    color:#999;
    margin-top: 17px;
    font-size: 13px;
}
</style>
