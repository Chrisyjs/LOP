<template>
  <div class="claim-detail">
    <van-nav-bar @click-left="handleClickLeft" left-arrow left-text="返回" title="认领详情"></van-nav-bar>
    <div>
      <order-panel :item="detail"></order-panel>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script>
import OrderPanel from '../components/orderPanel';
import { getClaimDetail } from '../api';

export default {
  data () {
    return {
      detail: {}
    }
  },
  components: {
    OrderPanel
  },
  created() {
    this._getClaimDetail();
  },
  methods: {
    async _getClaimDetail() {
      const { code, data } = await getClaimDetail();
      this.detail = data;
    },
    handleClickLeft() {
      this.$router.push({
        path: '/home/myList'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.claim-detail {
  padding: 10px;
}
</style>