<template>
  <div @click="go">
    <div class="ticket-simple">
      <div class="header">
        <div>
          <h3 class="title">{{ time }}</h3>
          <div class="content">{{ "正式课" }} <em>45-56min</em></div>
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
        <div
          class="extra"
          v-if="tag"
          :style="{ color: info.status == 0 ? 'red' : '#1bc2b1' }"
        >
          {{ status }}
          <!-- <van-icon v-if="info.status != 7" name="arrow" /> -->
        </div>
      </div>
      <div class="rip"><div class="line"></div></div>
      <div class="footer">
        <div class="avatar-name-bar">
          <div class="avatar">
            <img :src="info.coachAvatar" alt="" />
          </div>
          <div class="name">{{ info.coachNickName }}</div>
        </div>
        <div class="extra" v-if="statusBtn !== ''">
          <van-button class="primary-btn btn" type="info">{{statusBtn}}</van-button>
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
    }
  },

  computed: {
    ...mapGetters(["name"]),
    status() {
      switch (this.info.status) {
        case 0:
          return "待支付";
        case 1:
          return "已支付";
        case 2:
          return "已支付";
        case 3:
          return "已支付";
        case 4:
          return "已支付";
        case 5:
          return "已支付";
        case 6:
          return "已支付";
        case 99:
          return "已取消";
        default:
          return "";
      }
    },
    statusBtn() {
      switch (this.info.status) {
        case 0:
          return "立即支付";
        case 1:
          return "上课";
        case 2:
          return "上课";
        case 3:
          return "上课";
        case 4:
          return "上课";
        case 5:
          return "评价";
        case 6:
          return "已完成";
        case 99:
          return "查看订单";
        default:
          return "";
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
      if (status == 0) {
        this.$router.push({
          path: "/orderInfo",
          query: {
            date: this.info.beginTime,
            coachId: this.info.coachId,
            orderId: this.info.id
          }
        });
      }
      else if (status == 1 || status == 2 || status == 3 || status == 4||status == 5) {
        this.$router.push({
          path: "/orderInfo",
          query: {
            date: this.info.beginTime,
            coachId: this.info.coachId,
            orderId: this.info.id
          }
        });
      }else if (status == 99) {
        this.$router.push({
          path: "/orderInfo",
          query: {
            date: this.info.beginTime,
            coachId: this.info.coachId,
            orderId: this.info.id
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
