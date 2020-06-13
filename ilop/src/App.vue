<template>
  <div id="app">
    <div v-if="$utils.getCookie('mobile')" class="user cursor-pointer" flex="main:center cross:center" @click="handleLogout">
      <van-icon name="user-circle-o"></van-icon>
      <span class="account">{{$utils.getCookie('mobile')}}</span>
    </div>
    <div style="margin-bottom: 50px;">
      <router-view></router-view>
    </div>
    <van-image-preview v-if="$route.path.indexOf('login') === -1" v-model="showImagePreview" :images="imagePreview"></van-image-preview>
    <!-- tabBar -->
    <van-tabbar v-if="$route.path.indexOf('login') === -1" v-model="active" @change="handleChangeActive">
      <van-tabbar-item name="appointment" icon="phone">预约</van-tabbar-item>
      <van-tabbar-item name="st" icon="fire">ST</van-tabbar-item>
      <van-tabbar-item name="claim" icon="shopping-cart">认领</van-tabbar-item>
      <van-tabbar-item name="myself" icon="setting">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import Layout from 'mixins/layout';

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      active: ''
    }
  },
  watch: {
    '$route': {
      handler(toRouter) {
        console.log(toRouter) //打开的新路由
        this.active = this.getActiveByRoute(toRouter.path);
      },
      immediate: true
    }
  },
  computed: {
    showImagePreview: {
      get() {
        return this.$store.state.showImagePreview;
      },
      set(n) {
        this.setShowImagePreview(n);
      }
    },
    ...mapState(['showLoading', 'imagePreview'])
  },
  mixins: [Layout],
  mounted() {
    window.onresize = () => {
      this.setOverflowScrollHeight();
    }
    // 禁止双指放大缩小
    window.onload = function() {
      document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault()
        }
      })
      document.addEventListener('gesturestart', function(event) {
        event.preventDefault()
      })
    }
  },
  methods: {
    ...mapMutations(['resetChoosedList', 'setShowImagePreview']),
    handleChangeActive(index) {
      this.$router.push(`/${index}`)
    },
    getActiveByRoute(path) {
      if (path.indexOf('/appointment') > -1) {
        return 'appointment';
      }
      if (path.indexOf('/claim') > -1) {
        return 'claim';
      }
      if (path.indexOf('/st') > -1) {
        return 'st';
      }
      if (path.indexOf('/myself') > -1) {
        return 'myself';
      }
    },
    handleLogout() {
      this.$dialog.confirm({
        title: '系统提示',
        message: '确认退出？'
      }).then(() => {
        this.$utils.delCookie('mobile');
        this.resetChoosedList();
        this.$router.push({
          path: '/login'
        });
      })
    }
  },
}
</script>

<style lang="scss">
#app {
  background-color: #fff;
  font-size: 12px;
  .user {
    font-size: 12px;
    // color: $blue;
    position: fixed;
    // top: 15px;
    top: 20px;
    // right: 14px;
    right: 36px;
    z-index: 2000;
    .account {
      // text-decoration: underline;
    }
  }
}
</style>
