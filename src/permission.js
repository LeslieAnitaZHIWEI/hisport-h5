import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getAsyncToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/register", "/registerWx",'/payMask']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  console.log(to, "to");
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = await getAsyncToken();
  if (hasToken) {
    /** 如果信息没有完善 */
    if (to.path === "/" || to.path === "/dashboard") {
      //走微信
      console.log("走微信");
      try {
        const isFinished = await store.dispatch("user/checkisFinished");
        console.log(isFinished, "isFinished");
        if (to.query.code && to.query.page!= undefined) {
          if (!isFinished) {
            next({ path: "/makeAnAppointment/one" });
          } else {
            next({ path: `/${to.query.page}` });
          }
        } else {
          if (!isFinished) {
            next({ path: "/makeAnAppointment/one" });
          } else {
            next();
          }
        }
      } catch (error) {
        //如果 ifinish接口报错
        await store.dispatch("user/resetToken");
      //   if (to.query.code && to.query.page!= undefined) {
        
      // const openData = await store.dispatch("user/getOpenId", to.query.code);
      // const { openId, headImgUrl, nickname } = openData;
      //   next(
      //     `/registerWx?openid=${openId}&headImage=${headImgUrl}&nickname=${nickname}&page=${
      //       to.query.page
      //     }`
      //   );
      //     NProgress.done();
      //   } else {
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        // }
      }
    } else if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.getters.name;
      const isEligibility = store.getters.isEligibility;
      if (hasGetUserInfo && typeof isEligibility != "string") {
        next();
      } else {
        try {
          // get user info
          await store.dispatch("user/getInfo");
          await store.dispatch("user/getEligibility");
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          // Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }

    if (!store.getters.orderId) {
      store.commit("order/get_OrderId");
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else if (to.query.code && to.query.page != undefined) {
      //走微信
      try{
        const isReg = await store.dispatch("user/checkisRegister", {
          code: to.query.code,
          state: to.query.state
        });
        console.log(isReg, "isReg");
        const openData = await store.dispatch("user/getOpenId", to.query.code);
      
          if(isReg){
            const { openId } = openData;
            await store.dispatch("user/loginWx", openId);
            const isFinished = await store.dispatch("user/checkisFinished");
            if (!isFinished) {
              next({ path: "/makeAnAppointment/one" });
            } else {
              next({ path: `/${to.query.page}` });
            }
          }else {
            const { openId, headImgUrl, nickname } = openData;
            next(
              `/registerWx?openid=${openId}&headImage=${headImgUrl}&nickname=${nickname}&page=${
                to.query.page
              }`
            );
          }
          
        
  
        
      }catch{
        next(`/login`);

      }
      
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      await next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
