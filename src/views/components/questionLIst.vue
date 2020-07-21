<template>
  <div>
    <div
      class="card cardEx"
      @click="goDetail(item.id, item.answer)"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="top">
        <div class="orangeS">
          <img :src="questionS" alt="" />
        </div>
        <div class="questionS">
          {{ item.question }}
        </div>
      </div>
      <div class="middle" v-show="item.answer != ''">
        <div class="orangeS">
          <img :src="answerS" alt="" />
        </div>
        <div class="answerS">
          {{ item.answer }}
        </div>
      </div>
      <div class="bottom">
        <span>来自课程</span> <span class="date">{{ getTime(item) }}</span>
        <span class="lesson">{{ getLesson(item.type) }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import questionS from "@/assets/questionS.png";
import answerS from "@/assets/answerS.png";
import moment from "moment";
import { getWeek } from "@/utils/index";
const ENUM = ["体验课", "正式课"];
export default {
  props: ["list"],
  created() {
    console.log(this.list);
  },
  data() {
    return {
      questionS,
      answerS
    };
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
    getLesson() {
      return function(less) {
        return ENUM[less];
      };
    }
  },
  methods: {
    goDetail(id, answer) {
      if (answer) {
        this.$router.push({
          path: "/QADetail",
          query: {
            id
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.cardEx {
  padding: 15px 20px;
  margin-top: 10px;
}
.top,
.middle,
.bottom {
  line-height: 10px;
  display: flex;
}

.middle {
  margin-top: 12.5px;
}
.bottom {
  margin-top: 17px;
  span {
    color: #666;
  }
}
.orangeS {
  width: 19px;
  flex-shrink: 0;
  img {
    width: 100%;
    border: none;
  }
}
.date {
  margin-left: 12px;
  font-size: 15px;
  font-weight: 700;
}
.lesson {
  margin-left: 12px;
  font-size: 15px;
  font-weight: 700;
}
.questionS {
  font-size: 16px;
  color: #333;
  line-height: 19px;
  margin-left: 9px;
}
.answerS {
  font-size: 14px;
  color: #666;
  margin-left: 11px;
  line-height: 19px;
}
</style>
