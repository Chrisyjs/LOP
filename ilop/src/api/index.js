import { axios } from "@/api/interceptors";

// 获取验证码
export function getValidCode(param) {
  return axios.post(`${domain}/login/login/get/code`, param);
}
// 登录
export function login(param) {
  return axios.post(`${domain}/login/login`, param);
}
