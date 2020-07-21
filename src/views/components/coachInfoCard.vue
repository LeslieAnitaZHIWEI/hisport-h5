<template>
  <div class="coach-info-card">
    <div class="main-content">
      <div class="avatar"><img :src="data.headImageUrl" :alt="data.nickName"></div>

      <div class="content">
        <h4 class="name">{{data.nickName}}</h4>
        <div class="level">{{coachLevelMap[data.level]}}教练</div>
        <div class="exponent">
          <span class="favorable">好评率100%</span>
          <span>被预约 10</span>
        </div>
        <div class="clients">
          <span v-for="(imgSrc, index) in data.beforeCustomHeadImageList"><img :src="imgSrc" alt=""></span>
        </div>
      </div>
    </div>

    <div class="tags">
      <van-tag v-for="(tag, index) in data.tagList" v-if="index < 4" :key="index" plain>{{tag}}</van-tag>
    </div>

    <div class="price"><strong>{{data.priceDoubleValue}}</strong>/节</div>

    <div class="corner-label" v-if="data.before === 1">预约过</div>
  </div>
</template>

<script>

import { coachLevelMap } from '@/const/coach';
export default {
  name: "CoachInfoCard",
  components: {
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      coachLevelMap,
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

.coach-info-card{
  position: relative;

  padding: 10px 15px;
  margin-bottom: 10px;

  overflow: hidden;

  border: 1px solid rgba(152, 152, 152, 0.2);
  border-radius: 10px;

  box-shadow: 0 1px 6px rgba(0,0,0,.12);

  line-height: 1.4;

  .avatar,
  .avatar img{
    width: 88px;
    height: 88px;
    border-radius: 44px;
  }
  .avatar{
    padding-top: 5px;
  }

  .main-content{
    display: flex;
    align-items: center;
    color:#666666;
  }

  .content{
    padding-left: 10px;
  }

  .name{
    margin:0;

    font-size: 16px;
    font-weight: normal;
    color:#333333;
  }

  .level{
    font-size: 12px;
  }

  .exponent{
    padding: 4px 0 6px 0;
    font-size:10px;

    .favorable{
      color:#FF4651;
    }
  }

  .clients{
    > span{
      margin-right: 2px;
    }
    img{
      width:36px;
      height: 36px;
      border-radius: 5px;
    }

  }

  .tags{
    padding-top: 3px;
    .van-tag{
      margin-right:5px;
      margin-bottom:2px;
      padding: 3px 8px;
      border-radius: 20px;

      font-size: 12px;
      color:#37C6B6;

      &::after{
        border-color: #37C6B6;
        border-radius: 12px;
      }
    }
  }

  .price{
    position: absolute;
    top: 46px;
    right: 18px;

    font-size: 12px;
    color:#FF4651;

    strong{
      font-size: 18px;
    }
  }

  .corner-label{
    position: absolute;
    top: -8px;
    right: -24px;

    padding: 18px 25px 4px 25px;

    background-color: #1BC2B1;
    color:#fff;
    font-size: 10px;

    transform:rotate(39deg);
    box-shadow: 0 0.1em 0.5em 0 rgba(0,0,0,.2);
  }
}

</style>
