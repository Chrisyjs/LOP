import axios from 'axios';
import Vue from 'vue';

const http = axios.create();

http.interceptors.request.use(
  
)

http.interceptors.response.use(
  response => {
    let { data } = response;
    if (data.code === 0) {
      window.location.href = '/login'
    }
    else if (data.code === 200) {
      return data;
    } 
    else {
      Vue.prototype.$notify({
        message: `${data.msg}`,
        type: 'warning'
      })
    }
  },
  error => {
    return Promise.reject(error);
  }
)

export { http as axios }
