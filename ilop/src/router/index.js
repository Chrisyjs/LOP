import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routerArr = [
  {
    path: '/login',
  },
  {
    path: '/home',
  },
  // {
  //   path: '/claim',
  //   redirect: '/claim/waitingList',
  //   component: '/routerView',
  //   children: [
  //     {
  //       path: 'waitingList'
  //     },
  //     {
  //       path: 'myList'
  //     },
  //     {
  //       path: 'confirmClaim'
  //     },
  //     {
  //       path: 'claimDetail'
  //     }
  //   ]
  // },
  {
    path: '/sundayAppoint',
    redirect: '/sundayAppoint/process',
    component: '/sundayAppoint/index',
    children: [
      {
        path: 'process',
        component: 'process/index'
      },
      {
        path: 'list',
        component: 'list/index'
      }
    ]
  },
  {
    path: '/placeAppoint',
    redirect: '/placeAppoint/process',
    component: '/placeAppoint/index',
    children: [
      {
        path: 'process',
        component: 'process/index'
      },
      {
        path: 'list',
        component: 'list/index'
      }
    ]
  }
]

function getRouter() {
  let arr = [];
  routerArr.forEach(item => {
    if (item.children) {
      let tempArr = [];
      item.children.forEach(jtem => {
        let pathName = `${item.path}/${jtem.component ? jtem.component : jtem.path}`
        tempArr.push({
          path: jtem.path,
          component: () => import(/* webpackChunkName: "[request]" */ `@/views${pathName}.vue`)
        })
      })
      arr.push({
        path: item.path,
        redirect: item.redirect,
        component: () => import(/* webpackChunkName: "[request]" */ `@/views${item.component}.vue`),
        children: tempArr
      })
    } else {
      arr.push({
        path: item.path,
        component: () => import(/* webpackChunkName: "[request]" */ `@/views${item.path}.vue`)
      })
    }
  })
  return arr;
}


export default new VueRouter({
  mode: 'hash',
  routes: [
    ...getRouter(),
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
