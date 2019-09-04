import router from './index';
import Vue from 'vue';

router.beforeEach((to, from, next) => {
  let cookieMobile = Vue.prototype.$utils.getCookie('mobile');
  if (!cookieMobile && to.path !== '/login') {
    next('/login')
  } else {
    next();
  }
})