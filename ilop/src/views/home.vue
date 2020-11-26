<template>
  <div style="marginTop: 60px">
    <div class="title text-center">
      <div class="small">{{ appGreet }}</div>
      <div class="big">{{ appName }}</div>
    </div>
    <van-grid clickable :column-num="hasPermissionList.length > 1 ? 2 : 1">
    <!-- <van-grid clickable :column-num="1"> -->
      <van-grid-item
        v-if="hasPermissionList.includes(1)"
        icon="phone-o"
        text="主日预约"
        to="/sundayAppoint"
      ></van-grid-item>
      <van-grid-item
        v-if="hasPermissionList.includes(2)"
        icon="location-o"
        text="场地申请"
        to="/placeAppoint"
      ></van-grid-item>
      <van-grid-item
        v-if="hasPermissionList.includes(3)"
        icon="location-o"
        text="为 i 认领"
        to="/claim"
      ></van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      appGreet: appConfig.appGreet,
      appName: appConfig.appName,
      hasPermissionList: []
    };
  },
  computed: {
  },
  mounted() {
    this.initPermissionList()
  },
  methods: {
    initPermissionList() {
      const authList = JSON.parse(localStorage.getItem('authList') || '{}');
      this.hasPermissionList = authList.filter(item => item.authFlag).map(item => item.key)
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  margin-bottom: 32px;
  .small {
    color: rgba(16, 16, 16, 1);
    font-size: 20px;
  }
  .big {
    color: #0076ff;
    font-size: 72px;
    font-family: "Times New Roman";
  }
}
</style>
