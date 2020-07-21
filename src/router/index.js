import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import VantLayout from "@/layout/vantLayout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    meta: { title: "登录" },
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "register",
    component: Layout,
    children: [
      {
        name: "register",
        path: "/register",
        meta: { title: "注册" },
        component: () => import("@/views/register/index")
      },
      {
        name:'registerWx',
        path:'/registerWx',
        meta: { title: "注册" },
        component: () => import("@/views/register/indexWx")
      }
    ]
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "课程", icon: "dashboard" }
      }
    ]
  },

  {
    path: "evaluate",
    component: Layout,
    children: [
      {
        name: "evaluate",
        path: "/evaluate",
        meta: { title: "评价" },
        component: () => import("@/views/evaluate/index")
      }
    ]
  },
  {
    path: "lessons",
    component: Layout,
    children: [
      {
        name: "lessons",
        path: "/lessons",
        meta: { title: "课程" },
        component: () => import("@/views/lessons/index")
      }
    ]
  },
  {
    path: "training",
    component: Layout,
    children: [
      {
        name: "training",
        path: "/training",
        meta: { title: "训练" },
        component: () => import("@/views/training/index")
      },

    ]
  },
  {
    path: "makeAnAppointment",
    component: Layout,
    children: [
      {
        name: "makeAnAppointmentOne",
        path: "/makeAnAppointment/one",
        meta: { title: "预约体验课" },
        component: () => import("@/views/makeAnAppointment/one")
      },
      {
        name: "makeAnAppointmentTwo",
        path: "/makeAnAppointment/two",
        meta: { title: "预约体验课" },
        component: () => import("@/views/makeAnAppointment/two")
      },
      {
        name: "makeAnAppointmentThree",
        path: "/makeAnAppointment/three",
        meta: { title: "预约体验课" },
        component: () => import("@/views/makeAnAppointment/three")
      },
      {
        name: "makeAnAppointmentFour",
        path: "/makeAnAppointment/four",
        meta: { title: "预约体验课" },
        component: () => import("@/views/makeAnAppointment/four")
      }
    ]
  },
  {
    path: "afterClassWork",
    component: Layout,
    children: [
      {
        name: "afterClassWork",
        path: "/afterClassWork",
        meta: { title: "作业详情" },
        component: () => import("@/views/afterClassWork/index")
      }
    ]
  },
  {
    path: "task",
    component: Layout,
    children: [
      {
        name: "task",
        path: "/task",
        meta: { title: "作业详情" },
        component: () => import("@/views/task/index")
      }
    ]
  },

  {
    path: "planbook",
    component: Layout,
    children: [
      {
        name: "planbook",
        path: "/planbook",
        meta: { title: "计划书" },
        component: () => import("@/views/planbook/demo")
      }
    ]
  },

  {
    path: "courses",
    component: Layout,
    children: [
      {
        name: "courses",
        path: "/courses",
        meta: { title: "课程", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/courses/index")
      }
    ]
  },
  /** 正式课程 */
  {
    path: "formalLessons",
    component: Layout,
    children: [
      {
        name: "formalLessons",
        path: "/formalLessons",
        meta: { title: "课程", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/formalLessons/index")
      }
    ]
  },
  {
    path: "recomcoach",
    component: Layout,
    children: [
      {
        name: "recomcoach",
        path: "/recomcoach",
        meta: { title: "推荐教练", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/recomcoach/index")
      }
    ]
  },

  {
    path: "forwardCoach",
    component: Layout,
    children: [
      {
        name: "forwardCoach",
        path: "/forwardCoach",
        meta: { title: "预约教练", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/forwardCoach/index")
      }
    ]
  },

  {
    path: "selectTime",
    component: Layout,
    children: [
      {
        name: "selectTime",
        path: "/selectTime",
        meta: { title: "时间选择", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/selectTime/index")
      }
    ]
  },

  {
    path: "confirmOrder",
    component: Layout,
    children: [
      {
        name: "confirmOrder",
        path: "/confirmOrder",
        meta: { title: "订单确认", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/confirmOrder/index")
      }
    ]
  },
  {
    path: "orderInfo",
    component: Layout,
    children: [
      {
        name: "orderInfo",
        path: "/orderInfo",
        meta: { title: "订单信息", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/orderInfo/index")
      }
    ]
  },

  {
    path: "payResult",
    component: Layout,
    children: [
      {
        name: "payResult",
        path: "/payResult",
        meta: { title: "支付成功", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/payResult/index")
      }
    ]
  },
  {
    path: "payMask",
    component: Layout,
    children: [
      {
        name: "payMask",
        path: "/payMask",
        meta: { title: "支付页面", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/payMask/index")
      }
    ]
  },

  {
    path: "privateLesson",
    component: Layout,
    children: [
      {
        name: "privateLesson",
        path: "/privateLesson",
        meta: { title: "课程", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/privateLesson/index")
      }
    ]
  },

  {
    path: "personalSetting",
    component: Layout,
    children: [
      {
        name: "personalSetting",
        path: "/personalSetting",
        meta: { title: "我的", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/index")
      },
      {
        name: "settingCenter",
        path: "/settingCenter",
        meta: { title: "设置中心", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/settingCenter")
      },
      {
        name: "editNickName",
        path: "/editNickName",
        meta: { title: "修改昵称", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/editNickName")
      },
      {
        name: "myOrder",
        path: "/myOrder",
        meta: { title: "我的订单", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/myOrder")
      },
      {
        name: "myQA",
        path: "/myQA",
        meta: { title: "我的问答", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/myQA")
      },
      {
        name: "QADetail",
        path: "/QADetail",
        meta: { title: "问答详情", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/QADetail")
      },
      {
        name: "feedBacks",
        path: "/feedBacks",
        meta: { title: "反馈建议", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/feedBacks")
      },
      {
        name: "myAdviser",
        path: "/myAdviser",
        meta: { title: "联系我们", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/myAdviser")
      },
      {
        name: "aboutUs",
        path: "/aboutUs",
        meta: { title: "关于我们", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/aboutUs")
      },
      {
        name: "companyIntroduce",
        path: "/companyIntroduce",
        meta: { title: "企业介绍", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/companyIntroduce")
      },
      {
        name: "privacy",
        path: "/privacy",
        meta: { title: "隐私协议", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/privacy")
      },
      {
        name: "userAgreement",
        path: "/userAgreement",
        meta: { title: "用户协议", },
        props: { default: true, sidebar: false },
        component: () => import("@/views/personalSetting/userAgreement")
      },

    ]
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
