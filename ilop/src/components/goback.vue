<template>
  <div class="goback" :style="Object.assign({top: '20px', left: '30px'}, styleObj)">
    <van-icon
      @click="handleClick"
      size="20px"
      name="arrow-left"
    ></van-icon>
  </div>
</template>
<script>
export default {
  props: {
    callback: {
      type: Function,
      default: () => {},
    },
    styleObj: {
      type: Object,
      default: () => {
        return {
          top: "20px",
          left: "30px",
        };
      },
    },
  },
  methods: {
    handleClick() {
      this.$emit('callback')
    }
  }
};
</script>
<style lang="scss" scoped>
.goback {
  position: fixed;
}
</style>
