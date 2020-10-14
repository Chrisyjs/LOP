import Vue from 'vue'
import Vuex from 'vuex';
// import { getWaitingListData } from '../api';

Vue.use(Vuex);

const state = {
  token: '',
  authList: [],  // 菜单权限
  choosedList: [],
  waitingListData: [],
  imagePreview: [],
  showImagePreview: false,
  hasNotice: false,  // 头部是否有 notice 滚动，影响号码显示位置
}

const mutations = {
  setChoosedList (state, list) {
    list = JSON.parse( JSON.stringify(list) );
    list = list.filter(item => item.allChoosedAmount);
    list.forEach(item => {
      item.itemList = item.itemList.filter(jtem => jtem.choosedAmount)
    })
    state.choosedList = list;
  },
  resetChoosedList (state) {
    state.choosedList = [];
  },
  setImagePreview(state, imagePreview) {
    state.imagePreview = imagePreview;
    state.showImagePreview = !!imagePreview.length;
  },
  setShowImagePreview(state, showImagePreview) {
    state.showImagePreview = showImagePreview;
  },
  setHasNotice(state, hasNotice) {
    state.hasNotice = hasNotice;
  },
  setAuthList(state, authList) {
    state.authList = authList;
  },
  setToken(state, token) {
    state.token = token;
  }
}

const getters = {
  choosedList (state) {
    return state.choosedList;
  }
}

const actions = {
  // async _getWaitingListData ({commit, state}) {
  //   const { code, data } = await getWaitingListData();
  //   if (code === 200) {
  //     state.waitingListData = data.map((item, index) => {
  //       return {
  //         categoryId: item.categoryId,
  //         categoryName: item.categoryName,
  //         itemList: item.itemList.map(jtem => {
  //           return {
  //             id: jtem.id,
  //             name: jtem.name,
  //             imageUrl: jtem.imageUrl,
  //             price: jtem.price,
  //             progressPercent: jtem.progressPercent,
  //             payAmount: jtem.payAmount,
  //             amountClaimed: jtem.amountClaimed,
  //             choosedAmount: 0
  //           }
  //         }),
  //         allChoosedAmount: 0,
  //         allChoosedPayMoney: 0,
  //         active: index === 0
  //       }
  //     });
  //   }
  // }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})
