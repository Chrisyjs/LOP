<template>
  <div>
    <div style="margin-bottom: 50px;">
      <router-view></router-view>
    </div>
    <!-- tabBar -->
    <van-tabbar v-model="active" @change="handleChangeActive">
      <van-tabbar-item name="/placeAppoint/process" icon="phone">申请</van-tabbar-item>
      <van-tabbar-item name="/placeAppoint/list" icon="setting">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {
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
  },
  methods: {
    handleChangeActive(index) {
      this.$router.push(`${index}`)
    },
    getActiveByRoute(path) {
      if (path.indexOf('/placeAppoint/process') > -1) {
        return '/placeAppoint/process';
      }
      if (path.indexOf('/placeAppoint/list') > -1) {
        return '/placeAppoint/list';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
