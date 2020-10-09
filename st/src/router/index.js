import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/form',
      component:() => import(/* webpackChunkName: "Form" */ '../views/form/index.vue'),
    },
    {
      path: '*',
      redirect: '/form'
    }
  ]
})
