<template>
  <div>
    <van-nav-bar class="fixed-header" @click-left="handleClickLeft" left-arrow left-text="返回" title="认领详情"></van-nav-bar>
    <div class="claim-detail overflow-scroll">
      <order-panel :item="detail">
        <template v-slot:header>
          <div class="part-title font-size-12" flex="main:justify cross:center">
            <div>认领编号：{{detail.orderCode}}</div>
            <div>订单状态：{{detail.orderStatusName}}</div>
          </div>
        </template>
      </order-panel>
      <div class="order-info panel">
        <div class="part-title font-size-12">订单信息</div>
        <div class="content font-size-12">
          <div class="item">订单创建时间：{{detail.timeSubmit}}</div>
          <div class="item" v-if="detail.timePay">订单付款时间：{{detail.timePay}}</div>
          <div class="item" v-if="detail.timeAudit">订单确认时间：{{detail.timeAudit}}</div>
        </div>
      </div>
      <div class="form-info panel">
        <div class="part-title font-size-12">提交信息</div>
        <div class="content font-size-12">
          <div class="item" flex="main:left cross:center">
          </div>
          <div class="item" flex="main:left cross:top">
            <label :class="[orderStatusIsOne && 'form-required']">
              您的付款凭证：
              <br />
              <span style="opacity: .7;">（即账单截图）</span>
            </label>
            <template v-if="orderStatusIsOne">
              <van-uploader :max-count="1" v-model="payVouchers" />
            </template>
            <template v-else>
              <img
                :src="detail.payImageUrl"
                alt
                style="width: 78px; height: 78px;"
                @click="() => setImagePreview([detail.payImageUrl])"
              />
            </template>
          </div>
          <div class="item" flex="main:left cross:top">
            <label :class="[orderStatusIsOne && 'form-required']">您的备注信息：</label>
            <template v-if="orderStatusIsOne">
              <textarea placeholder="可留下您的支付账号，以便核对" v-model="remark" class="input form-item" rows="3"></textarea>
            </template>
            <template v-else>
              <span>{{detail.remark ? detail.remark : '无'}}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <van-button v-if="orderStatusIsOne" type="info" class="bottom-btn fixed-bottom" @click="handleSubmit">确认提交</van-button>
  </div>
</template>

<script>
import OrderPanel from "components/orderPanel";
import Layout from 'mixins/layout';
import { getClaimDetail, uploadImage, submitOrder } from "api";

export default {
  data() {
    return {
      detail: {},
      id: this.$route.query.id,
      iLopAlipay: appConfig.alipay,
      bankCard: appConfig.bankCard,
      payVouchers: [],
      images: [],
      remark: ''
    };
  },
  computed: {
    orderStatusIsOne() {
      return this.detail.orderStatus === 1;
    }
  },
  components: {
    OrderPanel
  },
  mixins: [
    Layout
  ],
  created() {
    this._getClaimDetail()
      .then(() => {
        this.orderStatusIsOne && this.isWeiXinEnv &&
        this.$notify({
          message: "如遇问题，可尝试用浏览器打开",
          type: 'primary'
        })
      })
  },
  mounted() {

  },
  methods: {
    async _getClaimDetail() {
      const { code, data } = await getClaimDetail(this.id);
      this.detail = data;
      this.setOverflowScrollHeight();
    },
    handleClickLeft() {
      this.$router.back(-1);
    },
    checkSubmitInfo() {
      let warnMsg = "";
      if (!this.remark) {
        warnMsg = "请输入备注信息";
      }
      if (!this.payVouchers.length) {
        warnMsg = "请上传您的付款凭证";
      }
      if (warnMsg) {
        this.$notify({
          message: warnMsg,
          type: "warning",
        });
        return false;
      }
      return true;
    },
    async handleSubmit() {
      if (!this.checkSubmitInfo()) return;
      let param = new FormData();
      param.append('mulFile', this.payVouchers[0].file);
      this.$toast({
        message: '提交中...',
        mask: true,
        loadingType: 'spinner',
        duration: 0,
        forbidClick: true
      })
      let { code, data } = await uploadImage(param);
      if (code === 200) {
        param = {
          orderId: this.detail.orderId,
          payImageUrl: data,
          remark: this.remark
        }
        let response = await submitOrder(param);
        if (response.code === 200) {
          this.$toast.clear();
          this.$dialog.alert({
            title: '系统提示',
            message: appConfig.claimSucText
          })
          this.$router.push({
            path: '/claim/myList'
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.claim-detail {
  padding: 10px;
  padding-bottom: 0;
  &.overflow-scroll {
    height: calc(100vh - 94px);
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
  .thanks-info {
  }
}
.submit-btn {
  width: 100%;
}
</style>
