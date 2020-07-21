import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import {
  NavBar,
  Col,
  Row ,
  Button as VanButton,
  Image as VanImage,
  Popup,
  Rate,
  Skeleton,
  Tag as VanTag,
  Toast,
  Tabbar,
  TabbarItem,
  Icon as VanIcon,
  Notify as VanNotify,
  Step as VanStep,
  Steps as VanSteps,
  Overlay as VanOverlay,
  Field as VanField,
  Form as VanForm,
  Uploader as VanUploader,
  Tab as VanTab,
  Tabs as VanTabs,
  Rate as VanRate,
  Divider as VanDivider,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  List as VanList,
  Dialog ,
  RadioGroup as VanRadioGroup,
  Radio as VanRadio ,
  Sticky ,
  Loading as VanLoading 
 } from 'vant';


Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Skeleton);
Vue.use(Rate);
Vue.use(Popup);
Vue.use(VanImage);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(VanButton);
Vue.use(VanIcon);
Vue.use(VanTag);
Vue.use(VanNotify);
Vue.use(VanStep);
Vue.use(VanSteps);
Vue.use(VanOverlay);
Vue.use(VanField);
Vue.use(VanForm);
Vue.use(VanUploader);
Vue.use(VanTab);
Vue.use(VanTabs);
Vue.use(VanRate);
Vue.use(VanCell);
Vue.use(VanCellGroup);
Vue.use(VanDivider);
Vue.use(VanList);
Vue.use(Dialog);
Vue.use(VanRadioGroup);
Vue.use(VanRadio);
Vue.use(Sticky);
Vue.use(VanLoading);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
import vueTouch from 'vue-plugin-touch';
Vue.use(vueTouch);
// set ElementUI lang to EN
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
