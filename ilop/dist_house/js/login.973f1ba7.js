(window.webpackJsonp=window.webpackJsonp||[]).push([["login"],{"365c":function(t,e,n){"use strict";n.d(e,"d",function(){return a}),n.d(e,"b",function(){return o}),n.d(e,"e",function(){return s}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return l});var i=n("0244"),r=(n("4328"),"http://www.landofpromise.co:8080/".concat("lop_project","/api"));function a(t){return i.a.post("".concat(r,"/crowdfunding/login/get/code"),t)}function o(t){return i.a.get("".concat(r,"/function/party/detail/").concat(t))}function s(t){return i.a.post("".concat(r,"/function/party/submit"),t)}function c(t){return i.a.get("".concat(r,"/function/party/list/").concat(t))}function l(t){return i.a.post("".concat(r,"/function/party/cancel/").concat(t))}},"4e4e":function(t,e,n){"use strict";var i=n("bca3");n.n(i).a},bca3:function(t,e,n){},dd7b:function(t,e,n){"use strict";n.r(e);n("96cf");var i,r=n("3b8d"),a=n("365c"),o={data:function(){return{phone:"",phoneErrMsg:"",validCode:"",validCodeErrMsg:"",validText:"发送验证码",isSending:!1,appName:"iLop"}},created:function(){this.isWeiXinEnv&&this.$notify({message:"如遇问题，可尝试用浏览器打开",type:"primary"})},methods:{sendValidCode:function(){var t=this;if(!this.isSending&&(this.checkPhone(),!this.phoneErrMsg)){this.$toast({message:"验证码已发送",duration:800}),this.isSending=!0,this.validText=60,Object(a.d)({mobile:this.phone});var e=window.setInterval(function(){t.validText=t.validText-1,t.validText<=0&&(window.clearInterval(e),t.isSending=!1,t.validText="发送验证码")},1e3)}},resetErrMsg:function(t){this[t]=""},checkPhone:function(){this.phone||(this.phoneErrMsg="手机号必填"),this.phone&&!/^1[3456789]\d{9}$/.test(this.phone)&&(this.phoneErrMsg="手机号错误")},checkValidCode:function(){this.validCodeErrMsg=this.validCode?"":"验证码错误"},submit:(i=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.$utils.setCookie("mobile","15700084697",18e5),this.$router.push({path:"/claim/waitingList"}),t.abrupt("return");case 6:e=t.sent,n=e.data,200===e.code&&(this.$utils.setCookie("mobile",n.mobile,36e5),this.$router.push({path:"/claim/waitingList"}));case 10:case"end":return t.stop()}},t,this)})),function(){return i.apply(this,arguments)})}},s=(n("4e4e"),n("2877")),c=Object(s.a)(o,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("div",{staticClass:"title text-center"},[n("div",{staticClass:"small"},[e._v("感谢您加入【全员联名 为i认领】")]),n("div",{staticClass:"big"},[e._v(e._s(e.appName))])]),n("div",{staticClass:"form"},[n("van-cell-group",[n("van-field",{attrs:{label:"手机号",border:!0,"error-message":e.phoneErrMsg,clearable:"",maxlength:"11",type:"number",placeholder:"请输入手机号"},on:{focus:function(){return e.resetErrMsg("phoneErrMsg")}},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),n("van-cell-group",[n("van-field",{attrs:{"error-message":e.validCodeErrMsg,center:"",clearable:"",label:"短信验证码",placeholder:"请输入短信验证码"},on:{focus:function(){return e.resetErrMsg("validCodeErrMsg")}},model:{value:e.validCode,callback:function(t){e.validCode=t},expression:"validCode"}},[n("van-button",{attrs:{slot:"button",size:"small",type:"primary",disabled:e.isSending},nativeOn:{click:function(t){return e.sendValidCode(t)}},slot:"button"},[e._v(e._s(e.isSending?e.validText+"S":e.validText))])],1)],1),n("div",{staticClass:"submitBtn"},[n("van-button",{attrs:{size:"large",type:"primary"},nativeOn:{click:function(t){return e.submit(t)}}},[e._v("登录")])],1)],1)])},[],!1,null,"6918c3b4",null);e.default=c.exports}}]);