<template>
  <div class="claim-list">
    <div class="is-waitingList-wrap">
      <div class="side-bar" flex="dir:top">
        <div class="side-bar-item"
          @click="() => scrollTo(item)"
          :class="[item.active && 'active']"
          v-for="(item) in waitingListData"
          :key="item.categoryId"
        >
        {{item.categoryName}}
        <span class="total font-size-12" v-if="item.allAmount">{{item.allAmount < 99 ? item.allAmount : '99+'}}</span>
        </div>
      </div>
      <div class="list overflow-scroll" @scroll="handleScroll">
        <div class="part" v-for="item in waitingListData" :key="item.categoryId">
          <div :id="`${item.categoryId}`" class="part-title">{{item.categoryName}}</div>
          <div
            class="card"
            v-for="jtem in item.itemList"
            :key="jtem.id"
            flex="main:justify cross:stretch"
          >
            <div class="image"></div>
            <div class="content">
              <div class="title">{{jtem.name}}</div>
              <div flex="main:justify">
                <span class="price font-size-12">￥{{jtem.price}}</span>
                <van-stepper @change="(val) => handleStepChange(val, item)" :min="0" :max="100" :button-size="'20px'" :class="[{'active': jtem.choosedAmount}]" integer v-model="jtem.choosedAmount" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-button type="info" :to="'/confirmClaim'" class="bottom-btn">去认领</van-button>
    </div>
  </div>
</template>

<script>
import { getWaitingListData } from "../api/index.js";
import { debounce } from 'lodash';
import { mapState, mapMutations, mapActions } from 'vuex'
import Layout from '../mixins/layout';

export default {
  data() {
    return {
      activeIdx: 0,
      // waitingListData: [],
    };
  },
  computed: {
    ...mapState(['waitingListData'])
  },
  created () {
    // this._getWaitingListData();
  },
  mixins: [
    Layout
  ],
  mounted () {
  },
  watch: {
  },
  methods: {
    ...mapMutations(['setChoosedList']),
    /* async _getWaitingListData() {
      const { code, data } = await getWaitingListData();
      if (code === 200) {
        this.waitingListData = data.map((item, index) => {
          return this.resetFromVuex(item, index);
        });
      }
    },
    resetFromVuex(item, index) {
      let categoryItem = this.choosedList.find(i => i.categoryId === item.categoryId) || {};
      return {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        itemList: item.itemList.map(jtem => {
          let obj = categoryItem.itemList && categoryItem.itemList.find(i => i.id === jtem.id) || {};
          return Object.assign({}, {
            id: jtem.id,
            name: jtem.name,
            imageUrl: jtem.imageUrl,
            price: jtem.price,
            progressPercent: jtem.progressPercent,
          }, {amount: obj.amount || 0})
        }),
        allAmount: categoryItem.allAmount || 0,
        allPayMoney: categoryItem.allPayMoney || 0,
        active: index === 0
      }
    }, */
    setSideBarStatus (item) {
      let obj = this.waitingListData.find(jtem => jtem.active === true);
      obj.active = false;
      item.active = true;
    },
    scrollTo (item) {
      this.setSideBarStatus(item);
      document.getElementById(`${item.categoryId}`).scrollIntoView({
        behavior: "smooth"
      });
    },
    handleScroll: debounce(
      function (e){
        this.waitingListData.forEach(item => {
          let rect = document.getElementById(`${item.categoryId}`).getBoundingClientRect();
          if (rect.top <= 100) {
            this.setSideBarStatus(item);
          }
        })
      },
    200),
    handleStepChange (val, item) {
      item.allAmount = 0;
      item.allPayMoney = 0;
      item.itemList.forEach(jtem => {
        item.allAmount += jtem.amount;
        item.allPayMoney += jtem.price * jtem.amount;
      })
      this.setChoosedList(this.waitingListData);
    }
  }
};
</script>

<style lang="scss" scoped>
.claim-list {
  .is-waitingList-wrap {
    .side-bar {
      height: 100%;
      position: fixed;
      top: 60px;
      left: 0;
      background-color: #f2f3f5;
      .side-bar-item {
        position: relative;
        padding: 10px 20px;
        color: #323233;
        &.active {
          background-color: #fff;
        }
        .total {
          position: absolute;
          top: 2px;
          right: 2px;
          background-color: $blue;
          color: #fff;
          padding: 3px;
          border-radius: 16px;
          min-width: 16px;
          line-height: 14px;
          text-align: center;
          border: 1px solid #fff;
        }
      }
    }
    .list {
      font-size: 14px;
      padding: 0 10px;
      // margin-top: 50px;
      border-top: 1px solid #dbdbdb;
      padding-left: 104px;
      .part {
        .part-title {
          // color: $blue;
        }
      }
    }
    /deep/ .van-sidebar-item {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .card {
      padding: 4px 0;
      .active {
        /deep/ .van-stepper__input {
          color: #fff;
          background-color: $blue;
        }
      }
      .image {
        width: 60px;
        height: 60px;
        background: url(https://img.yzcdn.cn/vant/t-thirt.jpg) no-repeat;
        background-size: contain;
      }
      .title {
        color: #222;
      }
      .price {
        color: $red;
      }
      .content {
        width: calc(100% - 64px);
        .title {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>