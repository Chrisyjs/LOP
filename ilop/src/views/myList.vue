<template>
  <div class="my-list">
    <order-panel :item="item" @click.native="() => goClaimDetail(item.id)" v-for="item in myList" :key="item.id"></order-panel>
  </div>
</template>

<script>
import { getMyListData } from "../api";
import OrderPanel from '../components/orderPanel';
export default {
  data() {
    return {
      myList: []
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
      const { code, data } = await getMyListData();
      if (code === 200) {
        this.myList = data;
      }
    },
    goClaimDetail(id) {
      this.$router.push({
        path: '/claimDetail',
        query: {
          id
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.my-list {
  padding: 10px;
}
</style>