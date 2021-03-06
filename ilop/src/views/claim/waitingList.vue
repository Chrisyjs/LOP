<template>
  <div>
    <Header></Header>
    <div class="claim-list">
      <div class="is-waitingList-wrap">
        <div class="side-bar" flex="dir:top">
          <a
            class="side-bar-item"
            :href="`#${item.categoryId}`"
            @click="() => scrollTo(item)"
            :class="[item.active && 'active']"
            v-for="item in waitingListData"
            :key="item.categoryId"
          >
            {{ item.categoryName }}
            <span
              class="total text-center font-size-12"
              v-if="item.allChoosedAmount"
              >{{
                item.allChoosedAmount < 99 ? item.allChoosedAmount : "99+"
              }}</span
            >
            <span
              class="red-dot"
              v-if="item.hasStock && !item.allChoosedAmount"
            ></span>
          </a>
        </div>
        <div class="list overflow-scroll" @scroll="handleScroll">
          <div
            class="part"
            v-for="item in waitingListData"
            :key="item.categoryId"
          >
            <div :id="`${item.categoryId}`" class="part-title font-size-14">
              {{ item.categoryName }}
            </div>
            <div
              class="card color-gray"
              v-for="jtem in item.itemList"
              :key="jtem.id"
              flex="main:justify cross:stretch"
            >
              <div
                @click="() => setImagePreview([jtem.imageUrl])"
                class="image"
                :style="{ 'background-image': `url(${jtem.imageUrl})` }"
              ></div>
              <div class="content">
                <div flex="main:justify cross:strech">
                  <div class="title font-size-12">{{ jtem.name }}</div>
                  <div
                    :class="{
                      'color-gray': !jtem.stockNum,
                      'color-red': jtem.stockNum,
                      'font-size-12': true,
                    }"
                    style="min-width: 76px;"
                  >
                    <div class="margin4" style="margin-top: 0">
                      总计：{{ jtem.payAmount
                      }}{{ jtem.categoryType != 101 ? "份" : "股" }}
                    </div>
                    <div class="margin4">
                      剩余：{{ jtem.stockNum
                      }}{{ jtem.categoryType != 101 ? "份" : "股" }}
                    </div>
                  </div>
                </div>
                <div flex="main:justify">
                  <span class="price color-red font-size-12"
                    >￥{{ jtem.payPrice }}</span
                  >
                  <van-stepper
                    @change="(val) => handleStepChange(val, item)"
                    :min="0"
                    :max="jtem.stockNum"
                    :button-size="'20px'"
                    :class="[{ active: jtem.choosedAmount }]"
                    integer
                    v-model="jtem.choosedAmount"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-button
          type="info"
          @click="handleGotoClaim"
          class="fixed-bottom"
          >去认领</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getWaitingListData } from "@/api/claim.js";
import { debounce } from "lodash";
import { mapGetters, mapState, mapMutations } from "vuex";
import Header from "./header";

export default {
  data() {
    return {
      activeIdx: 0,
      waitingListData: [],
    };
  },
  components: {
    Header,
  },
  computed: {
    ...mapState(["choosedList"]),
  },
  created() {
    this._getWaitingListData();
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(["setChoosedList", "setImagePreview"]),
    async _getWaitingListData() {
      this.$utils.loading();
      const { code, data } = await getWaitingListData();
      if (code === 200) {
        this.waitingListData = data.map((item, index) => {
          return this.resetFromVuex(item, index);
        });
      }
    },
    resetFromVuex(item, index) {
      let categoryItem =
        this.choosedList.find((i) => i.categoryId === item.categoryId) || {};
      let hasStock = false;
      let itemList = item.itemList.map((jtem) => {
        let stockNum = jtem.payAmount - jtem.amountClaimed;
        if (stockNum) hasStock = true;
        let obj =
          (categoryItem.itemList &&
            categoryItem.itemList.find((i) => i.id === jtem.id)) ||
          {};
        return Object.assign(
          {},
          {
            id: jtem.id,
            name: jtem.name,
            imageUrl: jtem.imageUrl,
            payPrice: jtem.payPrice,
            progressPercent: jtem.progressPercent,
            amountClaimed: jtem.amountClaimed,
            payAmount: jtem.payAmount,
            categoryType: jtem.categoryType,
            stockNum,
          },
          { choosedAmount: obj.choosedAmount || 0 }
        );
      });
      return {
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        hasStock,
        itemList,
        allChoosedAmount: categoryItem.allChoosedAmount || 0,
        allChoosedPayMoney: categoryItem.allChoosedPayMoney || 0,
        active: index === 0,
      };
    },
    setSideBarStatus(item) {
      let obj = this.waitingListData.find((jtem) => jtem.active === true);
      obj.active = false;
      item.active = true;
    },
    scrollTo(item) {
      this.setSideBarStatus(item);
    },
    handleScroll: debounce(function(e) {
      this.waitingListData.forEach((item) => {
        let rect = document
          .getElementById(`${item.categoryId}`)
          .getBoundingClientRect();
        if (rect.top <= 100) {
          this.setSideBarStatus(item);
        }
      });
    }, 200),
    handleStepChange(val, item) {
      item.allChoosedAmount = 0;
      item.allChoosedPayMoney = 0;
      item.itemList.forEach((jtem) => {
        item.allChoosedAmount += jtem.choosedAmount;
        item.allChoosedPayMoney += jtem.payPrice * jtem.choosedAmount;
      });
      this.setChoosedList(this.waitingListData);
    },
    handleGotoClaim() {
      const obj = this.waitingListData.find((item) => item.allChoosedAmount);
      if (!obj) {
        this.$notify({
          message: "请选择认领物品",
          type: "warning",
        });
        return;
      }
      this.$router.push({
        path: "/claim/confirmClaim",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.claim-list {
  .is-waitingList-wrap {
    .overflow-scroll {
      height: calc(100vh - 94px);
    }
    .side-bar {
      height: 100%;
      position: fixed;
      top: 51px;
      left: 0;
      background-color: #f2f3f5;
      .side-bar-item {
        position: relative;
        padding: 10px 20px;
        color: #323233;
        &.active {
          background-color: #fff;
        }
        .red-dot {
          position: absolute;
          z-index: 10;
          background-color: $red;
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 4px;
          right: 10px;
          top: 10px;
        }
        .total {
          position: absolute;
          z-index: 100;
          top: 2px;
          right: 2px;
          background-color: $blue;
          color: #fff;
          padding: 3px;
          border-radius: 16px;
          min-width: 16px;
          line-height: 14px;
          border: 1px solid #fff;
        }
      }
    }
    .list {
      padding: 0 10px;
      // margin-top: 50px;
      border-top: 1px solid #dbdbdb;
      padding-left: 104px;
      .part {
        .part-title {
          padding-top: 6px;
        }
      }
    }
    ::v-deep .van-sidebar-item {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .card {
      padding: 8px 0;
      .active {
        ::v-deep .van-stepper__input {
          color: #fff;
          background-color: $blue;
        }
      }
      .image {
        width: 60px;
        height: 60px;
        background-repeat: no-repeat;
        background-size: contain;
      }
      .title {
        color: #222;
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
