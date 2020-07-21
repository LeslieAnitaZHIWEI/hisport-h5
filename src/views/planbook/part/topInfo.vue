<template>
  <div class="book-header">

    <img class="top-img" src="../../../assets/plan.png" alt="背景" />

    <div class="top-panel">
      <div class="avatar"><img :src="avatarUrl" /></div>
      <h3 class="user-name">{{ info.username }}</h3>

      <van-row>
        <van-col span="12">性别 : <strong>{{ info.sex == 0 ? "男" : "女" }}</strong></van-col>
        <van-col span="12">联系方式 : <strong>{{ info.phone }}</strong></van-col>
        <van-col span="12">日期: <strong>{{ info.startDate }}</strong></van-col>
      </van-row>

      <div class="meta-list">
        <h4>身体参数</h4>
        <ul>
          <li>身高<strong>{{ info.height }}cm</strong></li>
          <li>体重<strong>{{ info.weight }}kg</strong></li>
          <li>BMI<strong>{{ info.bmi }}</strong></li>
          <!-- <li>体脂百分比<strong>{{ info.bfr }} </strong></li> -->
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
//
import headplan from "@/assets/plan.png";
import defaultAvatar from "@/assets/user.png";
export default {
  name: "demo",
  components: {
    // topNav:topNav
  },
  props: ["info"],
  data() {
    console.log(this.info);
    let { avatar } = this.info;
    if(!avatar){
      avatar = defaultAvatar;
    }

    return {
      userName: "",
      gender: "",
      phone: "",
      startData: "",
      height: "",
      weight: "",
      heightMass: "",
      bodyFt: "",
      headplan,
      avatarUrl: avatar,
    };
  },
  methods: {},
};
</script>
<style scoped lang="less">
.book-header{
  margin-bottom: 10px;
  .top-img{
    width: 100%;
    height: auto;
  }

  .top-panel{
    position: relative;
    background: #fff;
    margin: -70px 10px  0 15px;
    border-radius: 10px;
    padding: 20px 0;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
  }

  .avatar{
    display: inline-block;
    position: absolute;
    top: -58px;
    left: 13px;

    width: 110px;
    height: 110px;

    border: 3px solid #fff;

    background: #fff;
    border-radius: 50%;
    text-align: center;

    box-shadow: 0 1px 6px rgba(0,0,0,.12);

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border:none;
    }
  }

  .user-name{
    display: inline-block;
    margin:0;
    padding: 0 0 40px 155px;
    color: #333;
    font-size: 18px;
    text-align: left;
  }

  .meta-list{
    display: flex;
    align-items: stretch;
    text-align: center;

    h4{
      width: 20px;
      padding: 0 18px;
      margin:0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ddf6f3;

      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;

      color:#1BC2B1;
      font-weight: normal;
      font-size: 12px;
    }

    ul{
      flex: 1;

      display: flex;
      font-size: 12px;
    }

    li{
      flex: 1;
      margin: 0 4px;
      padding: 18px 2px 22px 2px;

      border-radius: 4px;

      box-shadow: 0 1px 6px rgba(0,0,0,.12);

      > strong{
        display: block;
        padding-top: 10px;
        font-size: 15px;
      }
    }
  }

  ::v-deep {
    .van-row{
      padding:0 20px;
      margin-bottom: 10px;

      font-size: 10px;
      line-height: 1.4;

      strong{
        font-size: 13px;
      }
    }

    .van-col{
      padding: 10px 0;
    }
  }
}
</style>
