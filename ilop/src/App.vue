<template>
  <div id="app">
    <div v-if="$utils.getCookie('mobile')" class="user cursor-pointer" flex="main:center cross:center" @click="handleLogout">
      <van-icon name="user-circle-o"></van-icon>
      <span class="account">{{$utils.getCookie('mobile')}}</span>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'app',
  components: {
  },
  methods: {
    ...mapMutations(['resetChoosedList']),
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
