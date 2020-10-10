<template>
  <div style="marginTop: 60px">
    <div class="title text-center">
      <div class="small">{{ appGreet }}</div>
      <div class="big">{{ appName }}</div>
    </div>
    <van-grid clickable column-num="2">
      <van-grid-item
        icon="phone-o"
        text="主日预约"
        to="/sundayAppoint"
      ></van-grid-item>
      <van-grid-item
        icon="location-o"
        text="场地申请"
        to="/placeAppoint"
      ></van-grid-item>
      <!-- <van-grid-item
        icon-prefix="icon"
        icon="location-o"
        text="奉献认领"
        to="/claim"
      ></van-grid-item> -->
    </van-grid>
  </div>
</template>
<script>
export default {
  data() {
    return {
      appGreet: appConfig.appGreet,
      appName: appConfig.appName,
    };
  },
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
