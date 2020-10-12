import { axios } from "@/api/interceptors";

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
