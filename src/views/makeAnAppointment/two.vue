<template>
  <HeaderWrap>
    <div class="page-progress" v-if="!isModifyGoal">
      <span style="width:66.6%"></span>
    </div>
    <div class="wrapper">
      <h4 style="position:relative">
        身高体重
        <div class="HW">{{ height }}cm/{{ weight }}kg</div>
      </h4>
      <h4>健身目标</h4>
      <div class="target-title">
        您的BMI: <span class="min">{{ BMI }}</span> 为<span class="min">{{
          BMITEXT
        }}</span>
        推荐一下健身目标 :
      </div>
      <div
        class="target"
        v-for="(c, index) of target"
        :class="{ checked: c.id == goalId }"
        :key="index"
        @click="changeList(c)"
      >
        <div class="title">
          {{ c.name }}
        </div>
        {{ c.content }}
      </div>
    </div>

    <van-button type="primary" block class="bottom-btn" @click="go">{{isModifyGoal ? '确认修改' : '下一步'}}</van-button>

  </HeaderWrap>
</template>

<script>
import { getBMI } from "@/utils/index";
import { getTrainingTaget, completeInfo} from "@/api/makeAnAppointment";
import { editGoalAndPreferences } from "@/api/lessons";
import HeaderWrap from "../components/HeaderWrap";
export default {
  created() {
    this.getTrainingTaget();
  },
  data() {

    const query = this.$route.query;

    return {
      goalId: -1,
      target: [],
      isModifyGoal: query && query.modify === 'goal'
    };
  },
  computed: {
    height() {
      return this.$store.state.user.height;
    },
    weight() {
      return this.$store.state.user.weight;
    },
    BMI() {
      return getBMI(this.weight, this.height).toFixed(1);
    },
    BMITEXT() {
      var status;
      if (this.BMI > 29.9) {
        status = "重度肥胖";
      } else if (this.BMI <= 29.9 && this.BMI > 26.9) {
        status = "肥胖";
      } else if (this.BMI <= 26.9 && this.BMI > 23.9) {
        status = "偏胖";
      } else if (this.BMI <= 23.9 && this.BMI > 18.5) {
        status = "正常";
      } else {
        status = "偏瘦";
      }
      return status;
    }
  },
  methods: {
    getTrainingTaget() {
      getTrainingTaget({
        sex:this.$store.state.user.sex
      }).then(res => {
        this.target = res.data;

        if(this.isModifyGoal){
          const query = this.$route.query;
          let {goalId} = query;
          goalId = parseInt(goalId, 10);

          if(goalId || goalId === 0){
            const list = res.data.filter(item => {
              return item.id === goalId;
            });

            if(list.length !== 0){
              this.goalId = list[0].id;
            }
          }

        }

        if(this.goalId === -1){
          this.goalId = res.data[0].id;
        }

      });
    },
    changeList(item) {
      this.goalId = item.id;
    },
    go(){

      /** 如果是修改 */
      if(this.isModifyGoal){
        editGoalAndPreferences({
          fitnessGoal: this.goalId
        }).then(() => {
          const {orderId, isFormal} = this.$route.query;
          this.$router.push({path: '/lessons', query: {
            orderId,
            isFormal: `${isFormal}` === 'true',
          }});
        });
      } else {
        completeInfo({
          height:this.height,
          weight:this.weight,
          sex:this.$store.state.user.sex,
          fitnessGoal:this.goalId
        }).then(res=>{
          this.$router.push({path: '/makeAnAppointment/three', query: {
            goalId: this.goalId
          }})
        });
      }

    }
  },
  components: {
    HeaderWrap,
  }
};
</script>

<style lang="scss" scoped>
.wrapper{
  padding: 10px 35px 50px 35px;

  h4{
    font-size: 18px;
  }
}
.HW {
  position: absolute;
  text-align: center;
  top: 0px;
  left: 0;
  right: 0;
  color: #1bc2b1;
}
.target-title{
  margin-top: -10px;
  padding-bottom: 15px;
  font-size: 18px;

  .min{
    font-weight: bold;
    margin: 0 5px;
  }
}
.target {
  background: #DDFFFC;
  padding: 10px 20px 16px 20px;
  border-radius: 10px;
  color: #1CC2B1;
  border: 1px solid #A8E8E1;
  margin-bottom: 12px;
  line-height: 1.6;
  text-align: center;
  font-size: 12px;
  .title {
    font-weight: normal;
    font-size: 16px;
    padding-bottom: 5px;
  }
}
.checked{
  background: #1bc2b1;
  border-color:#1bc2b1;
  color: white;

}
</style>
