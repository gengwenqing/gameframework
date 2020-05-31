/**
 * 日志控制类 @JiatTao 2020/01/20
 */
let log = {

    debug(str) {

        // if (arguments.length > 0) {
        //     // var args = Array.prototype.slice.call(arguments);
        //     cc.log.apply(this, arguments);
        // } 
        
        var n = 255;
        for (var i = 0, l = str.length; i < l/n; i++) {
            var piece = str.slice(n*i, n*(i+1));
            cc.log(piece);
        }
    },
}