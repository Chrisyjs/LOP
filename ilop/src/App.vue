<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> -->
    <div v-if="$utils.getCookie('mobile')" class="user cursor-pointer" flex="main:center cross:center" @click="handleLogout">
      <van-icon name="user-circle-o"></van-icon>
      <span class="account">{{$utils.getCookie('mobile')}}</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
  },
  created() {
    this._getWaitingListData();
  },
  methods: {
    ...mapMutations(['resetWaitingList']),
    ...mapActions(['_getWaitingListData']),
    handleLogout() {
      this.$dialog.confirm({
        title: '系统提示',
        message: '确认退出？'
      }).then(() => {
        this.$utils.delCookie('mobile');
        this.resetWaitingList();
        this.$router.push('/login');
      })
    }
  },
}
</script>

<style lang="scss">
#app {
  font-size: 14px;
  .user {
    font-size: 12px;
    // color: $blue;
    position: fixed;
    top: 15px;
    right: 14px;
    z-index: 10000;
    .account {
      // text-decoration: underline;
    }
  }
}
</style>
