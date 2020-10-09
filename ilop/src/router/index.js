import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component:() => import(/* webpackChunkName: "login" */ 'views/login.vue'),
    },
    {
      path: '/claim',
      redirect: '/claim/waitingList',
      component:() => import(/* webpackChunkName: "claim_mainPage" */ 'views/claim/mainPage.vue'),
      children: [
        {
          path: 'waitingList',
          component:() => import(/* webpackChunkName: "claim_waitingList" */ 'views/claim/waitingList.vue'),
        },
        {
          path: 'myList',
          component:() => import(/* webpackChunkName: "claim_myList" */ 'views/claim/myList.vue'),
        },
        {
          path: 'confirmClaim',
          component:() => import(/* webpackChunkName: "claim_confirmClaim" */ 'views/claim/confirmClaim.vue'),
        },
        {
          path: 'claimDetail',
          component:() => import(/* webpackChunkName: "claim_claimDetail" */ 'views/claim/claimDetail.vue'),
        },
      ]
    },
    {
      path: '/st',
      component:() => import(/* webpackChunkName: "st_index" */ 'views/st/signUp/index.vue'),
    },
    {
      path: '/appointment/process',
      component:() => import(/* webpackChunkName: "appointment_process" */ 'views/appointment/process/index.vue'),
    },
    {
      path: '/appointment/list',
      component:() => import(/* webpackChunkName: "appointment_list" */ 'views/appointment/list/index.vue'),
    },
    {
      path: '*',
      redirect: '/appointment/process'
    }
  ]
})
