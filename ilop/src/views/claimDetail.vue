<template>
  <div>
    <van-nav-bar class="fixed-header" @click-left="handleClickLeft" left-arrow left-text="返回" title="认领详情"></van-nav-bar>
    <div class="claim-detail overflow-scroll">
      <div class="panel thanks-info text-center">
        <div class="font-size-14">感谢您的奉献</div>
        <div>
          LOP的建设离不开您！谢谢您的摆上！<br>
          愿上帝祝福您和您的家庭！
        </div>
      </div>
      <order-panel :item="detail">
        <template v-slot:header>
          <div class="title" flex="main:justify cross:center">
            <div>认领编号：{{detail.orderCode}}</div>
            <div>订单状态：{{detail.orderStatusName}}</div>
          </div>
        </template>
      </order-panel>
      <div class="order-info panel">
        <div class="title font-size-14">订单信息</div>
        <div class="content font-size-12">
          <div class="item">订单创建时间：{{detail.timeSubmit}}</div>
          <div class="item" v-if="orderStatusIsOne">
            <div class="item">
                i认领支付宝账号：{{iLopAlipay}}(张晓红)
              <span
                class="copy color-blue cursor-pointer"
                v-clipboard:copy="iLopAlipay"
                v-clipboard:success="handleCopy"
              >一键复制</span>
            </div>
            <div class="item">
              银行卡账号：{{bankCard}}(屠密迦)
              <span
                class="copy color-blue cursor-pointer"
                v-clipboard:copy="bankCard"
                v-clipboard:success="handleCopy"
              >一键复制</span>
            </div>
          </div>
          <div class="item" v-if="detail.timePay">订单付款时间：{{detail.timePay}}</div>
          <div class="item" v-if="detail.timeAudit">订单确认时间：{{detail.timeAudit}}</div>
        </div>
      </div>
      <div class="form-info panel">
        <div class="title font-size-14">提交信息</div>
        <div class="content font-size-12">
          <div class="item" flex="main:left cross:center">
            <label :class="[orderStatusIsOne && 'form-required']">您的支付宝账号：</label>
            <template v-if="orderStatusIsOne">
              <input class="input form-item" v-model="yourAlipay" type="text" />
            </template>
            <template v-else>
              <span>{{detail.payAccount}}</span>
            </template>
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
            <label :class="[orderStatusIsOne && 'form-unrequired']">您的备注信息：</label>
            <template v-if="orderStatusIsOne">
              <textarea v-model="remark" class="input form-item" rows="3"></textarea>
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
import OrderPanel from "../components/orderPanel";
import Layout from '../mixins/layout';
import { getClaimDetail, uploadImage, submitOrder } from "../api";

export default {
  data() {
    return {
      detail: {},
      id: this.$route.query.id,
      iLopAlipay: "onemore6@163.com",
      bankCard: "6236681540019117469",
      yourAlipay: "",
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
    this._getClaimDetail();
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
      this.$router.push({
        path: "/home/myList"
      });
    },
    handleCopy() {
      this.$toast({
        message: "复制成功",
        duration: 800
      });
    },
    checkSubmitInfo() {
      let warnMsg = "";
      if (!this.payVouchers.length) {
        warnMsg = "请上传您的付款凭证";
      }
      if (!this.yourAlipay) {
        warnMsg = "请填写您的支付宝账号";
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
          payAccount: this.yourAlipay,
          payImageUrl: data,
          remark: this.remark
        }
        let response = await submitOrder(param);
        if (response.code === 200) {
          this.$toast.clear();
          this.$router.push({
            path: '/home/myList'
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
  .content {
  }
  .copy {
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