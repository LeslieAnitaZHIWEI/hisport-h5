<template>

  <HeaderWrap>
    <div class="pageContent">
      <div class="rate-list">
        <h4>教练授课</h4>
        <div class="rate-wrap">
          <van-rate
            v-model="evalCoachStar"
            allow-half
            void-icon="star"
            color="#1bc2b1"
          />
        </div>
        <h4>管家服务</h4>
        <div class="rate-wrap">
          <van-rate
            v-model="evalButlerStar"
            allow-half
            void-icon="star"
            color="#1bc2b1"
          />
        </div>
      </div>

      <div class="edit-wrap textarea-wrapper">
        <van-field
          v-model="evalContext"
          rows="5"
          autosize
          type="textarea"
          placeholder="亲您对我们的服务满意吗? 您的评价会是我们前进的最大动力哦!"
        />
      </div>

      <div class="primary-btn-wrap">
        <van-button class="primary-btn" type="info" @click="evaluate">评价</van-button>
      </div>

    </div>

</HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import { addComment, addFormalComment } from "@/api/evaluate";
import { apiCatchHandler } from '@/utils';
export default {
  created() {},
  data() {

    const { orderId, isFormal } = this.$route.query;

    return {
      orderId,
      isFormal: `${isFormal}` === 'true',
      evalCoachStar: 1,
      evalButlerStar: 1,
      evalContext: "",
    };
  },
  computed: {},
  methods: {
    evaluate() {

      const commentOrder = this.isFormal ? addFormalComment : addComment;

      commentOrder({
        evalCoachStar: this.evalCoachStar,
        evalButlerStar: this.evalButlerStar,
        evalContext: this.evalContext,
        orderId: this.$route.query.orderId
      }).then( res => {

        const {code} = res;

        if (code === 0) {
          this.$router.push('/')
        } else {
          apiCatchHandler(res);
        }

      }).catch(apiCatchHandler);
    }
  },
  components: {
    HeaderWrap,
  },
};
</script>

<style lang="scss" scoped>
.pageContent{
  min-height: 100vh;
  padding:0;
  background: #f2f2f2;
}
.rate-list{
  padding-bottom: 1px;
  background: #fff;
  h4 {
    margin-bottom: 12px;
    text-align: center;
    font-size: 15px;
    font-weight: normal;
  }
  ::v-deep {
    .van-rate__icon{
      font-size:26px;
    }
    .van-rate__item{
      padding: 0 6px;
      text-align: left;
    }
    .van-rate__icon--half{
      left:6px;
    }
  }
}
.rate-wrap{
  margin-bottom: 35px;
  text-align: center;
}

.edit-wrap{
  margin-top: 10px;
  padding: 10px;
  padding-bottom: 20px;

  background: #fff;
}

.primary-btn{
  width: 75%;
  margin: 50px auto 0 auto;
}
</style>
