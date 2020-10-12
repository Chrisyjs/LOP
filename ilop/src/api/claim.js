import { axios } from "@/api/interceptors";

// 获取待认领列表
export function getWaitingListData() {
  return axios.get(`${domain}/crowdfunding/item/Unclaim/list`);
}
// 确认认领
export function confirmClaim(param) {
  return axios.post(`${domain}/crowdfunding/order/submit`, param);
}
// 获取我的认领列表
export function getMyListData(param) {
  return axios.post(`${domain}/crowdfunding/order/list`, param);
}
// 获取认领详情
export function getClaimDetail(id) {
  return axios.get(`${domain}/crowdfunding/order/detail/${id}`);
}
// 上传图片
export function uploadImage(param) {
  return axios.post(`${domain}/crowdfunding/upload/single/file`, param);
}
// 提交订单
export function submitOrder(param) {
  return axios.post(`${domain}/crowdfunding/order/pay`, param);
}
// 取消订单
export function cancelOrder(id) {
  return axios.post(`${domain}/crowdfunding/order/cancel/${id}`);
}

// 提交表单
export function submitFormApi(param) {
  return axios.post(`${domain}/app/memberstnew/add`, param);
}