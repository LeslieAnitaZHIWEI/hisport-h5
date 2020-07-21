
<template>
  <div class="period-container">

    <img :src="cycle" alt="">

    <section>
      <h4>第一阶段</h4>
      <div class="content">{{trainingCycle.firstStage}}</div>
    </section>

    <section>
      <h4>第二阶段</h4>
      <div class="content">{{trainingCycle.secondStage}}</div>
    </section>

    <section>
      <h4>第三阶段</h4>
      <div class="content">{{trainingCycle.thirdStage}}</div>
    </section>
  </div>
</template>

<script>
import cycle from '@/assets/cycle.png'
export default {
  name: "period",
  props:['trainingCycle'],
  components: {
    // topNav:topNav
  },
  data() {
    return {
      cycle
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">
.period-container{

  img{
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
  section{
    position: relative;
    background:#EFFFFD;
    border-radius: 5px;
    margin-bottom: 38px;
  }
  h4{
    position: absolute;
    top: -39px;
    left:0;
    width:100%;
    padding: 10px 0;
    text-align: center;
    font-size:16px;
    font-weight: normal;
    color:#1BC2B1;

  }
  .content{
    padding: 26px 26px 26px 20px;
    line-height: 1.6;
    text-align: justify;
    white-space: pre-line;
    word-break:break-all;
  }
}
</style>
