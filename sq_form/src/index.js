function changeDefaultWeekDay() {
    var text = "";
    var i;
    var id_prefix = "day"
    for (i = 0; i < 7; i++) {
        concat_id = id_prefix.concat(i)
        var dat = new Date;
        var newDat = new Date(dat.setDate(dat.getDate() - (6 - i) ))
        var month = newDat.getMonth() + 1
        var text = newDat.getFullYear() + "-" + month + "-" + newDat.getDate()
        document.getElementById(concat_id).text = text;
    }
    var mySelect = document.getElementById('mTime');
    mySelect.selectedIndex = 6;
}

function resetSubForm() {
    var dom = document.getElementById('subForm').getElementsByClassName('form-control');
    for (var i = 0; i < dom.length; i++) {
        dom[i].value = '';
    }
}

function getFormData() {
    resetSubForm();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.response),
                data = result.data,
                code = result.code;
            for (var k in data) {
                k !== 'mTime' && (document.getElementById(k).value = data[k]);
            }
        }
    }
    var data = { name: document.getElementById('name').value, mTime: document.getElementById('mTime').value };
    xhr.open('GET', `${api_prefix}/devotion?name=${data.name}&mTime=${data.mTime}`);
    xhr.send();
}

submitForm = function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.response);
            window.location.href = `/success.html?code=${result.code}&message=${result.msg}`;
        }
    }
    var fd = new FormData(document.getElementById('myForm'));
    // xhr.open('POST', `${api_prefix}:19090/api/v1/devotion`);
    xhr.open('POST', `http://ajuntechhome.cn:19090/api/v1/devotion`);
    xhr.send(fd);
    return false;
}



window.onload = function() {
    changeDefaultWeekDay();
    getFormData();
    document.getElementById('name').addEventListener('change', getFormData);
    document.getElementById('mTime').addEventListener('change', getFormData);
}
