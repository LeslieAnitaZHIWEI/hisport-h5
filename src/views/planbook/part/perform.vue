<template>
  <div class="perform-container">

    <div>
      <h4><img :src="heartPng" alt=""/>心肺</h4>
      <div class="content">{{ testResult.cardiopulmonary }}</div>
    </div>

    <div>
      <h4><img :src="strengthPng" alt=""/></i>肌肉力量</h4>
      <div class="content">{{ testResult.musclePower }}</div>
    </div>

    <div>
      <h4><img :src="strengthPng" alt=""/></i>肌肉耐力</h4>
      <div class="content">{{ testResult.muscleEndurance }}</div>
    </div>

    <div>
      <h4><img :src="balancePng" alt=""/></i>平衡</h4>
      <div class="content">{{ testResult.balance }}</div>
    </div>

    <div>
      <h4><img :src="posturePng" alt=""/></i>体态</h4>
      <div class="content">{{ testResult.posture }}</div>
    </div>

  </div>
</template>

<script>
//
import heartPng from "@/assets/plan/heart.png";
import balancePng from "@/assets/plan/balance.png";
import posturePng from "@/assets/plan/posture.png";
import strengthPng from "@/assets/plan/strength.png";
export default {
  name: "demo",
  components: {
    // topNav:topNav
  },
  props: ["testResult"],
  data() {
    return {
      heartPng,
      balancePng,
      posturePng,
      strengthPng
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">
.perform-container{
  padding-top: 0;
}
h4{
  margin:0;
  padding:18px 0px 12px 15px;
  img{
    width: 22px;
    height: 22px;
    margin-right: 6px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.content{
  padding: 0 16px;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-line;
  word-break:break-all;
}
</style>
