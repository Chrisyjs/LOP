<template>
  <div class="confirm-claim">
    <van-nav-bar class="fixed-header" @click-left="handleClickLeft" left-arrow left-text="返回" title="您认领的物品"></van-nav-bar>
    <div class="content overflow-scroll">
      <div class="part" v-for="item in choosedList" :key="item.categoryId">
        <div class="part-title">{{item.categoryName}}</div>
        <van-card
        v-for="jtem in item.itemList"
        :key="jtem.id"
        :num="jtem.choosedAmount"
        :price="jtem.price"
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
        <label class="form-required" for="">您的姓名：<input v-model="name" type="text" class="input"></label>
        <div class="font-size-12 care-note">
          A.感谢您的摆上和奉献，每一笔奉献都会被记录在案。LOP因为有您的加入而更加温暖！！<br>
          B.整体流程如下：<br>
          1）提交认领物品、数量，了解具体的金额<br>
          2）支付宝付款、截图作为付款凭证<br>
          3）“我的认领“页面找到这次认领清单，提交付款凭证、填写相关信息即可<br>
          C.如有任何问题，可以联系XXX@landofpromise.co
        </div>
        <div style="overflow: hidden;">
          <van-checkbox class="check-box font-size-12" flex="cross:baseline" icon-size="12px" v-model="hasRead">已阅读注意事项</van-checkbox>
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
      name: ''
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
    float: right;
  }
  .care-note {
    line-height: 1.6;
  }
  .input {
    width: calc(100% - 90px);
  }
}
</style>