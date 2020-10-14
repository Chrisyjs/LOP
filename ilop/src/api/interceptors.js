import axios from 'axios';
import Vue from 'vue';
import store from '@/vuex';

const http = axios.create();

http.interceptors.request.use(
  config => {
    const { headers } = config;
    headers.token = store.state.token || Vue.prototype.$utils.getCookie('token');
    return config;
  }
)

http.interceptors.response.use(
  response => {
    let { data } = response;
    // if (!Vue.prototype.$utils.getCookie('mobile')) {
    //   window.location.href = '';
    // }
    if (data.code === 200) {
      Vue.prototype.$toast.clear();
      return data;
    }
    else {
      Vue.prototype.$toast.clear();
      Vue.prototype.$notify({
        message: `${data.msg}`,
        type: 'warning'
      })
      return data;
    }
  },
  error => {
    Vue.prototype.$toast.clear();
    return Promise.reject(error);
  }
)

export { http as axios }
