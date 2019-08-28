import axios from 'axios';
import qs from 'qs';
const domain = '';

export function getWaitingListData() {
  // return axios.get(`${domain}/api/crowdfunding/item/Unclaim/list`)
  return {
    msg: "success",
    code: 200,
    data: [
      {
        categoryId: 101,
        categoryName: "大堂",
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
            categoryTypeName: "大堂"
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
            categoryTypeName: "大堂"
          }
        ]
      },
      {
        categoryId: 102,
        categoryName: "主日学",
        itemList: [
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
            categoryTypeName: "主日学"
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
            categoryTypeName: "主日学"
          },
          {
            id: 5,
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
            categoryTypeName: "主日学"
          },
          {
            id: 6,
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
            categoryTypeName: "主日学"
          },
          {
            id: 7,
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
            categoryTypeName: "主日学"
          },
          {
            id: 8,
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
            categoryTypeName: "主日学"
          }
        ]
      },
      {
        categoryId: 103,
        categoryName: "母婴室",
        itemList: [
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
            categoryTypeName: "母婴室"
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
            categoryTypeName: "母婴室"
          },
          {
            id: 5,
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
            categoryTypeName: "母婴室"
          },
          {
            id: 6,
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
            categoryTypeName: "母婴室"
          },
          {
            id: 7,
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
            categoryTypeName: "母婴室"
          },
          {
            id: 8,
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
            categoryTypeName: "母婴室"
          }
        ]
      }
    ]
  };
}

export function getMyListData(phone) {
  // return axios.get(`${domain}/api/crowdfunding/order/list`, phone)
  return {
    "msg": "success",
    "code": 200,
    "data": [
      {
        "id": 3,
        "orderCode": "LOP647190",
        "orderStatus": 1,
        "payMoney": 8200.0,
        "itemAmount": 2,
        "orderStatusName": "待付款",
        "itemList": [
          {
            "id": 5,
            "orderId": 3,
            "itemId": 13,
            "amount": 1,
            "name": "小班空调",
            "payPrice": 4100.0,
            "imageUrl": null
          },
          {
            "id": 6,
            "orderId": 3,
            "itemId": 12,
            "amount": 1,
            "name": "大班空调",
            "payPrice": 4100.0,
            "imageUrl": null
          }
        ]
      },
      {
        "id": 4,
        "orderCode": "LOP305521",
        "orderStatus": 2,
        "payMoney": 1000.0,
        "itemAmount": 1,
        "orderStatusName": "待付款",
        "itemList": [
          {
            "id": 7,
            "orderId": 4,
            "itemId": 11,
            "amount": 1,
            "name": "主日学大班、小班灯具",
            "payPrice": 1000.0,
            "imageUrl": null
          }
        ]
      }
    ]
  }
}

