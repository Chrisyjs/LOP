import { axios } from '../api/interceptors';
import qs from 'qs';

// const domain = 'http://www.landofpromise.co:8080/lop_project';
const domain = '';

/* 登录 */
// 获取验证码
export function getValidCode(param) {
  return axios.post(`${domain}/api/crowdfunding/login/get/code`, param)
}
// 登录
export function login(param) {
  return axios.post(`${domain}/api/crowdfunding/login`, param)
}

// 获取待认领列表
export function getWaitingListData() {
  return axios.get(`${domain}/api/crowdfunding/item/Unclaim/list`)
}
// 获取我的认领列表
export function getMyListData(param) {
  return axios.post(`${domain}/api/crowdfunding/order/list`, param)
}
// 获取认领详情
export function getClaimDetail(id) {
  return axios.get(`${domain}/api/crowdfunding/order/detail/${id}`)
}
