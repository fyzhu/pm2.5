

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
            // console.log(pmdata);
            if ('function' == typeof (callback)) {
                pmdata = sdata.map(function (cur, index, arr) {
                    let newData = {
                        name: cur.position_name,
                        value: cur.pm2_5
                    }
                    return newData;
                })
                
                localStorage.setItem("pmdata", JSON.stringify(pmdata));
                
                callback()
            }
            // return data;
            console.log(pmdata)

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log('error:' + textStatus);
            getData2(callback2);
            function getData2(callback2) {
                $.getJSON("pmdata.json", function (data) {
                    pmdata = data;
                    console.log(data);
                    callback2()
                })
            }
            function callback2() { 
                // alert('test')               
                callback()
                console.log('pmdata',pmdata);
            }
            
        }
    });

}