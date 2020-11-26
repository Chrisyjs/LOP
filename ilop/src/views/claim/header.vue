<template>
  <div class="top-btn-group fixed-header">
    <goback :styleObj="{top: '18px'}" @callback="$router.replace('/home')"></goback>
    <div class="btns">
      <van-button
        class="left-btn"
        type="info"
        to="/claim/waitingList"
        :plain="currentTab !== 'waitingList'"
        size="small"
        >待认领物品</van-button
      >
      <van-button
        class="right-btn"
        type="info"
        to="/claim/myList"
        :plain="currentTab !== 'myList'"
        size="small"
        >我的认领</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTab() {
      return this.$route.path.indexOf("waitingList") > -1
        ? "waitingList"
        : "myList";
    },
  },
};
</script>

<style lang="scss" scoped>
.btns {
  margin-left: 82px;
}
.top-btn-group {
  padding: 10px;
}
.left-btn {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
.right-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none;
}
</style>
