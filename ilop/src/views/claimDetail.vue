<template>
  <div>
    <van-nav-bar @click-left="handleClickLeft" left-arrow left-text="返回" title="认领详情"></van-nav-bar>
    <div class="claim-detail">
      <order-panel :item="detail">
        <!-- <template v-slot:footer>
        <div flex="main:left">
          <van-button plain type="info">取消订单</van-button>
        </div>
        </template>-->
      </order-panel>
      <div class="order-info panel">
        <div class="title">订单信息</div>
        <div class="content font-size-12">
          <div class="item">订单创建时间：{{detail.timeSubmit}}</div>
          <div class="item" v-if="orderStatusIsOne">
            i认领支付宝账号：{{alipay}}
            <span
              class="copy cursor-pointer"
              v-clipboard:copy="alipay"
              v-clipboard:success="handleCopy"
            >一键复制</span>
          </div>
          <div class="item" v-if="detail.timePay">订单付款时间：{{detail.timePay}}</div>
          <div class="item" v-if="detail.timeAudit">订单确认时间：{{detail.timeAudit}}</div>
        </div>
      </div>
      <div class="form-info panel">
        <div class="title">提交信息</div>
        <div class="content font-size-12">
          <div class="item" flex="main:left cross:center">
            <label :class="[orderStatusIsOne && 'form-required']">你的支付宝账号：</label>
            <template v-if="orderStatusIsOne">
              <input class="input form-item" type="text" />
            </template>
            <template v-else>
              <span>{{detail.payAccount}}</span>
            </template>
          </div>
          <div class="item" flex="main:left cross:top">
            <label :class="[orderStatusIsOne && 'form-required']">你的付款凭证：</label>
            <template v-if="orderStatusIsOne">
              <van-uploader :max-count="1" v-model="payVouchers" />
            </template>
            <template v-else>
              <img :src="detail.payImageUrl" alt="" style="width: 78px; height: 78px;" @click="() => showImagePreview(detail.payImageUrl)">
            </template>
          </div>
          <div class="item" flex="main:left cross:top">
            <label :class="[orderStatusIsOne && 'form-unrequired']">你的备注信息：</label>
            <template v-if="orderStatusIsOne">
              <textarea class="input form-item" rows="3"></textarea>
            </template>
            <template v-else>
              <span>{{detail.remark}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <van-button type="info" class="bottom-btn">确认提交</van-button>
    <van-image-preview v-model="showImage" :images="images"></van-image-preview>
  </div>
</template>

<script>
import OrderPanel from "../components/orderPanel";
import { getClaimDetail } from "../api";

export default {
  data() {
    return {
      detail: {},
      id: this.$route.query.id,
      alipay: "onemore6@163.com",
      payVouchers: [],
      showImage: false,
      images: []
    };
  },
  computed: {
    orderStatusIsOne () {
      return this.detail.orderStatus === 1;
    }
  },
  components: {
    OrderPanel
  },
  created() {
    this._getClaimDetail();
  },
  mounted() {
    this.$nextTick(() => {
      let dom = document.querySelector('.claim-detail');
      dom.style.height = document.documentElement.clientHeight - 100 + 'px';
    })
  },
  methods: {
    async _getClaimDetail() {
      const { code, data } = await getClaimDetail(this.id);
      this.detail = data;
    },
    handleClickLeft() {
      this.$router.push({
        path: "/home/myList"
      });
    },
    handleCopy() {
      this.$toast({
        message: "复制成功",
        duration: 500
      });
    },
    showImagePreview(imgUrl) {
      this.images = [imgUrl];
      this.showImage = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.claim-detail {
  overflow-y: auto;
  padding: 10px;
  padding-bottom: 0;
  .content {
    color: $gray;
  }
  .copy {
    color: $blue;
  }
  .item {
    margin: 6px 0;
  }
  .form-info {
    label {
      display: inline-block;
      min-width: 108px;
    }
    .form-item {
      width: calc(100% - 108px);
    }
  }
}
.submit-btn {
  width: 100%;
}
</style>