<template>
  <div>
    <div class="wrappers">
      <div class="icon">
        <img :src="icon" alt="" />
        <div class="version">版本号1.0.0</div>
      </div>

      <div class="company">嗨动吧</div>
      <div class="content">
        <p>创立于2019年，定位于在线运动社交。提供减脂、塑形、增肌、产前备孕、产后恢复、体态调整等全方位健身及护理服务。</p>

        <p>“一起嗨，一起动”，倡导健康的运动方式，做您身边的贴心健康导师。</p>
      </div>
    </div>
  </div>
</template>
<script>
import icon from "@/assets/icon.png";
export default {
  data() {
    return {
      icon
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrappers {
  padding: 33.5px 28.5px;
}
.icon {
  width: 95.5px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
.version {
  font-size: 14px;
  color: #999999;
  text-align: center;
}

.listSection {
  display: flex;
  .listT {
    margin-left: 4.5px;
    font-size: #333333;
    font-weight: 700;
  }
}
.list {
  height: 58.5px;
  padding: 19px 16px;
  font-weight: 700;
  position: relative;
}

.cross {
  width: 90%;
  height: 0;
  bottom: 0;
  margin: 0 auto;
  position: relative;
  //   border-top: 1px solid #f1f1f1;
}
.cross:before {
  z-index: 2;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid #f1f1f1;
  width: 200%;
  height: 200%;
  transform-origin: 0 0;
  transform: scale(0.5, 0.5);
  box-sizing: border-box;
}
.company {
  margin-top: 17.5px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
}
.content{
  color:#333;
  font-size: 14px;
  margin-top: 20px;
  line-height: 20.5px;

  p{
    margin: 5px 0;
    text-indent: 2em;
    text-align: justify;
  }
}
</style>
