import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Field, 
  CellGroup, 
  Row, 
  Col, 
  Button, 
  Stepper,
  NavBar,
  Card
} from 'vant';
import 'flex.css'

Vue.use(Field)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Stepper)
  .use(NavBar)
  .use(Card)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
