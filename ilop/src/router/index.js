import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/login';
import MainPage from '../views/mainPage';
import WaitingList from '../views/waitingList';
import MyList from '../views/myList';
import ConfirmClaim from '../views/confirmClaim';
import ClaimDetail from '../views/claimDetail';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      redirect: '/home/waitingList',
      component: MainPage,
      children: [
        {
          path: '/home/waitingList',
          component: WaitingList,

        },
        {
          path: '/home/myList',
          component: MyList
        }
      ]
      // meta: {
      //   keepAlive: true
      // }
    },
    {
      path: '/confirmClaim',
      component: ConfirmClaim
    },
    {
      name: 'claimDetail',
      path: '/claimDetail',
      component: ClaimDetail
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})