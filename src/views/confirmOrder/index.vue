<template>
  <HeaderWrap>
    <div class="page-wraper">
      <div class="ticket">
        <div class="header">
          <div>
            <h3 class="title">{{ time(date) }}</h3>
            <div class="content">正式课 <em>45-56min</em></div>
            <div class="tag-list">
              <!-- <van-tag>
                干部的校
              </van-tag>
              <van-tag>...</van-tag> -->
            </div>
          </div>
        </div>
        <div class="rip"><div class="line"></div></div>
        <div class="footer">
          <div class="avatar-name-bar">
            <div class="avatar">
              <img :src="coachAvatar" alt="" />
            </div>
            <div class="name">{{ coachNickName }}</div>
          </div>
        </div>
      </div>

      <div class="panel-normal">
        <div class="header">
          <h4 class="title">结算详情</h4>
        </div>

        <van-cell-group>
          <van-cell title="课程总价" :value="`￥${priceDoubleValue}`" />
          <van-cell title="优惠券" value="-0" />
        </van-cell-group>
        <van-divider />
        <van-cell-group class="actual-pay">
          <van-cell title="实付款" :value="`￥${priceDoubleValue}`" />
        </van-cell-group>
      </div>

      <div class="panel-normal pay-method-panel">
        <div class="header">
          <h4 class="title">付款方式</h4>
        </div>

        <div class="pay-method">
          <van-radio-group v-model="payMethod">
            <van-cell-group>
              <van-cell
                class=""
                title="微信支付"
                clickable
                @click="changePayMethod('0')"
              >
                <template #icon="props">
                  <span class="icon-pay"><svg-icon icon-class="wechat"/></span>
                </template>
                <template #right-icon>
                  <van-radio name="0" />
                </template>
              </van-cell>
              <van-cell
                title="支付宝支付"
                clickable
                @click="changePayMethod('1')"
              >
                <template #icon="props">
                  <span class="icon-pay icon-alipay"
                    ><svg-icon icon-class="alipay"
                  /></span>
                </template>
                <template #right-icon>
                  <van-radio name="1" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
    </div>

    <div class="bottom-operation">
      <div class="pay">
        实付款：<strong>￥{{ priceDoubleValue }}</strong>
      </div>

      <div class="operation">
        <van-button @click="commitOrder" :disabled="noButton"
          >提交订单</van-button
        >
      </div>
    </div>
  </HeaderWrap>
