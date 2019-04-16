
function getData(callback) {
    $.getJSON("../pmdata.json", function (data) {
        pmdata = data;
        console.log('获取本地test数据',data);
        callback()
    })
}
