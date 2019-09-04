<template>
  <div class="confirm-claim">
    <van-nav-bar @click-left="handleClickLeft" left-arrow left-text="返回" title="你认领的产品"></van-nav-bar>
    <div class="content overflow-scroll">
      <div class="part" v-for="item in choosedList" :key="item.categoryId">
        <div class="part-title">{{item.categoryName}}</div>
        <van-card
        v-for="jtem in item.itemList"
        :key="jtem.id"
        :num="jtem.amount"
        :price="jtem.price"
        :title="jtem.name"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
        ></van-card>
      </div>
      <div class="total-pay">
        <span class="count font-size-12">共{{allAmount}}件商品</span>
        <span>
          <span class="font-size-12">合计：</span>
          <span class="money">￥{{allPayMoney}}</span>
        </span>
      </div>
    </div>
    <van-button type="info" class="bottom-btn">确认认领</van-button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import OrderPanel from "../components/orderPanel";
import Layout from '../mixins/layout';

export default {
  data () {
    return {
      allAmount: 0,
      allPayMoney: 0
    }
  },
  computed: {
    ...mapState(['choosedList']),
  },
  components: {
    OrderPanel
  },
  mixins: [
    Layout
  ],
  mounted () {
    this.choosedList.forEach(item => {
      this.allAmount += item.allAmount;
      this.allPayMoney += item.allPayMoney;
    })
  },
  methods: {
    handleClickLeft () {
      this.$router.push({
        path: '/home'
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.confirm-claim {
  .content {
    padding: 10px;
  }
}
</style>