$(function() {
  var calendar = new datePicker();
  calendar.init({
    trigger: "#birthday" /*按钮选择器，用于触发弹出插件*/,
    type: "date" /*模式：date日期；datetime日期时间；time时间；ym年月；*/,
    minDate: "1900-1-1" /*最小日期*/,
    maxDate: "2100-12-31" /*最大日期*/,
    onSubmit: function() {
      /*确认时触发事件*/
      var theSelectData = calendar.value;
    },
    onClose: function() {
      /*取消时触发事件*/
    }
  });
  $('#J_rookieCard').scroll(function() {
      console.log($(this).scrollTop())
  })

  
});


function validateNumber(data) {
    var telRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
    return telRegex.test(data);
  }

  function getPlace($obj) {
    var str = "";
    $obj.children("select").map(function(item, idx) {
      var text = $(item)
        .find("option:selected")
        .text();
      str += text;
    });
    return str;
  }

$.fn.serializeJson = function () {
    var serializeObj = {};
    $(this.serializeArray()).each(function () {
        serializeObj[this.name] = this.value;
    });
    return serializeObj;
};

function submitTo() {
    var $toolTip = $('#J_toolTip');
    var $schoolOrCompany = $('.j-schoolOrCompany');
    var $address = $('.j-address');
    var $rookieCard = $('#J_rookieCard');
    var formData = $('#uploadInfo').serializeJson();
    formData['sex'] = $('input[name="sex"]:checked').val();
    formData['beliefState'] = $('input[name="beliefState"]:checked').val();
    var name = formData['name'];
    var sex = formData['sex'];
    var number = formData['number'];
    var addressPart = formData['addressPart'];
    var beliefState = formData['beliefState'];
    var birthday = formData['birthday'];
    var schoolOrCompanyPart = formData['schoolOrCompany'];
    var leaderName = formData['leaderName'];
    var leaderNumber = formData['leaderNumber'];
    var saySomething = formData['saySomething'];
    var time = 2000;
    
    if (!name) {
        $toolTip.html('对不起，请填写您的姓名').show().fadeOut(time);
        $('#name').focus();
        $rookieCard.scrollTop(0);
        return;
    }
    if (!sex) {
        $toolTip.html('对不起，请选择您的性别').show().fadeOut(time);
        $('#sex').focus();
        $rookieCard.scrollTop(0);
        return;
    }
    if (!number) {
        $toolTip.html('对不起，请填写您的手机号').show().fadeOut(time);
        $('#number').focus();
        $rookieCard.scrollTop(0);
        return;
    }
    if (!addressPart) {
        $toolTip.html('对不起，请填写您的个人住址').show().fadeOut(time);
        $('#addressPart').focus();
        $rookieCard.scrollTop(320);
        return;
    }
    if (!beliefState) {
        $toolTip.html('对不起，请选择您的信仰状况').show().fadeOut(time);
        $('#beliefState').focus();
        $rookieCard.scrollTop(460);
        return;
    }
    if (!leaderName) {
        $toolTip.html('对不起，请填写此项').show().fadeOut(time);
        $('#leaderName').focus();
        $rookieCard.scrollTop(524);
        return;
    }
    if (!validateNumber(number)) {
        $toolTip.html('对不起，请填写正确的手机号').show().fadeOut(time);
        $('#number').focus();
        $rookieCard.scrollTop(0);
        return;
    }
    if (leaderNumber && !validateNumber(leaderNumber)) {
        $toolTip.html('对不起，请填写正确的手机号').show().fadeOut(time);
        $('#leaderNumber').focus();
        $rookieCard.scrollTop(524);
        return;
    }
    var address = getPlace($address) + addressPart;
    var schoolOrCompany = getPlace($schoolOrCompany) + schoolOrCompanyPart;
    var data = {
        name: name,
        gender: sex == 'male' ? 1 : 0,
        birthday: birthday,
        mobile: number,
        schoolOrCompany: schoolOrCompany,
        address: address,
        religionSituation: beliefState,
        referrerName: leaderName,
        referrerMobile: leaderNumber,
        leaveMsg: saySomething,
    }
    $.ajax({
        url: 'http://www.landofpromise.co:8080/lop_project/api/freshman/add',
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify(data),
        success: function () {
            var alreadyBelieve = (data.religionSituation && data.religionSituation.indexOf('已经信主') > -1) ? true : false
            var dxORzm = data.gender == 1 ? 'dx' : 'zm';
            window.location.href = './success.html?alreadyBelieve=' + alreadyBelieve + '&dxORzm=' + dxORzm;
        },
        error: function () {
            alert('提交失败');
        }
    })
  }
