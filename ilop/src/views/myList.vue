<template>
  <div class="my-list">
    <div class="panel" v-for="item in myList" :key="item.id">
      <div class="title" flex="main:justify cross:center">
        <div>认领编号：{{item.orderCode}}</div>
        <div>订单状态：{{item.orderStatusName}}</div>
      </div>
      <van-card
        v-for="jtem in item.itemList"
        :key="jtem.id"
        :num="jtem.amount"
        :price="jtem.payPrice"
        desc=""
        :title="jtem.name"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      />
      <div class="total-pay">
        <span class="count">共{{item.itemAmount}}件商品</span>
        <span class="money">
          合计：
          <span>￥{{item.payMoney}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyListData } from "../api";
export default {
  data() {
    return {
      myList: []
    };
  },
  created() {
    this._getMyListData();
  },
  methods: {
    async _getMyListData() {
      const { code, data } = await getMyListData();
      if (code === 200) {
        this.myList = data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-list {
  padding: 10px;
  .panel {
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    padding: 6px;
    margin-bottom: 6px;
    .title {
      padding: 2px;
    }
    .total-pay {
      text-align: right;
      margin-top: 6px;
      .count {
        font-size: 12px;
        margin-right: 10px;
      }
      .money {
        font-size: 12px;
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>