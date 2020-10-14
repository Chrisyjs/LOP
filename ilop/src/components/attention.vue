<template>
  <div class="attention-wrap">
    <van-nav-bar
      class="fixed-header"
      @click-left="handleClickLeft"
      left-arrow
      left-text="返回"
      :title="title"
    ></van-nav-bar>
    <div :style="{height: `calc(100vh - ${scrollOffset || 144}px)`}" class="overflow-scroll">
      <div class="panel">
        <div
          style="margin-bottom: 8px;"
          class="part-title text-center font-size-15"
        >
          请下拉读完本须知。
        </div>
        <slot></slot>
        <div style="margin-top: 8px;" class="clearfix">
          <div style="float: right">
            <van-checkbox v-model="hasRead" shape="square"
              >已阅读{{title}}</van-checkbox
            >
          </div>
        </div>
      </div>
    </div>
    <van-button @click="clickSubmit" class="bottom-btn" block type="info">
      {{ btnText }}
    </van-button>
  </div>
</template>
<script>
export default {
  name: "Attention",
  props: {
    step: {
      type: Number,
      default: 1,
    },
    handleSubmit: {
      type: Function,
      default: () => {},
    },
    title: {
      type: String,
      default: '预约须知'
    },
    btnText: {
      type: String,
      default: '提 交'
    },
    scrollOffset: {
      type: Number | String,
      default: 144
    }
  },
  data() {
    return {
      hasRead: false,
    };
  },
  methods: {
    /**
     * 点击提交
     */
    clickSubmit() {
      if (!this.hasRead) {
        this.$notify({
          message: `请阅读${this.title}并勾选`,
          type: "warning",
        });
        return;
      }
      this.handleSubmit();
    },
    /**
     * 点击返回
     */
    handleClickLeft() {
      this.hasRead = false;
      this.$emit("update:step", 0);
    },
  },
};
</script>
<style lang="scss" scoped>
.panel {
  line-height: 22px;
}
.overflow-scroll {
  // height: calc(100vh - 144px);
  padding: 0 16px;
}
.content {
  > div {
    margin-bottom: 8px;
  }
}
</style>
