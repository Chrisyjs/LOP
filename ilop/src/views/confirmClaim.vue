<template>
  <div class="confirm-claim">
    <van-nav-bar @click-left="handleClickLeft" left-arrow left-text="返回" title="你认领的产品"></van-nav-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    handleClickLeft () {
      this.$router.push({
        path: '/home'
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>