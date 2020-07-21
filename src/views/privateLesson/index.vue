<template>
  <HeaderWrap>
    <div class="page-wraper">

      <div class="lesson-panel">

        <div class="bg" style="background-image:url(https://img.zcool.cn/community/031d2925efa88ffa801215aa040975e.jpg@260w_195h_1c_1e_1o_100sh.jpg)">
          <div class="filter"></div>
        </div>

        <div class="content">
          <div class="header">
            <h3 class="title">私教正式课</h3>
            <p>6月13日 周日 20:00</p>
          </div>
          <van-button round>进入教室</van-button>
        </div>

      </div>

      <div class="avatar-name-bar">
        <div class="avatar">
          <img src="https://img.zcool.cn/community/031d2925efa88ffa801215aa040975e.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt="" />
        </div>
        <div class="name">ddddddd</div>
      </div>

      <van-divider />

      <div class="panel-normal">
        <div class="header">
          <h4 class="title title-em">课程目标</h4>
          <div class="extra"><van-button round class="btn-small-primary">修改</van-button></div>
        </div>

        <div class="card-simple">

          <h3 class="title">减脂</h3>
          <p class="content">体脂偏高，想快速减掉赘肉，击退小肚腩， 小象腿</p>

        </div>

      </div>

      <van-divider />

      <div class="panel-normal">
        <div class="header">
          <h4 class="title title-em">课程要求</h4>
        </div>

        <div class="textarea-wrapper">
          <van-field
            v-model="content"
            rows="3"
            autosize
            type="textarea"
            placeholder="写出您对课程和教练的期望，方便教练准备哦"
          />
        </div>
      </div>

      <van-divider />

      <div class="panel-normal">
        <div class="header">
          <h4 class="title title-em">温馨提示</h4>
        </div>

        <div class="content">
          <WarmPrompt />
        </div>
      </div>

    </div>
  </HeaderWrap>

</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import WarmPrompt from "../components/warmPrompt";
export default {
  components: {
    HeaderWrap,
    WarmPrompt,
  },

  data() {
    return {
      content: ''
    };
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
.page-wraper{
  padding:0;
}
.lesson-panel{
  margin-bottom: 6px;
}
.panel-normal{
  margin: 0 18px 10px 18px;
}
</style>
