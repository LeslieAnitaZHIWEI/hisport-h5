<template>
  <div>
    <van-tabs class="tabs" v-model="activeName" @click="handleClick">
      <van-tab title="已回答" name="1">
        <div class="wrapperC">

          <questionLIst :list="list"></questionLIst>
          <NoDataComponent v-if="list.length === 0" />


        </div>
      </van-tab>
      <van-tab title="待回答" name="0">
          <div class="wrapperC">
            <questionLIst :list="list"></questionLIst>
            <NoDataComponent v-if="list.length === 0" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import questionS from "@/assets/questionS.png";
import answerS from "@/assets/answerS.png";
import moment from "moment";
import { getWeek } from "@/utils/index";
import {getList} from '@/api/QAndAController'
import questionLIst from '@/views/components/questionLIst'
import NoDataComponent from "@/views/components/noDataComponent";
const ENUM=['体验课','正式课']
export default {
  data() {
    return {
      activeName: "first",
      answerS,
      questionS,
      list:[]
    };
  },
  created() {
      this.getList(1)
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.getList(tab)
    },
    getList(status){
        getList({
            status
        }).then(({data})=>{
            this.list=data
        })
    },
    goDetail(id){
        this.$router.push({
            path:'/QADetail',
            query:{
                id
            }
        })
    }
  },
  computed: {
    getTime() {
      return function(data) {
        let t = moment(data.beginTime);
        return (
          t.format("YYYY/MM/DD") + " " + getWeek(t) + " "
        //   + t.format("HH:mm")
        );
      };
    },
    getLesson(){
        return function(less){
            return ENUM[less]
        }
    }
  },
  components:{
      questionLIst,
      NoDataComponent
  }
};
</script>
<style lang="scss" scoped>
.wrapperC {
  margin: 0 14.5px 15px;
}
.cardEx {
  padding: 15px 20px;
  margin-top: 10px;
}

.lesson{
    margin-left: 12px;
}

::v-deep {
  .van-tabs__wrap {
    height: 55px;
    border-bottom: 1px solid #f2f2f2;
  }
  .van-tab {
    color: #999;
  }
  .van-tab__text {
    font-size: 13px;
    font-weight: 700;
    padding-top: 3px;

  }
  .van-tab--active {
    color: #1bc2b1;
  }
  .van-tabs__line {
    max-width: 20px;
    height: 6px;
    background-color: #1bc2b1;
  }

  .van-step--vertical {
    display: flex;
    align-items: center;
  }
  .van-step__title {
    flex: 1;
  }
  .van-step--vertical .van-step__circle-container {
    top: auto;
  }
}

</style>
