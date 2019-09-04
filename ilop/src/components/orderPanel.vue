<template>
  <div class="panel">
    <slot name="header"></slot>
    <van-card
      v-for="jtem in item.itemList"
      :key="jtem.id"
      :num="jtem.amount"
      :price="jtem.payPrice"
      desc=""
      :title="jtem.name"
      :thumb="jtem.imageUrl || 'https://img.yzcdn.cn/vant/t-thirt.jpg'"
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
}
</style>