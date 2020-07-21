<template>
  <div>
    <div class="wrappers">
      <div class="icon">
        <img :src="icon" alt="" />
        <div class="version">版本号1.0.0</div>
      </div>
    </div>

    <van-cell class="list" is-link @click="goIntro">
      <div slot="title" class="listSection">
        <div class="listT">企业介绍</div>
      </div>
    </van-cell>
    <div class="cross"></div>
    <van-cell class="list" is-link @click="goUser">
      <div slot="title" class="listSection">
        <div class="listT">用户协议</div>
      </div>
    </van-cell>
    <div class="cross"></div>
    <van-cell class="list" is-link @click="goPriva">
      <div slot="title" class="listSection">
        <div class="listT">隐私政策</div>
      </div>
    </van-cell>
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
  methods: {
    goIntro(){
      this.$router.push('/companyIntroduce')
    },
    goUser(){
      this.$router.push('/userAgreement')
    }
    ,
    goPriva(){
      this.$router.push('/privacy')

    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrappers {
  padding: 33.5px 14.5px;
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
  margin:0 auto;
  position: relative;
//   border-top: 1px solid #f1f1f1;
 
}
.cross:before{
    
    z-index: 2;
    content: '';
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
