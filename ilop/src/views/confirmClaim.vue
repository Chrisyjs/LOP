<template>
  <div class="confirm-claim">
    <van-nav-bar class="fixed-header" @click-left="handleClickLeft" left-arrow left-text="返回" title="您认领的物品"></van-nav-bar>
    <div class="content overflow-scroll">
      <div class="part" v-for="item in choosedList" :key="item.categoryId">
        <div class="part-title font-size-14">{{item.categoryName}}</div>
        <van-card
        v-for="jtem in item.itemList"
        :key="jtem.id"
        :num="jtem.choosedAmount"
        :price="jtem.payPrice"
        :title="jtem.name"
        :thumb="jtem.imageUrl || 'https://img.yzcdn.cn/vant/t-thirt.jpg'"
        ></van-card>
      </div>
      <div class="total-pay">
        <span class="count font-size-12">共{{allAmount}}件商品</span>
        <span>
          <span class="font-size-12">合计：</span>
          <span class="money">￥{{allPayMoney}}</span>
        </span>
      </div>
      <div class="panel care-note-wrap">
        <div style="padding-bottom: 8px;">
          <label class="form-required" for="">您的姓名：</label>
          <input v-model="name" type="text" class="input">
        </div>
        <div class="font-size-12 care-note">
          具体流程：<br>
          1）	认领：选择物品，确认提交认领<br>
          2）	支付方式：<br>
          <div class="item">
            支付宝账号：{{iLopAlipay}}（张晓红）<br>
          <div flex="main:right"> 
            <span
              class="copy color-blue cursor-pointer"
              v-clipboard:copy="iLopAlipay"
              v-clipboard:success="handleCopy"
            >一键复制</span>
          </div>
          银行卡账号：{{bankCard}}（屠密迦）<br>
          <div flex="main:right">
          <span
                class="copy color-blue cursor-pointer"
                v-clipboard:copy="bankCard"
                v-clipboard:success="handleCopy"
              >一键复制</span> 
          </div>
          转账备注：认领人姓名+物品名字
          </div>
          3）	上传：上传付款凭证（转账截图），确认提交联名认领需上传合成的付款凭证长图
        </div>
        <div style="overflow: hidden;">
          <van-checkbox class="check-box font-size-12" flex="cross:baseline" icon-size="12px" v-model="hasRead"><span class="color-blue">已阅读注意事项</span></van-checkbox>
        </div>
      </div>
    </div>
    <van-button type="info" class="bottom-btn fixed-bottom" @click="handleConfirm">确认认领</van-button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import OrderPanel from "../components/orderPanel";
import Layout from '../mixins/layout';
import { confirmClaim } from '../api';

export default {
  data () {
    return {
      allAmount: 0,
      allPayMoney: 0,
      hasRead: false,
      name: '',
      iLopAlipay: 'onemore6@landofpromise.co',
      bankCard: '6236681540019117469'
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
      this.allAmount += item.allChoosedAmount;
      this.allPayMoney += item.allChoosedPayMoney;
    })
    this.setOverflowScrollHeight();
  },
  methods: {
    ...mapMutations(['resetChoosedList']),
    handleClickLeft () {
      this.$router.push({
        path: '/home'
      })
    },
    handleCopy() {
      this.$toast({
        message: "复制成功",
        duration: 800
      });
    },
    async handleConfirm() {
      if (!this.hasRead || !this.name) {
        document.querySelector('.care-note-wrap').scrollIntoView({
          behavior: "smooth"
        });
        this.$notify({
          message: '请填写姓名及阅读注意事项并勾选',
          type: 'warning'
        })
        return;
      } 
      let list = [];
      this.choosedList.forEach(item => {
        let arr = item.itemList.map(jtem => {
          return {
            itemId: jtem.id,
            amount: jtem.choosedAmount
          }
        });
        list = list.concat(arr);
      })
      let param = {
        memberMobile: this.$utils.getCookie('mobile'),
        memberName: this.name,
        itemList: list
      }
      this.$toast({
        message: '认领中...',
        mask: true,
        loadingType: 'spinner',
        duration: 0,
        forbidClick: true
      })
      const { code, data } = await confirmClaim(param);
      if (code === 200) {
        this.$toast.clear();
        this.resetChoosedList();
        this.$router.push({
          path: '/home/myList'
        });
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.confirm-claim {
  .content {
    padding: 10px;
  }
  .check-box {
    padding-top: 4px;
    float: right;
    /deep/ .van-checkbox__icon .van-icon {
      border-color: $blue;
    }
  }
  .care-note {
    line-height: 1.6;
  }
  .part-title {
    padding-left: 10px;
  }
  .input {
    width: calc(100% - 90px);
  }
}
</style>