<template>
  <div @click="go">

    <div class="ticket">
      <div class="header">
        <div>
          <h3 class="title">{{ time }}</h3>
          <div class="content">{{ info.type==1?'正式课':'体验课' }} <em>45-56min</em></div>
          <div v-if="tagList.length !== 0" class="tag-list">
            <van-tag
              v-show="index < 3"
              v-for="(item, index) in tagList"
              :key="index"
            >
              {{ item }}
            </van-tag>
            <van-tag v-if="tagList.length > 2">...</van-tag>
          </div>

        </div>
        <div class="extra" v-if="tag">
          {{ status }}<van-icon v-if="info.status != 7" name="arrow" />
        </div>
      </div>
      <div class="rip"><div class="line"></div></div>
      <div class="footer">
        <div class="avatar-name-bar">
          <div class="avatar" v-if="info.status!=0">
            <img :src="info.coachAvatar" alt="" />
          </div>
          <div class="name">{{ info.coachNickName }}</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import moment from "moment";
import { getWeek } from "@/utils/index";
import { mapGetters } from "vuex";
export default {
  props: {
    info: {
      type: Object
    },
    tagList: {
      type: Array,
      default: () => []
    },
    tag: {
      type: Boolean,
      default: () => true
    },

  },

  computed: {
    ...mapGetters(["name"]),
    status() {
      switch (this.info.status) {
        case 0:
          return "待受理";
        case 1:
          return "待排课";
        case 2:
          return "进入教室";
        case 3:
          return "进入教室";
        case 4:
          return "查看作业";
        case 5:
          return "查看作业";
        case 6:
          return "查看作业";
        case 7:
          return "已完成";
        case 99:
          return "已取消";
        default:
          return '';
      }
    },
    time() {
      let t = moment(this.info.beginTime);
      return t.format("MM月DD日") + " " + getWeek(t) + " " + t.format("HH:mm");
    }
  },
  methods: {
    go() {
      const status = this.info.status;
      if (
        status == 4 ||
        status == 5 ||
        status == 6
      ) {
        this.$router.push({
          path: "/training"
        });
      }else if (status != 7) {
        if (this.info.id) {
          this.$store.commit("order/SET_OrderId", this.info.id);
        }

        this.$router.push({
          path: "/lessons",
          query: {
            orderId: this.info.id,
            isFormal: this.info.orderType === 1
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
