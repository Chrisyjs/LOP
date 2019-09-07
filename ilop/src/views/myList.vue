<template>
  <div class="my-list overflow-scroll">
    <div class="panel">
      支付宝账号：{{iLopAlipay}}（张晓红）<br>
      <div flex="main:right">
        <span
          class="copy color-blue cursor-pointer"
          v-clipboard:copy="iLopAlipay"
          v-clipboard:success="handleCopy"
        >一键复制</span>
      </div>
      银行卡账号：{{bankCard}}（屠密迦）<br>
      <div flex="main:right">
        <span
              class="copy color-blue cursor-pointer"
              v-clipboard:copy="bankCard"
              v-clipboard:success="handleCopy"
            >一键复制</span>
      </div>
    </div>
    <div v-if="myList.length">
      <order-panel :item="item" @click.native="() => goClaimDetail(item.orderId)" v-for="item in myList" :key="item.orderId">
        <template v-slot:header>
          <div class="title" flex="main:justify cross:center">
            <div>认领编号：{{item.orderCode}}</div>
            <div>订单状态：{{item.orderStatusName}}</div>
          </div>
        </template>
        <template v-slot:footer>
          <div flex="main:justify cross:center">
            <van-button plain type="info" size="small" v-if="item.orderStatus === 1" @click.stop="() => showCancelOrderDialog(item.orderId)">取消订单</van-button>
            <van-button type="info" size="small" v-if="item.orderStatus === 1">上传付款凭证</van-button>
          </div>
        </template>
      </order-panel>
    </div>
    <div v-else class="panel no-data-tip text-center font-size-14">
      暂无认领，赶快去认领吧！
    </div>
    <!-- 确认弹框 -->
    <van-dialog v-model="showDialog" title="系统提示" message="确认删除订单？" @confirm="handleComfirmCancel" :showCancelButton="true"></van-dialog>
  </div>
</template>

<script>
import { getMyListData, cancelOrder } from "../api";
import OrderPanel from '../components/orderPanel';
import Layout from '../mixins/layout';

export default {
  data() {
    return {
      myList: [],
      showDialog: false,
      cancelOrderId: 0,
      iLopAlipay: 'onemore6@landofpromise.co',
      bankCard: '6236681540019117469'
    };
  },
  components: {
    OrderPanel
  },
  mixins: [Layout],
  created() {
    this._getMyListData();
  },
  methods: {
    async _getMyListData() {
      this.$toast({
        message: '加载中...',
        mask: true,
        loadingType: 'spinner',
        duration: 0,
        forbidClick: true
      })
      let param = {
        mobile: this.$utils.getCookie('mobile')
      }
      const { code, data } = await getMyListData(param);
      if (code === 200) {
        this.$toast.clear();
        this.myList = data;
        this.setOverflowScrollHeight();
      }
    },
    goClaimDetail(id) {
      this.$router.push({
        name: 'claimDetail',
        path: '/claimDetail',
        query: {
          id
        }
      })
    },
    showCancelOrderDialog(id) {
      this.showDialog = true;
      this.cancelOrderId = id;
    },
    handleCopy() {
      this.$toast({
        message: "复制成功",
        duration: 800
      });
    },
    async handleComfirmCancel() {
      const { code, data } = await cancelOrder(this.cancelOrderId);
      if (code === 200) {
        this._getMyListData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-list {
  padding: 10px;
  padding-top: 0;
  .no-data-tip {
  }
}
</style>
