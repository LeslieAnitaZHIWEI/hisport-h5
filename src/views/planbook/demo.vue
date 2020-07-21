<template>
  <HeaderWrap>
    <div class="demo-container">

      <topInfo v-if="info" :info="info" />

      <div class="section-wrap">
        <h3 class="title">运动表现测试</h3>
        <perform :testResult="testResult" />
      </div>

      <div class="section-wrap">
        <h3 class="title">健身目标</h3>
        <fitGoals :trainingTarget="trainingTarget" />
      </div>

      <div class="section-wrap">
        <h3 class="title">问题汇总</h3>
        <problemHz :problemSummary="problemSummary" />
      </div>

      <div class="section-wrap">
        <h3 class="title">训练方式</h3>
        <traiMethods :trainingMethod="trainingMethodAndTrainingVolume.trainingMethod" />
      </div>

      <div class="section-wrap">
        <h3 class="title">训练量设定</h3>
        <volume :trainingVolume="trainingMethodAndTrainingVolume.trainingVolume" />
      </div>

      <div class="section-wrap">
        <h3 class="title">目标训练周期</h3>
        <period :trainingCycle="trainingCycle" />
      </div>

      <van-button v-if="status === 6" type="primary" block class="bottom-btn" @click="goV">立即评价</van-button>
    </div>
  </HeaderWrap>
</template>

<script>
import topInfo from "./part/topInfo";
import perform from "./part/perform";
import fitGoals from "./part/fitGoals";
import problemHz from "./part/problemHz";
import traiMethods from "./part/traiMethods";
import volume from "./part/volume";
import period from "./part/period";
import * as api from "../../api/TrainingPlanBook";
import HeaderWrap from "../components/HeaderWrap";
export default {
  name: "demo",
  computed: {
    status() {
      const status = this.$route.query.status;

      if (status) {
        return parseInt(status, 10);
      }
      return 0;
    }
  },
  components: {
    topInfo,
    perform,
    fitGoals,
    problemHz,
    traiMethods,
    volume,
    period,
    HeaderWrap
  },
  data() {
    return {
      info: null,
      testResult: {
        balance: "balance",
        cardiopulmonary: "cardiopulmonary",
        muscleEndurance: "muscleEndurance",
        musclePower: "musclePower",
        posture: "posture"
      },
      trainingTarget: {
        bodyType: "bodyType",
        data: "data",
        motionShow: "motionShow",
        posture: "posture"
      },
      problemSummary: {
        injuryHistory: "injuryHistory",
        motionHistory: "motionHistory",
        motionShow: "motionShow",
        other: "other",
        posture: "posture"
      },
      trainingMethodAndTrainingVolume: {
        trainingMethod: {
          flexibilityTraining: "flexibilityTraining",
          functionalAndCardioTraining: "functionalAndCardioTraining",
          resistanceTraining: "resistanceTraining"
        },
        trainingVolume: {
          exerciseFrequency: "exerciseFrequency",
          exerciseStrength: "exerciseStrength",
          exerciseTime: "exerciseTime"
        }
      },
      trainingCycle: {
        firstStage: "firstStage",
        secondStage: "secondStage",
        thirdStage: "thirdStage"
      }
    };
  },
  created() {
    this.getTrainingPlanBookInfo(this.$route.query.orderId);
  },
  methods: {
    getTrainingPlanBookInfo(orderId) {
      api
        .getInfo({
          orderId
        })
        .then(({ data }) => {
          this.info = data;
          this.testResult = JSON.parse(data.testResult);
          this.trainingTarget = JSON.parse(data.trainingTarget);
          this.problemSummary = JSON.parse(data.problemSummary);
          this.trainingMethodAndTrainingVolume = JSON.parse(
            data.trainingMethodAndTrainingVolume
          );
          this.trainingCycle = JSON.parse(data.trainingCycle);
        });
    },
    goV() {
      this.$router.push({
        path: "/evaluate",
        query: { orderId: this.$route.query.orderId, isFormal: false }
      });
    }
  }
};
</script>
<style scoped lang="less">
.demo-container{
  padding-bottom: 60px;
}
.section-wrap{
  padding: 0 20px;
  margin-bottom: 20px;
  > .title{
    margin:0;
    padding: 10px 0;
    font-size: 18px;
    &::before{
      content: ' ';
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 5px;
      border-radius: 8px;
      border:2px solid #1BC2B1;
      vertical-align: middle;
    }
  }
}
</style>
