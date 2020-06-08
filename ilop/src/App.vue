<template>
  <div id="app">
    <!-- <div v-if="$utils.getCookie('mobile')" class="user cursor-pointer" flex="main:center cross:center" @click="handleLogout">
      <van-icon name="user-circle-o"></van-icon>
      <span class="account">{{$utils.getCookie('mobile')}}</span>
    </div> -->
    <router-view></router-view>
    <van-image-preview v-model="showImagePreview" :images="imagePreview"></van-image-preview>
    <!-- tabBar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="phone">预约</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart">认领</van-tabbar-item>
      <van-tabbar-item icon="fire">ST</van-tabbar-item>
      <van-tabbar-item icon="setting">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import Layout from './mixins/layout';

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      active: 0
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
    top: 15px;
    right: 14px;
    z-index: 2000;
    .account {
      // text-decoration: underline;
    }
  }
}
</style>
