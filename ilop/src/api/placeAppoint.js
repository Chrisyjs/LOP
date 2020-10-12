import { axios } from "@/api/interceptors";

// 获取基本信息（下拉选项等）
export function getBaseInfo() {
  return axios.get(`${domain}/function/place/apply/base/info`);
}
// 提交预约信息
export function submitAppointmentInfo(params) {
  return axios.post(`${domain}/function/party/submit`, params);
}
