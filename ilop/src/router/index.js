import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';
import List from '../views/claim-list';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})