import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Field, 
  CellGroup, 
  Row, 
  Col, 
  Button, 
  Sidebar, 
  SidebarItem, 
  Stepper
} from 'vant';
import 'flex.css'

Vue.use(Field)
  .use(CellGroup)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Stepper)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
