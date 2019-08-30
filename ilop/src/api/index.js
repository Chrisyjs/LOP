import { axios } from '../api/interceptors';
import qs from 'qs';

// const domain = 'http://www.landofpromise.co:8080/lop_project';
const domain = '';

export function getWaitingListData() {
  return axios.get(`${domain}/api/crowdfunding/item/Unclaim/list`)
}

export function getMyListData(param) {
  return axios.post(`${domain}/api/crowdfunding/order/list`, param)
}

export function getClaimDetail(id) {
  return axios.get(`${domain}/api/crowdfunding/order/detail/${id}`)
}
