import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex';
import './utils'
import {
  Field,
  CellGroup,
  Row,
  Col,
  Button,
  Stepper,
  NavBar,
  Card,
  Divider,
  Notify,
  Dialog,
  Toast,
  Uploader,
  ImagePreview,
  Icon,
  Checkbox,
  Loading,
  Overlay,
  Tabbar,
  TabbarItem,
  Form,
  RadioGroup,
  Radio,
  DatetimePicker,
  Popup,
  Picker,
  Area,
  CheckboxGroup,
  Empty,
  Grid,
  GridItem,
  NoticeBar
} from 'vant';
import VueClipboard from 'vue-clipboard2'
import 'flex.css'
import '@/api/interceptors.js';
import './router/permission';
import Goback from './components/goback.vue';

Vue.use(Field)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Stepper)
  .use(NavBar)
  .use(Card)
  .use(Divider)
  .use(Notify)
  .use(Dialog)
  .use(Toast)
  .use(Uploader)
  .use(ImagePreview)
  .use(Icon)
  .use(Checkbox)
  .use(Loading)
  .use(Overlay)
  .use(VueClipboard)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Form)
  .use(RadioGroup)
  .use(Radio)
  .use(DatetimePicker)
  .use(Popup)
  .use(Picker)
  .use(Area)
  .use(CheckboxGroup)
  .use(Empty)
  .use(Grid)
  .use(GridItem)
  .use(NoticeBar)

Vue.component('goback', Goback)
Vue.config.productionTip = false

Vue.prototype.isWeiXinEnv = (() => {
   var ua = navigator.userAgent.toLowerCase();
   if (ua.match(/MicroMessenger/i) == "micromessenger") {
       return true;
   }
   return false;
})()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
