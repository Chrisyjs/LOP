import axios from 'axios';
import Vue from 'vue';

const http = axios.create();

http.interceptors.request.use(
  
)

http.interceptors.response.use(
  response => {
    let { data } = response;
    // if (!Vue.prototype.$utils.getCookie('mobile')) {
    //   window.location.href = '';
    // }
    if (data.code === 200) {
      return data;
    } 
    else {
      Vue.prototype.$notify({
        message: `${data.msg}`,
        type: 'warning'
      })
      return data;
    }
  },
  error => {
    return Promise.reject(error);
  }
)

export { http as axios }
