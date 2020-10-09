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
      path: '/home',
      component:() => import(/* webpackChunkName: "home" */ 'views/home.vue'),
    },
    {
      path: '/claim',
      redirect: '/claim/waitingList',
      component:() => import(/* webpackChunkName: "claim_routerView" */ 'views/routerView.vue'),
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
    // {
    //   path: '/st',
    //   component:() => import(/* webpackChunkName: "st_index" */ 'views/st/signUp/index.vue'),
    // },
    {
      path: '/sundayAppoint',
      redirect: '/sundayAppoint/process',
      component:() => import(/* webpackChunkName: "sundayAppoint_index */ 'views/sundayAppoint/index.vue'),
      children: [
        {
          path: 'process',
          component:() => import(/* webpackChunkName: "sundayAppoint_process" */ 'views/sundayAppoint/process/index.vue'),
        },
        {
          path: 'list',
          component:() => import(/* webpackChunkName: "sundayAppoint_list" */ 'views/sundayAppoint/list/index.vue'),
        },
      ]
    },
    {
      path: '/placeAppoint',
      redirect: '/placeAppoint/process',
      component:() => import(/* webpackChunkName: "placeAppoint_index */ 'views/placeAppoint/index.vue'),
      children: [
        {
          path: 'process',
          component:() => import(/* webpackChunkName: "placeAppoint_process" */ 'views/placeAppoint/process/index.vue'),
        },
        {
          path: 'list',
          component:() => import(/* webpackChunkName: "placeAppoint_list" */ 'views/placeAppoint/list/index.vue'),
        },
      ]
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
