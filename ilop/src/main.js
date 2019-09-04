import Vue from 'vue'
import App from './App.vue'
import router from './router'
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
  Checkbox
} from 'vant';
import VueClipboard from 'vue-clipboard2'
import 'flex.css'
import './api/interceptors.js';
import './router/permission';

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

  .use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
