(window.webpackJsonp=window.webpackJsonp||[]).push([["Login"],{"32cc":function(t,n,e){},"365c":function(t,n,e){"use strict";e.d(n,"e",function(){return o}),e.d(n,"g",function(){return a}),e.d(n,"f",function(){return s}),e.d(n,"b",function(){return c}),e.d(n,"d",function(){return d}),e.d(n,"c",function(){return u}),e.d(n,"i",function(){return l}),e.d(n,"h",function(){return p}),e.d(n,"a",function(){return h});var i=e("0244"),r=(e("4328"),"http://www.landofpromise.co:8080/".concat("lop_project_house"));function o(t){return i.a.post("".concat(r,"/api/crowdfunding/login/get/code"),t)}function a(t){return i.a.post("".concat(r,"/api/crowdfunding/login"),t)}function s(){return i.a.get("".concat(r,"/api/crowdfunding/item/Unclaim/list"))}function c(t){return i.a.post("".concat(r,"/api/crowdfunding/order/submit"),t)}function d(t){return i.a.post("".concat(r,"/api/crowdfunding/order/list"),t)}function u(t){return i.a.get("".concat(r,"/api/crowdfunding/order/detail/").concat(t))}function l(t){return i.a.post("".concat(r,"/api/crowdfunding/upload/single/file"),t)}function p(t){return i.a.post("".concat(r,"/api/crowdfunding/order/pay"),t)}function h(t){return i.a.post("".concat(r,"/api/crowdfunding/order/cancel/").concat(t))}},a452:function(t,n,e){"use strict";var i=e("32cc");e.n(i).a},dd7b:function(t,n,e){"use strict";e.r(n);e("96cf");var i,r=e("3b8d"),o=e("365c"),a={data:function(){return{phone:"",phoneErrMsg:"",validCode:"",validCodeErrMsg:"",validText:"发送验证码",isSending:!1,appName:"iLop"}},created:function(){this.isWeiXinEnv&&this.$notify({message:"如遇问题，可尝试用浏览器打开",type:"primary"})},methods:{sendValidCode:function(){var t=this;if(!this.isSending&&(this.checkPhone(),!this.phoneErrMsg)){this.$toast({message:"验证码已发送",duration:800}),this.isSending=!0,this.validText=60,Object(o.e)({mobile:this.phone});var n=window.setInterval(function(){t.validText=t.validText-1,t.validText<=0&&(window.clearInterval(n),t.isSending=!1,t.validText="发送验证码")},1e3)}},resetErrMsg:function(t){this[t]=""},checkPhone:function(){this.phone||(this.phoneErrMsg="手机号必填"),this.phone&&!/^1[3456789]\d{9}$/.test(this.phone)&&(this.phoneErrMsg="手机号错误")},checkValidCode:function(){this.validCodeErrMsg=this.validCode?"":"验证码错误"},submit:(i=Object(r.a)(regeneratorRuntime.mark(function t(){var n,e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.checkPhone(),this.checkValidCode(),this.phoneErrMsg||this.validCodeErrMsg){t.next=9;break}return t.next=5,Object(o.g)({mobile:this.phone,code:this.validCode});case 5:n=t.sent,e=n.data,200===n.code&&(this.$utils.setCookie("mobile",e.mobile,36e5),this.$router.push({path:"/home/waitingList"}));case 9:case"end":return t.stop()}},t,this)})),function(){return i.apply(this,arguments)})}},s=(e("a452"),e("2877")),c=Object(s.a)(a,function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"login"},[e("div",{staticClass:"title text-center"},[e("div",{staticClass:"small"},[n._v("感谢您加入【全员联名 为i认领】")]),e("div",{staticClass:"big"},[n._v(n._s(n.appName))])]),e("div",{staticClass:"form"},[e("van-cell-group",[e("van-field",{attrs:{label:"手机号",border:!0,"error-message":n.phoneErrMsg,clearable:"",maxlength:"11",type:"number",placeholder:"请输入手机号"},on:{focus:function(){return n.resetErrMsg("phoneErrMsg")}},model:{value:n.phone,callback:function(t){n.phone=t},expression:"phone"}})],1),e("van-cell-group",[e("van-field",{attrs:{"error-message":n.validCodeErrMsg,center:"",clearable:"",label:"短信验证码",placeholder:"请输入短信验证码"},on:{focus:function(){return n.resetErrMsg("validCodeErrMsg")}},model:{value:n.validCode,callback:function(t){n.validCode=t},expression:"validCode"}},[e("van-button",{attrs:{slot:"button",size:"small",type:"primary",disabled:n.isSending},nativeOn:{click:function(t){return n.sendValidCode(t)}},slot:"button"},[n._v(n._s(n.isSending?n.validText+"S":n.validText))])],1)],1),e("div",{staticClass:"submitBtn"},[e("van-button",{attrs:{size:"large",type:"primary"},nativeOn:{click:function(t){return n.submit(t)}}},[n._v("登录")])],1)],1)])},[],!1,null,"516bae1a",null);n.default=c.exports}}]);