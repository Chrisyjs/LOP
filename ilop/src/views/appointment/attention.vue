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
            本平台为疫情期，疫情防控需要设立。目前聚会采用座位预约制。请仔细阅读以下须知内容：
          </div>
          <div>
            1、预约时需如实填报姓名、电话、体温及其它需要申报的信息，体温异常者及动态健康码非绿码者，请在家观察或遵医嘱，请勿进行预约操作。
          </div>
          <div>
            2、进堂前请提前打开健康码及预约码信息界面，提高检入效率。请主动配合侍奉同工进行体温检测和验码工作。
          </div>
          <div>
            3、检入口支持市民卡健康码查验，不能提供杭州动态健康码信徒，可使用市民卡刷卡验码。请提前让家人或朋友在支付宝的健康码中代办健康码。无法提供健康码信息的一律不予进堂。
          </div>
          <div>4、在堂期间须全程佩戴口罩。</div>
          <div>
            5、疫情期间请严格按座位号对号入座，可请招待同工协助找到对应座位。
          </div>
          <div>
            6、预约后未能如期参加聚会，请及时取消预定，把座位让给其他弟兄姊妹。
          </div>
          <div>7、每人单天只能预约一场聚会，把聚会的机会让给更多弟兄姊妹。</div>
          <div>8、一人一码。</div>
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
