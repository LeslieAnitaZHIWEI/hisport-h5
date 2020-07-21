<template>
  <HeaderWrap>
    <div class="page-wraper">
      <router-link
        :to="{
          path: '/planbook',
          query: { orderId: orderData.id, status: orderData.orderStatus }
        }"
      >
        <div v-if="planLevelData" class="card-normal">
          <div class="main-content">
            <div class="header">
              <h3 class="title">{{ planLevelData.title }}</h3>
              <p>{{ planLevelData.description }}</p>
            </div>
            <div class="content">
              今天是<strong>第{{ orderData.day }}天</strong>
            </div>
          </div>
          <div class="extra">
            查看<van-icon name="arrow" /><van-icon name="arrow" />
          </div>
        </div>
      </router-link>

      <van-divider />

      <div v-if="isEligibility" class="panel-action">
        <img src="../../assets/forward-lession.jpg" alt="约新课程" />

        <div class="content">
          <h3 class="title">您预约的课程已上完<br />去约新课程吧！</h3>

          <van-button class="btn-primary" @click="forwardLession"
            >立即约课</van-button
          >
        </div>
      </div>
      <div v-if="isEligibilityE" class="panel-action">
        <img src="../../assets/forward-lession.jpg" alt="约新课程" />

        <div class="content">
          <h3 class="title"><br />去约体验课吧！</h3>

          <van-button class="btn-primary" @click="forwardLessionE"
            >立即约课</van-button
          >
        </div>
      </div>

      <van-divider v-if="isEligibility" />

      <div v-if="currentOrderList.length !== 0" class="current-wrpper">
        <LessonPanel
          v-for="item in currentOrderList"
          :key="item.id"
          :data="item"
        />
      </div>

      <div
        class="panel-normal"
        v-show="historyList.length !== 0 || formalHistoryList.length !== 0"
      >
        <div class="header">
          <h4 class="title">历史记录</h4>
        </div>

        <LessonPanel
          v-for="item in historyList"
          :key="item.id"
          v-show="item.status == 7 || item.status == 99"
          :data="item"
        />

        <van-list
          v-model="orderLoading"
          :finished="orderFinished"
          finished-text=""
          @load="onLoadOrders"
        >
          <LessonPanel
            v-for="item in formalHistoryList"
            v-show="item.status == 6 || item.status == 99"
            :key="item.id"
            :data="item"
          />
        </van-list>

        <van-divider v-show="orderFinished" />
      </div>

      <BottomNavBar index="dashboard" />
    </div>
  </HeaderWrap>
</template>

<script>
import { mapGetters } from "vuex";
import BottomNavBar from "../components/bottomNavBar";
import HeaderWrap from "../components/HeaderWrap";
import LessonPanel from "../components/lessonPanel";
import { checkIsEligibility } from "@/utils/order";
import {
  getMyLessonOrderPage,
  getPlan,
  isEligibilityExp
} from "@/api/dashbord";
import { getMyFormalLessonOrderPage } from "@/api/FormalLessonOrderController";
import { getPlanLevelByDay } from "@/utils/plan";
export default {
  data() {
    return {
      pageLoading: true,
      showPanel: false,
      orderData: {},
      planLevelData: null,
      currentOrderList: [],
      historyList: [],
      formalHistoryList: [],
      orderLoading: false,
      orderFinished: false,
      orderNextPage: 1,
      isEligibility: false,
      isEligibilityE: false
    };
  },
  created() {
    this.init();

    this.onLoadOrders();
  },
  computed: {
    // ...mapGetters(['isEligibility']),
  },
  methods: {
    async init() {
      const isEligibility = await checkIsEligibility();

      this.isEligibility = isEligibility;

      getPlan().then(res => {
        const { code, data } = res;

        if (code === 0 && data) {
          const { day } = data;
          this.orderData = data;

          this.planLevelData = getPlanLevelByDay(day);
        }
      });
      this.checkExper();
      getMyLessonOrderPage().then(res => {
        const { code, data } = res;

        if (code === 0 && data) {
          const { tag } = data;

          if (tag) {
            data.tagList = tag.split(",");
          } else {
            data.tagList = [];
          }

          /** 如果还是在体验 */
          if (!this.isEligibility) {
            /** 体验课不等于7，显示图片 */
            if (data.status !== 7) {
              this.showPanel = data.status !== 7;
            }
          }

          if (data.status !== 7) {
            const newList = this.currentOrderList;
            newList.push(data);

            this.currentOrderList = newList.sort((a, b) => {
              if (a.orderType === 1 && b.orderType === 0) {
                return -1;
              }
              return 0;
            });
          } else {
            // this.showPanel = !(this.currentOrder);
            this.historyList = [data];
          }
        } else {
          this.noFirst = false;
        }
      });
    },
    checkExper() {
      isEligibilityExp().then(res => {
        if (res.data == 1) {
          this.isEligibilityE = true;
        }
      });
    },

    onLoadOrders() {
      getMyFormalLessonOrderPage({
        current: this.orderNextPage,
        size: 10
      }).then(res => {
        const { code, data } = res;

        if (code === 0 && data) {
          data.records.forEach(item => {
            const { tag, status } = item;

            if (tag) {
              item.tagList = tag.split(",");
            } else {
              item.tagList = [];
            }

            if (status !== 6 && status !== 99) {
              const newList = this.currentOrderList;
              newList.push(item);

              this.currentOrderList = newList.sort((a, b) => {
                if (a.orderType === 1 && b.orderType === 0) {
                  return -1;
                }
                return 0;
              });
            } else {
              this.formalHistoryList.push(item);
            }
          });

          this.showPanel = !this.currentOrder;

          this.checkLastPage(data.pages);
        }
      });
    },

    checkLastPage(pages) {
      if (pages <= this.orderNextPage) {
        this.orderFinished = true;
      } else {
        this.orderNextPage = this.orderNextPage + 1;
      }
    },

    forwardLession() {
      const path = this.isEligibility
        ? "/recomcoach"
        : "/makeAnAppointment/one";

      this.$router.push({ path });
    },
    forwardLessionE() {
      this.$router.push("/makeAnAppointment/one");
    }
  },
  components: {
    BottomNavBar,
    HeaderWrap,
    LessonPanel
  }
};
</script>

<style lang="scss" scoped>
.page-wraper {
  padding-bottom: 60px;
}
.panel-action {
  border-radius: 10px;
  overflow: hidden;

  .title {
    font-size: 20px;
    font-weight: normal;
  }
}
.current-wrpper {
  margin-bottom: 10px;
}
.van-divider {
  margin-bottom: 10px;
}
::v-deep .ticket {
  margin-bottom: 10px;
}
.btn-primary {
  border: none;
}
</style>
