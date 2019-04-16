

function getData(callback) {
    $.ajax({
        type: 'get',
        async: false,
        url: 'http://www.pm25.in/api/querys/pm2_5.json?city=beijing&token=5j1znBVAsnSf5xQyNQyq',
        dataType: 'jsonp',
        // data:'{}',
        jsonp: 'callback',
        jsonpCallback: 'jsonhandle',
        success: function (sdata) {
            console.log(sdata);
            if ('function' == typeof (callback)) {
                pmdata = sdata.map(function (cur, index, arr) {
                    let newData = {
                        name: cur.position_name,
                        value: cur.pm2_5
                    }
                    return newData;
                })
                updateTime = new Date().getTime()
                localStorage.setItem("pmdata", JSON.stringify(pmdata));
                localStorage.setItem('time', new Date().getTime());
                callback()
            }
            // return data;
            console.log('网站数据更新于:' + new Date());
            console.log(pmdata)

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log('error:' + textStatus);
            //获取网络数据异常，有本地缓存使用缓存，没有缓存使用测试数据
            if (localStorage.getItem("pmdata") && localStorage.getItem("time") ) {
                pmdata = localStorage.getItem("pmdata")
                pmdata = JSON.parse(pmdata)
                updateTime = localStorage.getItem('time')               
                                
                console.log('网站获取数据异常，缓存数据更新于:' + new Date(parseInt(updateTime)));
                console.log('从localStorage读取数据', pmdata);
                callback()
            } else {            
                getData2(callback2);
                function getData2(callback2) {
                    $.getJSON("pmdata.json", function (data) {
                        pmdata = data;
                        // console.log(data);
                        callback2()
                    })
                }
                function callback2() { 
                    // alert('test')               
                    callback()
                    console.log('获取数据异常，现在显示的为测试数据：',pmdata);
                }
            }
            
        }
    });

}