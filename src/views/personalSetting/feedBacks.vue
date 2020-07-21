<template>
  <div class="wrappers">
    <van-field
      v-model="value"
      type="textarea"
      :focus="true"
      placeholder="有什么好的想法或者建议欢迎向我们反馈，嗨动的成长离不开您的关心!"
      autosize
      :border="false"
    />
    <div class="primary-btn-wrap marginT230">
      <van-button
        style="margin:0 auto;width: 73%;"
        class="primary-btn"
        type="info"
        @click="feedback"
        >提交</van-button
      >
    </div>
    <van-dialog
      v-model="show"
      :showConfirmButton="false"
      bind:close="onClose"
      width="243.5"
    >
        <div class="commit">
            <img :src="commit" alt="">
        </div>
      <div class="success">
        提交成功!
        <div class="feed">感谢您的反馈</div>
        <div class="primary-btn-wrap marginT29">
          <van-button
            style="margin:0 auto;width: 153.5px;font-weight:300"
            class="primary-btn"
            type="info"
            @click="iKnow"
            >我知道了</van-button
          >
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { feedback } from "@/api/QAndAController";
import commit from '@/assets/commit.png'
export default {
  data() {
    return {
      value: "",
      show: false,
      commit
    };
  },
  methods: {
    feedback() {
      feedback({
        content: this.value
      }).then(({ code }) => {
        console.log(code);
        if (code == 0) {
          this.show = true;
        }
      });
    },
    goSetting() {
      this.$router.push("/personalSetting");
    },
    onClose() {
      this.show = false;
    },
    iKnow(){
        this.goSetting()
    }
  }
};
</script>
<style lang="scss" scoped>
.wrappers {
  padding: 13px 16.5px;
}
.marginT230 {
  margin-top: 230px;
}
.success {
  color: #333;
  font-weight: 700;
  font-size: 23px;
  min-height: 274px;
  padding: 120px 0 0 0;
  text-align: center;
}
.feed {
  margin-top: 11.5px;
  color: #999;
  font-size: 15px;
  font-weight: 300;
}
.marginT29{
    margin-top: 29px;
}
.commit{
    width: 120px;
    height: 117.5px;
    img{
        width: 100%;
    }
    position: absolute;
    top:-15px;
    left:62.5px;
    z-index: 2003;
}
::v-deep{
    .van-dialog{
        overflow: visible;
    }
}
</style>