</template>
<script>
import HeaderWrap from "../components/HeaderWrap";
import moment from "moment";
import { getWeek, apiCatchHandler } from "@/utils/index";
import { customerBooking, pay } from "@/api/FormalLessonOrderController";
import { getCoachInfo } from "@/api/coach";
import { getFormalOrderStatus } from "@/api/FormalLessonOrderController";
import { mapGetters } from "vuex";
export default {
  components: {
    HeaderWrap
  },
  created() {
    // this.commitOrder();
    this.getCoachInfo();
    if (this.orderId) {
      this.getStatus(this.orderId);
    }
  },
  data() {
    const { date, coachId } = this.$route.query;
    return {
      payMethod: "0",
      date,
      coachAvatar: "",
      coachNickName: "",
      coachId,
      priceDoubleValue: 0,
      noButton: false,
      timer:''
    };
  },
  beforeDestroy() {
    if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearTimeout(this.timer); //关闭
    }
},
  methods: {
    getStatus(orderId) {
      getFormalOrderStatus({
        orderId
      }).then(({ data }) => {
        this.status = data;
        if (data == 0) {
          this.timer = setTimeout(() => {
            this.getStatus(orderId);
          }, 1000);
        } else {
          clearTimeout(this.timer);
          this.$router.push({
            path: "/payResult",
            query: {
              orderId
            }
          });
        }
      });
    },
    changePayMethod(method) {
      console.log(method);
      this.payMethod = method;
    },
    commitOrder() {
      // this.noButton = true;
      console.log(this.orderId,'orrrrrrderid')
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      if (this.payMethod == 0) {
        if (this.orderId) {
          //如果订单是待支付
          getFormalOrderStatus({
            orderId: this.orderId
          }).then(({ data }) => {
            if (data == 0) {
              pay({
                orderId: this.orderId,
                payType: this.payMethod
              })
                .then(({ code, data, msg }) => {
                  this.$toast.clear();

                  if (code == 0) {
                    this.onBridgeReady(data.params);
                  } else {
                    this.$toast(msg);
                  }
                })
                .catch(apiCatchHandler);
            }
          });
        } else {
          customerBooking({
            coachId: this.coachId,
            beginTime: this.date,
            payType: this.payMethod
          })
            .then(res => {
              const { code, data } = res;
              if (code == 0) {
                this.$store.commit("order/SET_OrderId", data.orderId);

                this.getStatus(data.orderId);
                if (typeof WeixinJSBridge == "undefined") {
                      this.$toast.clear();
                  this.$toast("请在微信浏览器中调起支付");
                } else {
                  pay({
                    orderId: data.orderId,
                    payType: this.payMethod
                  })
                    .then(({ code, data, msg }) => {
                      this.$toast.clear();

                      // if (code == 0) {

                      // }

                      // if (document.addEventListener) {
                      //   document.addEventListener(
                      //     "WeixinJSBridgeReady",
                      //     onBridgeReady,
                      //     false
                      //   );
                      // } else if (document.attachEvent) {
                      //   document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
                      //   document.attachEvent(
                      //     "onWeixinJSBridgeReady",
                      //     onBridgeReady
                      //   );
                      // }
                      if (code == 0) {
                        this.onBridgeReady(data.params);
                      } else {
                        this.$toast(msg);
                      }
                    })
                    .catch(apiCatchHandler);
                }
              } else {
                apiCatchHandler(res);
                      this.$toast.clear();

              }
            })
            .catch(apiCatchHandler);
        }
      } else {
        if (this.orderId) {
          //如果订单是待支付
          getFormalOrderStatus({
            orderId: this.orderId
          }).then(({ data }) => {
            if (data == 0) {
              pay({
                orderId: this.orderId,
                payType: this.payMethod
              }).then(({ code, data, msg }) => {
                if (code == 0) {
                  this.$toast.clear();

                  this.$router.push({
                    path: "/payMask",
                    query: {
                      rid: data.rid
                    }
                  });
                } else {
                  this.$toast(res.msg);
                }
              });
            }
          });
        } else {
          customerBooking({
            coachId: this.coachId,
            beginTime: this.date,
            payType: this.payMethod
          }).then(res => {
            const { code, data } = res;
            this.$store.commit("order/SET_OrderId", data.orderId);

            this.getStatus(data.orderId);
            if (code == 0) {
              pay({
                orderId: data.orderId,
                payType: this.payMethod
              }).then(({ code, data, msg }) => {
                this.$toast.clear();

                if (code == 0) {
                  // let divForm = document.getElementsByTagName("divform");
                  // if (divForm.length) {
                  //   document.body.removeChild(divForm[0]);
                  // }
                  // const div = document.createElement("divform");
                  // div.innerHTML = data.params; // data就是接口返回的form 表单字符串
                  // document.body.appendChild(div);
                  // document.forms[0].setAttribute("target", "_blank"); // 新开窗口跳转
                  // document.forms[0].submit();
                  this.$router.push({
                    path: "/payMask",
                    query: {
                      rid: data.rid
                    }
                  });
                } else {
                  this.$toast(res.msg);
                }
              });
            }else {
                apiCatchHandler(res);
                      this.$toast.clear();

              }
          });
        }
      }
    },
    onBridgeReady(params) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", params, res => {
        console.log(res, "rrrrkkkk");
        // if (res.err_msg == "get_brand_wcpay_request:ok") {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        this.$router.push({
          path: "/payResult",
          query: {
            orderId: this.orderId
          }
        });
        // }
      });
    },
    getCoachInfo() {
      getCoachInfo({
        coachId: this.$route.query.coachId
      }).then(({ data }) => {
        this.coachNickName = data.nickName;
        this.coachAvatar = data.headImageUrl;
        console.log(data.price);
        this.priceDoubleValue = data.priceDoubleValue;
      });
    }
  },
  computed: {
    time() {
      return function(value) {
        let t = moment(value);
        return (
          t.format("MM月DD日") + " " + getWeek(t) + " " + t.format("HH:mm")
        );
      };
    },
    ...mapGetters(["orderId"])
  }
};
</script>
<style lang="scss" scope>
.page-wraper {
  padding: 10px 10px 80px 10px;
}
.ticket {
  margin-bottom: 5px;
}
.panel-normal {
  margin-bottom: 10px;
  > .header {
    padding: 5px 0;
  }
}
.van-cell {
  padding: 3px 0;
  font-size: 14px;
}
.van-cell__title {
  color: #656565;
}
.van-cell__value {
  color: #999999;
}
.van-divider {
  margin: 5px 0 3px 0;
}
.actual-pay {
  .van-cell__title {
    color: #333333;
    font-weight: bold;
  }
  .van-cell__value {
    color: #ff4651;
  }
}

.pay-method-panel {
  .header {
    margin-bottom: 15px;
  }
}
.pay-method {
  padding: 10px 13px;
  border-radius: 10px;
  box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.1);

  .van-cell {
    padding: 10px 0;
    font-size: 13px;
  }

  .icon-pay {
    display: inline-block;
    width: 20px;
    height: 20px;

    margin-right: 10px;

    vertical-align: middle;

    border-radius: 10px;
    text-align: center;

    background: #46bb36;
    color: #fff;
    font-size: 13px;
    line-height: 20px;
  }

  .icon-alipay {
    background: #06b4fd;
  }

  .van-radio__icon {
    .van-icon {
      width: 14px;
      height: 14px;

      &::before {
        display: none;
      }
    }
  }

  .van-radio__icon--checked {
    .van-icon {
      background: #1bc2b1;
      border-color: #1bc2b1;
    }
  }
}

.bottom-operation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;

  padding: 2px 10px;

  box-shadow: 0 0.1em 0.5em 0 rgba(0, 0, 0, 0.1);

  .pay {
    padding-left: 15px;
    font-size: 12px;

    strong {
      font-size: 16px;
      color: #ff4651;
    }
  }

  .van-button {
    height: auto;
    padding: 10px 30px;
    border-radius: 20px;
    background: #1bc2b1;
    color: #fff;
  }
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  display: none;
}
</style>
