
<template>
  <div class="fitGoals-container">

    <div class="section">
      <h4>体型</h4>
      <div class="content">{{trainingTarget.bodyType}}</div>
    </div>

    <div class="section">
      <h4>体态</h4>
      <div class="content">{{trainingTarget.posture}}</div>
    </div>

    <div class="section">
      <h4>运动表现</h4>
      <div class="content">{{trainingTarget.motionShow}}</div>
    </div>

    <div class="section">
      <h4>数据</h4>
      <div class="content">{{trainingTarget.data}}</div>
    </div>
  </div>
</template>

<script>
//
export default {
  name: "fitGoals",
  components: {
    // topNav:topNav
  },
  props:['trainingTarget'],
  data() {

    return {
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">

.fitGoals-container {
  margin-top: 10px;
  padding: 5px 0;
  background: #d9f5f2;
  border-radius: 5px;
}
.section{
  display: flex;
  align-items: center;
  padding: 10px 13px 10px 20px;
  h4{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    margin:0;
    margin-right: -33px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: #1bc2b1;
    color:#fff;
    z-index: 10;
  }
  .content{
    flex: 1;
    padding: 10px 25px 10px 45px;
    border-radius: 5px;
    background: #fff;
    color:#333;
    font-size:14px;
    line-height: 1.6;
    text-align: justify;
    white-space: pre-line;
    word-break:break-all;
  }
}
</style>
