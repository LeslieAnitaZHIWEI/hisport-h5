<template>
  <HeaderWrap>
    <div class="page-progress">
      <span style="width: 33.3%"></span>
    </div>
    <div class="dashboard-container">
      <h4><span class="dian"></span> 性别</h4>
      <div class="sex">
        <div
          v-for="(c, index) of sex"
          class="yuan"
          :class="{ checked: index == n }"
          :key="index"
          @click="changeList(index)"
        >
          {{ c }}
        </div>
      </div>
      <h4><span class="dian"></span> 身高体重</h4>
      <Rules
        :value="160"
        :min="120"
        :max="200"
        unit="cm"
        :onChange="changeHeight"
      ></Rules>
      <Rules :onChange="changeWeight" :value="45" :min="20" :max="150" unit="kg"></Rules>


    <BtnLink path="/makeAnAppointment/two"></BtnLink>
  </div>
  </HeaderWrap>
</template>

<script>
import Navigation from "../components/Navigation";
import HeaderWrap from "../components/HeaderWrap";
import Rules from "../components/Rules";
import BtnLink from "../components/BtnLink";
export default {
  created() {},
  data() {
    return {
      sex: ["男", "女"],
      n: 0
    };
  },
  computed: {},
  methods: {
    changeList(index) {
      this.n = index; //this指向app
      this.$store.commit("user/SET_SEX", index);
    },
    changeHeight(e) {
      this.$store.commit("user/SET_HEIGHT", e);
    },
    changeWeight(e) {
      console.log(e, "e");
      this.$store.commit("user/SET_WEIGHT", e);
    },

  },
  components: {
    HeaderWrap,
    Navigation,
    Rules,
    BtnLink
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  margin: 30px 50px;

  h4{
    font-size: 18px;
  }
  .checked {
    background: #1bc2b1;
  }
}
.sex {
  display: flex;
  justify-content: space-around;
}
.yuan {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  line-height: 76px;
  text-align: center;
  background: #d3d3d3;
  color:#fff;
  font-size: 20px;
}
</style>
