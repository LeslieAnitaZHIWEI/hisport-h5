<template>
  <div>
    <div class="service card-normal">
      <van-button class="btn" type="mini">嗨动</van-button>
      <div class="word">嗨动为您服务</div>
      <div class="remark">您遇到什么问题随时联系我们</div>
      <img :src="serviceG" alt="" />
    </div>
    <div class="contact">
      <van-cell
        class="list"
        is-link
        @click="copy"
        data-clipboard-text="haidong@hidbb.com"
      >
        <div slot="title" class="listSection">
          <div class="listT">企业邮箱</div>
        </div>
        <div slot="default" class="value">
          haidong@hidbb.com
        </div>
      </van-cell>
      <div class="cross"></div>
    
      <van-cell  @click="copy" class="list" is-link data-clipboard-text="17357186017">
        <div slot="title" class="listSection">
          <div class="listT">联系电话</div>
        </div>
        <div slot="default" class="value">
          17357186017
        </div>
      </van-cell>
      <div class="cross"></div>
      <van-cell
        class="list"
        is-link
        @click="copy"
        data-clipboard-text="嗨动陪练"
      >
        <div slot="title" class="listSection">
          <div class="listT">微信公众号</div>
        </div>
        <div slot="default" class="value">
          嗨动陪练
        </div>
      </van-cell>
      <div class="cross"></div>
      <van-cell
        class="list"
        is-link
        @click="copy"
        data-clipboard-text="嗨动Lisa"
      >
        <div slot="title" class="listSection">
          <div class="listT">微信号</div>
        </div>
        <div slot="default" class="value">
          嗨动Lisa
        </div>
      </van-cell>
    </div>
  </div>
</template>
<script>
import serviceG from "@/assets/serviceG.png";
export default {
  data() {
    return {
      serviceG
    };
  },
  methods: {
    copy(value) {
      this.$toast("复制成功");
    }
  },
  mounted() {
    new ClipboardJS(".list");
  }
};
</script>
<style lang="scss" scoped>
.service {
  height: 140px;
  margin: 4.5px 10px;
  padding: 30.5px 27px;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  img {
    width: 115.5px;
    height: 122.5px;
    position: absolute;
    right: 38.5px;
    bottom: 0;
  }
}
.btn {
  font-size: 14.5px;
  padding: 4.5px 8.5px;
}
.word {
  font-size: 20px;
  color: #333;
  font-weight: 700;
  margin-top: 7.5px;
  line-height: 20px;
}
.remark {
  margin-top: 7.5px;
  color: #656565;
  font-size: 13px;
}
.contact {
  margin-top: 10px;
}
.listSection {
  display: flex;
  .listT {
    margin-left: 4.5px;
  }
}
.list {
  height: 58.5px;
  padding: 19px 16px;
  font-weight: 700;
  position: relative;
}
.value {
  color: #999;
  font-weight: 300;
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
</style>
