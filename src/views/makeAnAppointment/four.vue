<template>
  <HeaderWrap>
    <div class="page-wraper">
      <div class="panel-result">
        <div class="content">
          <div class="icon"><van-icon name="checked" /></div>
          <div><h3 class="title">预定成功</h3></div>
          <p>上课时间：{{ date }}</p>
        </div>
      </div>

      <div class="tips">
        <h3>温馨提示</h3>
        <ol>
          <li>可使用Ipad或电视投屏，上课的沉浸式体验更佳</li>
          <li>建议佩戴蓝牙耳机，音效体验感更好</li>
          <li>如有课程疑问，欢迎致电嗨动客服</li>
        </ol>
      </div>
      <div class="btn-wraper">
        <van-button class="btn primary-btn" @click="go">确定</van-button>
      </div>
    </div>
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import moment from "moment";
export default {
  created() {},
  data() {
    return {};
  },
  computed: {
    date() {
      return moment(this.$route.query.obj.beginTime).format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    go() {
      this.$router.push({ path: "/dashboard" });
    }
  },
  components: {
    HeaderWrap
  }
};
</script>

<style lang="scss" scoped>
.title {
  color: #666666;
}
.panel-result {
  margin-bottom: 20px;
}
.tips {
  padding: 15px 18px;
  margin: 0 10px;

  border-radius: 5px;

  background: #e8f9f7;

  color: #666666;

  h3 {
    text-align: center;
    font-size: 16px;
  }

  ol {
    padding-left: 15px;
    padding-bottom: 25px;
    list-style-type: decimal;
    line-height: 1.4;
    font-size: 12px;
  }
  li {
    padding: 3px 0;
    list-style-type: decimal;
  }
}
.btn-wraper {
  padding: 40px 20px 0 20px;
}
.btn {
  height: 42px;
}
</style>
