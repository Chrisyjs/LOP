<template>
  <div>
    <goback @callback="goback"></goback>
    <div style="margin-bottom: 50px;">
      <router-view></router-view>
    </div>
    <!-- tabBar -->
    <van-tabbar v-model="active" @change="handleChangeActive">
      <van-tabbar-item name="/sundayAppoint/process" icon="phone">预约</van-tabbar-item>
      <van-tabbar-item name="/sundayAppoint/list" icon="setting">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import Layout from 'mixins/layout';

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
  mixins: [Layout],
  methods: {
    goback() {
      this.$router.replace('/home')
    },
    handleChangeActive(index) {
      this.$router.push(`${index}`)
    },
    getActiveByRoute(path) {
      if (path.indexOf('/sundayAppoint/process') > -1) {
        return '/sundayAppoint/process';
      }
      if (path.indexOf('/sundayAppoint/list') > -1) {
        return '/sundayAppoint/list';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
