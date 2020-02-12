import { axios } from '../api/interceptors';
import qs from 'qs';

// const domain = '';
const domain = process.env.NODE_ENV === 'production' ? `http://www.landofpromise.co:8080/${appConfig.apiPrefix}` : '';

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
// 确认认领
export function confirmClaim(param) {
  return axios.post(`${domain}/api/crowdfunding/order/submit`, param)
}
// 获取我的认领列表
export function getMyListData(param) {
  return axios.post(`${domain}/api/crowdfunding/order/list`, param)
}
// 获取认领详情
export function getClaimDetail(id) {
  return axios.get(`${domain}/api/crowdfunding/order/detail/${id}`)
}
// 上传图片
export function uploadImage(param) {
  return axios.post(`${domain}/api/crowdfunding/upload/single/file`, param)
}
// 提交订单
export function submitOrder(param) {
  return axios.post(`${domain}/api/crowdfunding/order/pay`, param);
}
// 取消订单
export function cancelOrder(id) {
  return axios.post(`${domain}/api/crowdfunding/order/cancel/${id}`, );
}