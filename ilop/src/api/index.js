import { axios } from "@/api/interceptors";
import qs from "qs";

// const domain = '';
const domain =
  process.env.NODE_ENV === "production"
    ? `http://www.landofpromise.co:8080/${appConfig.apiPrefix}/api`
    : "/api";

/* 登录 */
// 获取验证码
export function getValidCode(param) {
  return axios.post(`${domain}/crowdfunding/login/get/code`, param);
}
// 登录
export function login(param) {
  return axios.post(`${domain}/crowdfunding/login`, param);
}

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

// 获取预约信息
export function getAppointmentInfo(mobile) {
  return axios.get(`${domain}/function/party/detail/${mobile}`);
}
// 提交预约信息
export function submitAppointmentInfo(params) {
  return axios.post(`${domain}/function/party/submit`, params);
}
// 我的预约列表信息
export function getMyAppointmentList(mobile) {
  return axios.get(`${domain}/function/party/list/${mobile}`);
}
// 取消预约
export function cancelAppointment(id) {
  return axios.post(`${domain}/function/party/cancel/${id}`);
}
