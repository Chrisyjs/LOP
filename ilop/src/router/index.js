import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component:() => import(/* webpackChunkName: "Login" */ '../views/login.vue'),
    },
    {
      path: '/home',
      redirect: '/home/waitingList',
      component:() => import(/* webpackChunkName: "MainPage" */ '../views/mainPage.vue'),
      children: [
        {
          path: '/home/waitingList',
          component:() => import(/* webpackChunkName: "WaitingList" */ '../views/waitingList.vue'),

        },
        {
          path: '/home/myList',
          component:() => import(/* webpackChunkName: "MyList" */ '../views/myList.vue'),
        }
      ]
    },
    {
      path: '/confirmClaim',
      component:() => import(/* webpackChunkName: "ConfirmClaim" */ '../views/confirmClaim.vue'),
    },
    {
      name: 'claimDetail',
      path: '/claimDetail',
      component:() => import(/* webpackChunkName: "ClaimDetail" */ '../views/claimDetail.vue'),
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
