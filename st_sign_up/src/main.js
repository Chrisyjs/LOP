import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import {
  Form,
  Row,
  Col,
  RadioGroup,
  Radio,
  Field,
  DatetimePicker,
  Popup,
  Picker,
  Area,
  Checkbox,
  CheckboxGroup,
  Button,
  Toast,
  Dialog
} from 'vant';
import './api/interceptors.js';

Vue
  .use(Form)
  .use(Row)
  .use(Col)
  .use(RadioGroup)
  .use(Radio)
  .use(Field)
  .use(DatetimePicker)
  .use(Popup)
  .use(Picker)
  .use(Area)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Button)
  .use(Toast)
  .use(Dialog)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
