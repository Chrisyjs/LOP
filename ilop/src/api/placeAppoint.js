import { axios } from "@/api/interceptors";

// 获取基本信息（下拉选项等）
export function getBaseInfo() {
  return axios.get(`${domain}/function/place/apply/base/info`);
}
// 申请详情
export function getDetail(id) {
  return axios.get(`${domain}/function/place/apply/deatial/${id}`);
}
// 提交预约信息
export function submitForm(params) {
  return axios.post(`${domain}/function/place/apply/add`, params);
}
