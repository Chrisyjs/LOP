<template>
  <div id="app">
    <div v-if="$utils.getCookie('mobile')" class="user cursor-pointer" flex="main:center cross:center" @click="handleLogout">
      <van-icon name="user-circle-o"></van-icon>
      <span class="account">{{$utils.getCookie('mobile')}}</span>
    </div>
    <router-view></router-view>
    <van-image-preview v-if="$route.path.indexOf('login') === -1" v-model="showImagePreview" :images="imagePreview"></van-image-preview>
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
    // top: 15px;
    top: 20px;
    // right: 14px;
    right: 36px;
    z-index: 2000;
  }
}
</style>
