<template>
  <div class="my-list overflow-scroll">
    <order-panel :item="item" @click.native="() => goClaimDetail(item.orderId)" v-for="item in myList" :key="item.orderId">
      <template v-slot:header>
        <div class="title" flex="main:justify cross:center">
          <div>认领编号：{{item.orderCode}}</div>
          <div>订单状态：{{item.orderStatusName}}</div>
        </div>       
      </template>
      <template v-slot:footer>
        <div flex="main:justify cross:center">
          <van-button plain type="info" size="small" v-if="item.orderStatus === 1" @click.stop="handleComfirmCancel(item.orderId)">取消订单</van-button>
          <van-button type="info" size="small" v-if="item.orderStatus === 1">上传付款凭证</van-button>
        </div>
      </template>
    </order-panel>

    <!-- 确认弹框 -->
    <van-dialog v-model="showDialog" title="系统提示" message="确认删除订单？" :showCancelButton="true"></van-dialog>
  </div>
</template>

<script>
import { getMyListData } from "../api";
import OrderPanel from '../components/orderPanel';

export default {
  data() {
    return {
      myList: [],
      showDialog: false
    };
  },
  components: {
    OrderPanel
  },
  created() {
    this._getMyListData();
  },
  methods: {
    async _getMyListData() {
      let param = {
        mobile: "15068865038"
      }
      const { code, data } = await getMyListData(param);
      if (code === 200) {
        this.myList = data;
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
    handleComfirmCancel(id) {
      this.showDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-list {
  padding: 10px;
}
</style>