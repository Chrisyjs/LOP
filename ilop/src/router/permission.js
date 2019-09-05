import router from './index';
import Vue from 'vue';

router.beforeEach((to, from, next) => {
  let cookieMobile = Vue.prototype.$utils.getCookie('mobile');
  if (cookieMobile) {
    if (to.path === '/login') {
      next('/home');
    }
    next()
  } 
  else {
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
})