import Vue from 'vue'
import Vuex from 'vuex';
// import { getWaitingListData } from '../api';

Vue.use(Vuex);

const state = {
  choosedList: [],
  waitingListData: [],
  imagePreview: [],
  showImagePreview: false,
  tabActive: 'appointment',
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
  setTabActive(state, n) {
    state.tabActive = n;
  }
}

function getActiveByRoute(path) {
  console.log(path)
  if (path.indexOf('/appointment/') > -1) {
    return 0;
  }
  if (path.indexOf('/claim/') > -1) {
    return 1;
  }
  if (path.indexOf('/st/') > -1) {
    return 2;
  }
  return 3;
};

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
