<template>
  <div class="volume-container">

    <div class="section">
      <h4 class="frequency">频率</h4>
      <div class="content">{{ trainingVolume.exerciseFrequency }}</div>
    </div>

    <div class="section">
      <h4 class="time">时间</h4>
      <div class="content">{{ trainingVolume.exerciseTime }}</div>
    </div>

    <div class="section">
      <h4 class="strong">强度</h4>
      <div class="content">{{ trainingVolume.exerciseStrength }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "volume",
  components: {
    // topNav:topNav
  },
  props: ["trainingVolume"],
  data() {
    return {
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">
.volume-container{
  display: flex;
  justify-content:center;
  padding-top: 20px;
}
.section{
  flex: 1;
  padding: 0 15px;
  text-align: center;
  line-height: 1.6;

  .content{
    text-align: justify;
    white-space: pre-line;
    word-break:break-all;
    text-align: center;
  }
}
h4{
  width: 86px;
  height: 86px;
  margin:0 auto 22px auto;
  padding-top: 48px;
  box-sizing: border-box;
  border-radius: 50%;
  background:#f1f1f1 url(../../../assets/p4.png) no-repeat center 15px;
  background-size: 30% 30%;

  font-size: 16px;
  font-weight: normal;
  color:#000;
}
h4.time{
  background-image: url(../../../assets/p5.png);
}
h4.strong{
  background-image: url(../../../assets/p6.png);
}
</style>
