<template>
  <div class="panel">
    <div class="title" flex="main:justify cross:center">
      <div>认领编号：{{item.orderCode}}</div>
      <div>订单状态：{{item.orderStatusName}}</div>
    </div>
    <van-card
      v-for="jtem in item.itemList"
      :key="jtem.id"
      :num="jtem.amount"
      :price="jtem.payPrice"
      desc
      :title="jtem.name"
      thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
    />
    <div class="total-pay">
      <span class="count font-size-12">共{{item.itemAmount}}件商品</span>
      <span>
        <span class="font-size-12">合计：</span>
        <span class="money">￥{{item.payMoney}}</span>
      </span>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.panel {
  .title {
    padding: 2px;
  }
  .total-pay {
    text-align: right;
    padding: 6px 0;
    .count {
      margin-right: 10px;
    }
    .money {
      color: $red;
    }
  }
}
</style>