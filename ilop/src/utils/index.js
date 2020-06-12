import Vue from "vue";
const utils = {
  setCookie(cname, cvalue, time) {
    var d = new Date();
    d.setTime(d.getTime() + time);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  },
  toast(config) {
    Vue.prototype.$toast(
      Object.assign({
        message: "加载中...",
        mask: true,
        loadingType: "spinner",
        duration: 0,
        forbidClick: true,
      }, config)
    );
  },
  delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  /**
   * 验证手机号
   */
  checkPhone(phone) {
    return /^1[3456789]\d{9}$/.test(phone);
  },
  /**
   * 判断数字数组是否连续
   * @param {*} numberArr
   */
  checkNumberIsSerial: function(numberArr) {
    if (numberArr instanceof Array === false) throw "参数必须是数组";
    let arr = [...numberArr];
    if (arr.length === 1) return true;
    arr = arr.sort();
    let n1 = arr[0];
    let isSerial = true;
    n1 += 1;
    for (let i = 1; i < arr.length; i++) {
      n1 != arr[i] && (isSerial = false);
      n1 += 1;
    }
    return isSerial;
  },
};

Vue.prototype.$utils = utils;
