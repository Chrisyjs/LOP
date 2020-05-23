import { axios } from '../api/interceptors';
const domain = process.env.NODE_ENV === 'production' ? `http://www.landofpromise.co:8080/lop` : '/api';

// 提交表单
export function submitFormApi(param) {
  return axios.post(`${domain}/app/memberstnew/add`, param)
}
