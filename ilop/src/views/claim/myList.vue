<template>
  <div>
    <Header></Header>
    <div class="my-list">
      <div style="margin-bottom: 10px;" class="panel">
        支付宝账号：{{ iLopAlipay }}（{{ alipayName }}）<br />
        <div flex="main:right">
          <span
            class="copy color-blue cursor-pointer"
            v-clipboard:copy="iLopAlipay"
            v-clipboard:success="handleCopy"
            >一键复制</span
          >
        </div>
        <div v-if="bankCard">
          银行卡账号：{{ bankCard }}（{{ bankCardName }}）<br />
          <div flex="main:right">
            <span
              class="copy color-blue cursor-pointer"
              v-clipboard:copy="bankCard"
              v-clipboard:success="handleCopy"
              >一键复制</span
            >
          </div>
        </div>
      </div>
      <div class="overflow-scroll" v-if="myList.length">
        <order-panel
          :item="item"
          @click.native="() => goClaimDetail(item.orderId)"
          v-for="item in myList"
          :key="item.orderId"
        >
          <template v-slot:header>
            <div class="order-title" flex="main:justify cross:center">
              <div>认领编号：{{ item.orderCode }}</div>
              <div>订单状态：{{ item.orderStatusName }}</div>
            </div>
          </template>
          <template v-slot:footer>
            <div flex="main:justify cross:center">
              <van-button
                plain
                type="info"
                size="small"
                v-if="item.orderStatus === 1"
                @click.stop="() => showCancelOrderDialog(item.orderId)"
                >取消订单</van-button
              >
              <van-button type="info" size="small" v-if="item.orderStatus === 1"
                >上传付款凭证</van-button
              >
            </div>
          </template>
        </order-panel>
      </div>
      <div v-else class="panel no-data-tip text-center font-size-14">
        暂无认领，赶快去认领吧！
      </div>
      <!-- 确认弹框 -->
      <van-dialog
        v-model="showDialog"
        title="系统提示"
        message="确认删除订单？"
        @confirm="handleComfirmCancel"
        :showCancelButton="true"
      ></van-dialog>
    </div>
  </div>
</template>

<script>
import { getMyListData, cancelOrder } from "api";
import OrderPanel from "components/orderPanel";
import Header from "./header";

export default {
  data() {
    return {
      myList: [],
      showDialog: false,
      cancelOrderId: 0,
      iLopAlipay: appConfig.alipay,
      bankCard: appConfig.bankCard,
      alipayName: appConfig.alipayName,
      bankCardName: appConfig.bankCardName,
    };
  },
  components: {
    OrderPanel,
    Header,
  },
  created() {
    this._getMyListData();
  },
  methods: {
    async _getMyListData() {
      this.$utils.loading();
      let param = {
        mobile: this.$utils.getCookie("mobile"),
      };
      const { code, data } = await getMyListData(param);
      if (code === 200) {
        this.$toast.clear();
        this.myList = data;
        this.setOverflowScrollHeight();
      }
    },
    goClaimDetail(id) {
      this.$router.push({
        path: "/claim/claimDetail",
        query: {
          id,
        },
      });
    },
    showCancelOrderDialog(id) {
      this.showDialog = true;
      this.cancelOrderId = id;
    },
    handleCopy() {
      this.$toast({
        message: "复制成功",
        duration: 800,
      });
    },
    async handleComfirmCancel() {
      const { code, data } = await cancelOrder(this.cancelOrderId);
      if (code === 200) {
        this._getMyListData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-list {
  .panel {
    margin-right: 12px;
    margin-left: 12px;
  }
  .overflow-scroll {
    height: calc(100vh - 158px);
  }
}
</style>
