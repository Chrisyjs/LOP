<template>
  <div class="claim-list">
    <div class="top-btn-group">
      <van-button type="info" :plain="currentTab !== 'waitingList'" size="small">待认领物品</van-button>
      <van-button type="info" :plain="currentTab !== 'myList'" size="small">我的认领</van-button>
    </div>
    <div class="isWaitingListWrap" v-show="currentTab === 'waitingList'">
      <div class="side-bar" flex="dir:top">
        <a
          :class="[item.active && 'active']"
          :href="`#${item.categoryId}`"
          v-for="(item) in typeListData"
          :key="item.categoryId"
        >{{item.categoryName}}</a>
      </div>
      <div class="list">
        <div class="part" v-for="item in waitingListData" :key="item.categoryId">
          <div class="part-title">{{item.categoryName}}</div>
          <div
            class="card"
            v-for="jtem in item.itemList"
            :key="jtem.id"
            flex="main:justify cross:center"
          >
            <div class="image"></div>
            <div class="content">
              <p class="title">{{jtem.name}}*50</p>
              <div flex="main:justify">
                <span class="price">￥{{jtem.payPrice}}</span>
                <van-stepper v-model="jtem.count" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="isMyListWrap" v-show="currentTab === 'myList'"></div>
  </div>
</template>

<script>
import { getWaitingListData } from "../api/index.js";

export default {
  data() {
    return {
      currentTab: "waitingList", // waitingList、myList
      activeIdx: 0,
      typeListData: [],
      waitingListData: []
    };
  },
  created () {
    this._getWaitingListData();
  },
  methods: {
    async _getWaitingListData() {
      const { code, data } = await getWaitingListData();
      this.waitingListData = data;
      this.typeListData = data.map((item, index) => {
        return {
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          active: index === 0 
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.claim-list {
  .top-btn-group {
    text-align: center;
    padding: 10px;
  }
  .isWaitingListWrap {
    .side-bar {
      position: fixed;
      top: 60px;
      left: 0;
      background-color: #f2f3f5;
      a.active {
        background-color: #fff;
      }
      a {
        padding: 10px 20px;
        color: #323233;
      }
    }
    .list {
      border-top: 1px solid #dbdbdb;
      padding-left: 104px;
    }
    /deep/ .van-sidebar-item {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .card {
      padding: 0 10px;
      .image {
        width: 60px;
        height: 60px;
        background: url(../assets/logo.png) no-repeat;
        background-size: contain;
      }
      .title {
        color: #222;
        font-size: 17px;
      }
      .price {
        font-size: 16px;
        color: rgba(153, 153, 153, 1);
      }
      .content {
        width: calc(100% - 60px);
      }
    }
  }
}
</style>