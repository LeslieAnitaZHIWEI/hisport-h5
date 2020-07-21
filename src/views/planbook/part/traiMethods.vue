
<template>
  <div class="traiMethods-container">

    <div class="section">
      <div class="img"><img :src="p1" alt="" /><span>抗阻力<br />训练</span></div>
      <div class="content">{{trainingMethod.resistanceTraining}}</div>
    </div>

    <div class="section">
      <div class="img"><img :src="p2" alt="" /><span>柔韧性<br>训练</span></div>
      <div class="content">{{trainingMethod.flexibilityTraining}}</div>
    </div>

    <div class="section">
      <div class="img"><img :src="p3" alt="" /><span>功能性及心肺<br>训练</span></div>
      <div class="content">{{trainingMethod.functionalAndCardioTraining}}</div>
    </div>
  </div>
</template>

<script>
import p1 from '@/assets/p1.png'
import p2 from '@/assets/p2.png'
import p3 from '@/assets/p3.png'
export default {
  name: "traiMethods",
  components: {
    // topNav:topNav
  },
  props:['trainingMethod'],
  data() {
    return {
      p1,
      p2,
      p3
    };
  },
  methods: {}
};
</script>
<style scoped lang="less">
.traiMethods-container{
  padding-top: 4px;
}
.section{
  display: flex;
  margin-bottom: 16px;
  .img{
    position: relative;
    padding-top: 8px;
    width: 110px;

    span{
      position: absolute;
      top: 0;
      left:0;
      width: 100%;

      padding-top: 16px;

      text-align: center;
      line-height: 1.6;
      color:#fff;

      text-shadow: 3px 3px 3px rgba(0, 0 ,0 , 0.12);

    }
  }
  img{
    width: 110px;
    height: 78px;
  }
}

.content{
  padding: 3px 7px 0 13px;
  line-height: 1.6;
  font-size: 14px;
  text-align: justify;
  white-space: pre-line;
  word-break:break-all;
}
</style>
