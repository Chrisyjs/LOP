<template>
  <div class="appointmentList-wrap">
    <!-- 注意事项 -->
    <Attention
      title="注意事项"
      :handleSubmit="useEnd"
      :step.sync="step"
      btnText="结束使用"
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
                <div style="margin-left: -7px;">{{ item.applicantName }}</div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">申请人手机：</div>
                <div>{{ item.applicantMobile }}</div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">申请场地：</div>
                <div>{{ item.scripture }}</div>
              </div>
              <div class="item" flex="main:left cross:center">
                <div class="label">使用时间：</div>
                <div>
                  {{ item.time }}
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
                  {{ item.applyReasonDetail }}
                </div>
              </div>
              <div v-if="item.useStatus != 3" flex="main:right">
                <van-button @click="() => handleCancel(item)" type="info" plain size="mini"
                  >取消申请</van-button
                >
                <van-button @click="() => handleUseEnd(item)" type="info" plain size="mini"
                  >结束使用</van-button
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
import { getList, useEnd, useCancel } from "@/api/placeAppoint";
import Attention from "@/components/attention";
import dayjs from 'dayjs';
export default {
  data() {
    return {
      step: 0,
      curId: '',  // 当前操作的 id
      attention: '',  // 注意事项
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
      const { code, data } = await getList();
      if (code === 200) {
        this.listData = data.map(item => {
          return {...item, time: `${dayjs(item.useStartTime).format('YYYY/MM/DD HH:mm')}-${dayjs(item.useEndTime).format('HH:mm')}`}
        });
      }
    },
    /**
     * 点击结束使用
     */
    handleUseEnd(item) {
      this.step = 1;
      this.curId = item.id;
      this.attention = item.notice;
    },
    /**
     * 取消预约
     */
    handleCancel(item) {
      this.$dialog
        .confirm({
          title: "系统提示",
          message: "确定要取消申请吗？",
        })
        .then(() => {
          useCancel(item.id).then((data) => {
            if (data.code === 200) {
              this.$toast("取消成功");
              this.getListData();
            }
          });
        })
        .catch(() => {});
    },
    /**
     * 结束使用
     */
    async useEnd() {
      this.$dialog
        .confirm({
          title: "系统提示",
          message: "确认已按注意事项操作，并结束使用吗？",
        })
        .then(() => {
          useEnd(this.curId).then((data) => {
            if (data.code === 200) {
              this.$toast("结束成功");
              this.step = 0;
              this.getListData();
            }
          });
        })
        .catch(() => {});
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
