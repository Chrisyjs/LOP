function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
window.onload = function() {
    var code = GetQueryString('code'),
        message = GetQueryString('message'),
        a = message.indexOf('update') > -1 ? '更新' : '提交';
        b = code == 0 ? '成功' : '失败',
    document.getElementsByClassName('j-title')[0].innerHTML = a + b;
}
