<template>
  <div class="appointmentList-wrap">
    <!-- 注意事项 -->
    <Attention
      title="注意事项"
      :handleSubmit="useEnd"
      :step.sync="step"
      btnText="使用结束"
      v-if="step === 1"
    >
      <div class="content font-size-14">
        <div>
          请仔细阅读以下须知内容：
          <div v-html="attention"></div>
        </div>
      </div>
      <div class="part-title text-center font-size-15">
        愿神赐福弟兄姊妹！以马内利！
      </div>
    </Attention>
    <div v-if="step === 0">
      <van-nav-bar
        class="fixed-header"
        @click-left="$router.replace('/home')"
        left-arrow
        left-text="返回"
        title="我的申请"
      ></van-nav-bar>
      <van-empty v-if="!listData.length" description="暂无申请信息"></van-empty>
      <div v-else class="list overflow-scroll">
        <div class="panel" v-for="(item, idx) in listData" :key="idx">
          <div class="part">
            <div class="part-title border-bottom font-size-15">申请信息</div>
            <div class="content" style="padding-left: 10px;">
              <div class="item" flex="main:left cross:center">
                <div class="label">申请人姓名：</div>
                <div style="margin-left: -7px;">《{{ item.topic }}》</div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">申请人手机：</div>
                <div>{{ item.speakerName }}</div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">申请场地：</div>
                <div>{{ item.scripture }}</div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">使用时间：</div>
                <div>
                  {{ item.appointmentTime }}
                </div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">申请原因：</div>
                <div>
                  {{ item.sessionInfo }}
                </div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">详细原因：</div>
                <div>
                  {{ item.sessionInfo }}
                </div>
              </div>
              <div flex="main:right">
                <van-button @click="() => {}" type="info" plain size="mini"
                  >取消申请</van-button
                >
                <van-button @click="step = 1" type="info" plain size="mini"
                  >使用结束</van-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getMyAppointmentList, cancelAppointment, useEnd } from "@/api/sundayAppoint";
import Attention from "@/components/attention";
export default {
  data() {
    return {
      step: 0,
      attention: '',
      currentYear: new Date().getFullYear(),
      listData: [],
    };
  },
  components: {
    Attention
  },
  created() {
    this.getListData();
  },
  methods: {
    /**
     * 获取列表数据
     */
    async getListData() {
      this.$utils.loading();
      const { code, data } = await getMyAppointmentList(
        this.$utils.getCookie("mobile")
      );
      if (code === 200) {
        data.length &&
          (data[0].canCancel =
            new Date().valueOf() <
            new Date(
              `${data[0].appointmentTime.replace(/-/g, "/")} 00:00:00`
            ).valueOf());
        this.listData = data;
      }
    },
    /**
     * 取消预约
     */
    handleCancel(item) {
      this.$dialog
        .confirm({
          title: "系统提示",
          message: "确定要取消预约吗？",
        })
        .then(() => {
          cancelAppointment(item.id).then((data) => {
            if (data.code === 200) {
              this.$toast("取消成功");
              this.getListData();
            }
          });
        })
        .catch(() => {});
    },
    /**
     * 使用结束
     */
    async useEnd() {
      const { code, data } = await useEnd(id);
      if (code === 200) {
        this.step = 0;
        this.getListData();
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.appointmentList-wrap {
  font-size: 14px;
  .overflow-scroll {
    height: calc(100vh - 110px);
  }
  .list {
    padding: 0 16px;
    .label {
      margin-right: 10px;
      font-weight: bold;
    }
  }
  .part-title {
    padding-left: 10px;
    padding-bottom: 4px;
  }
  .table {
    text-align: left;
    width: 100%;
  }
  .content {
    padding: 4px 8px;
    padding-bottom: 0;
    line-height: 22px;
  }
  .part + .part {
    margin-top: 8px;
  }
}
</style>
