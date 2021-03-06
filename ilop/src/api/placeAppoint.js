import { axios } from "@/api/interceptors";

// 获取基本信息（下拉选项等）
export function getBaseInfo() {
  return axios.get(`${domain}/function/place/apply/base/info`);
}
// 申请详情
export function getDetail(id) {
  return axios.get(`${domain}/function/place/apply/deatial/${id}`);
}
// 申请列表
export function getList() {
  return axios.get(`${domain}/function/place/apply/list`);
}
// 申请使用
export function submitForm(params) {
  return axios.post(`${domain}/function/place/apply/add`, params);
}
// 使用取消
export function useCancel(id) {
  return axios.post(`${domain}/function/place/apply/cancel/${id}`);
}
// 结束使用
export function useEnd(id) {
  return axios.post(`${domain}/function/place/apply/update/finish/${id}`);
}
