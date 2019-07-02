getAllPray = function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.response)
                data = result.data,
                code = result.code;
            data = formatData(data);
            console.log();
            document.getElementsByClassName('j-info')[0].innerHTML = data;
        }
    }
    // xhr.open('GET', `${api_prefix}:19090/api/v1/todayPrayer`);
    xhr.open('GET', `http://ajuntechhome.cn:19090/api/v1/todayPrayer`);
    xhr.send();
}
formatData = function(data) {
    var line = '----------';
    data = data.split(line);
    data.map(function(item, idx) {
        data[idx] = item.replace(/[\r\n]+$/g, "");
    })
    data = data.join('\r\n' + line);
    return data;
}
window.onload = function() {
    getAllPray();
}
