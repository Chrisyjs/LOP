import { axios } from '../api/interceptors';
const domain = process.env.NODE_ENV === 'production' ? pageConfig['domain'] : '/api';

// st 报名提交
export function submitSignUpApi(param) {
  return axios.post(`${domain}/app/memberstnew/add`, param)
}

// st 果子统计
export function submitFruitApi(param) {
  return axios.post(`${domain}/app/memberstsheep/add`, param)
}
