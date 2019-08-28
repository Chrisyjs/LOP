import axios from 'vue-axios';
import qs from 'qs';
const domain = '';

export function getWaitingListData () {
  // return axios.get(`${domain}/api/crowdfunding/item/Unclaim/list`)
  return {
    msg: "success",
    code: 200,
    data: [
      {
        categoryId: 101,
        categoryName: "众筹认股",
        itemList: [
          {
            id: 6,
            name: "踢脚线",
            amountTotal: 1,
            price: 3200,
            payAmount: 1,
            payPrice: 3200,
            introduction: null,
            imageUrl: null,
            categoryType: 101,
            amountClaimed: 0,
            progressPercent: "0%",
            categoryTypeName: "众筹认股"
          },
          {
            id: 5,
            name: "活动家具定制",
            amountTotal: 1,
            price: 40000,
            payAmount: 1,
            payPrice: 40000,
            introduction: null,
            imageUrl: null,
            categoryType: 101,
            amountClaimed: 0,
            progressPercent: "0%",
            categoryTypeName: "众筹认股"
          },
          {
            id: 4,
            name: "大堂高隔间隔断",
            amountTotal: 1,
            price: 30000,
            payAmount: 1,
            payPrice: 30000,
            introduction: null,
            imageUrl: null,
            categoryType: 101,
            amountClaimed: 0,
            progressPercent: "0%",
            categoryTypeName: "众筹认股"
          },
          {
            id: 3,
            name: "基础装修",
            amountTotal: 1,
            price: 115000,
            payAmount: 1,
            payPrice: 115000,
            introduction: null,
            imageUrl: null,
            categoryType: 101,
            amountClaimed: 0,
            progressPercent: "0%",
            categoryTypeName: "众筹认股"
          }
        ]
      }
    ]
  };
}

