/**
 * http封装
 */

/**
* Http 请求封装
*/
export default class MyHttpServer {
    /**
     * get请求
     * @param {string} url 
     * @param {function} callback 
     */
    public static httpGet(url, callback) {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log("Get: readyState:" + xhr.readyState + " status:" + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                callback(rsp);
            } else if (xhr.readyState === 4 && xhr.status == 401) {
                callback({ status: 401 });
            } else {
                //callback(-1);
            }


        };
        xhr.withCredentials = true;
        xhr.open('GET', url, true);

        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
        // xhr.setRequestHeader('Authorization', 'Bearer ' + "");
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000;// 8 seconds for timeout

        xhr.send();
    };

    /**
     * post请求
     * @param {string} url 
     * @param {object} params 
     * @param {function} callback 
     */
    public static httpPost(url, params, callback) {
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            // cc.log('xhr.readyState=' + xhr.readyState + '  xhr.status=' + xhr.status);
            if (xhr.readyState === 4 && xhr.status == 200) {
                let respone = xhr.responseText;
                let rsp = JSON.parse(respone);
                callback(rsp);
            } else {
                callback(-1);
            }
        };
        xhr.open('POST', url, true);
        // if (cc.sys.isNative) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
        xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.setRequestHeader('Authorization', 'Bearer ' + cc.myGame.gameManager.getToken());
        // }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 8000;// 8 seconds for timeout

        xhr.send(JSON.stringify(params));
    };


    public static request(url, dataJson, cb, timeOut) {
        var dataStr = "";
        var firstEnter = true;
        for (var key in dataJson) {
            if (!firstEnter) dataStr += "&";
            firstEnter = false;
            var value = dataJson[key];
            dataStr += key;
            dataStr += "=";
            dataStr += value;
        }

        try {
            var response = false;
            setTimeout(function () {
                if (response == false) {
                    cb(new Error("超时了"), null);
                }
            }, timeOut);
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    response = true;
                    cb(null, xhr.responseText);
                }
            };
            var finalUrl = dataStr == "" ? url : url + "?" + dataStr;
            finalUrl = encodeURI(finalUrl);
            xhr.open("GET", finalUrl, true);
            xhr.send();
        } catch (e) {
            cb(e, null);
        }
    }
}
