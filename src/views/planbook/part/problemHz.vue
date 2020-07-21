
<template>
  <div class="problemHz-container">

    <div class="sectin">
      <h4>伤病史</h4>
      <div class="content">{{problemSummary.injuryHistory}}</div>
    </div>

    <div class="sectin">
      <h4>运动史</h4>
      <div class="content">{{problemSummary.motionHistory}}</div>
    </div>

    <div class="sectin">
      <h4>体态</h4>
      <div class="content">{{problemSummary.posture}}</div>
    </div>

    <div class="sectin">
      <h4>运动表现</h4>
      <div class="content">{{problemSummary.motionShow}}</div>
    </div>

    <div class="sectin">
      <h4>其他</h4>
      <div class="content">{{problemSummary.other}}</div>
    </div>
  </div>
</template>

<script>
//
export default {
  name: "problemHz",
  components: {
    // topNav:topNav
  },
  props:['problemSummary'],
  data() {
    return {
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">
.problemHz-container{
  padding-top: 10px;
}
h4{
  margin:0;
  padding: 12px 10px 12px 10px;
  background-image: linear-gradient(to right, #fff8f7 , #fff);
  color:#c9a7a2;
  font-size: 16px;
  font-weight: normal;
}
.content{
  margin-bottom: 20px;
  padding: 14px 5px 5px 12px;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-line;
  word-break:break-all;
}
</style>
