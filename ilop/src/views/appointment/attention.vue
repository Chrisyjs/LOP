<template>
  <div class="attention-wrap">
    <van-nav-bar
      class="fixed-header"
      @click-left="handleClickLeft"
      left-arrow
      left-text="返回"
      title="预约须知"
    ></van-nav-bar>
    <div class="overflow-scroll">
      <div class="panel">
        <div
          style="margin-bottom: 8px;"
          class="part-title text-center font-size-15"
        >
          请下拉读完本须知。
        </div>
        <div class="content font-size-14">
          <div>
            因疫情防控需求，目前聚会采用座位预约制。请仔细阅读以下须知内容：
          </div>
          <div>
            1、预约时需如实<span class="color-red">填报姓名、电话等信息</span>，体温异常者及动态健康码非绿码者，请在家观察或遵医嘱，请勿进行预约操作。
          </div>
          <div>
            2、进堂前请<span class="color-red">提前打开健康码</span>提高检入效率，请主动配合事奉同工进行体温检测。
          </div>
          <div>
            3、在堂期间须<span class="color-red">全程佩戴口罩</span>，不提供饮水，会场内禁止饮食。
          </div>
          <div>
            4、预约后<span class="color-red">未能如期参加</span>聚会，请<span class="color-red">及时取消</span>预定<span class="color-red">(周六12:00前)</span>，把名额让给其他弟兄姊妹，珍惜预约机会，切勿浪费名额。
          </div>
        </div>
        <div class="part-title text-center font-size-15">
          愿神赐福弟兄姊妹！以马内利！
        </div>
        <div style="margin-top: 8px;" class="clearfix">
          <div style="float: right">
            <van-checkbox v-model="hasRead" shape="square"
              >已阅读预约须知</van-checkbox
            >
          </div>
        </div>
      </div>
    </div>
    <van-button @click="clickSubmit" class="bottom-btn" block type="info">
      提交预约
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
          message: "请阅读预约须知并勾选",
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
  height: calc(100vh - 144px);
  padding: 0 16px;
}
.content {
  > div {
    margin-bottom: 8px;
  }
}
</style>
