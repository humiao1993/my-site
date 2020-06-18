import Vue from 'vue'

Vue.filter('unixTimeFormat', function (value, fmt) {
    if (!value) {
        return '';
    }
    if (!fmt) {
        fmt = 'yyyy-MM-dd';
    }
    let _date = new Date(value);
    var o = {
        "M+": _date.getMonth() + 1,                 //月份
        "d+": _date.getDate(),                    //日
        "h+": _date.getHours(),                   //小时
        "m+": _date.getMinutes(),                 //分
        "s+": _date.getSeconds(),                 //秒
        "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
        "S": _date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
});
Vue.filter('numberFormat', function (number, decimals = 2) {
    return (number / 1).toFixed(decimals)
});
Vue.filter('textCut', function (text, len = 100, endfix = '......') {
    return text.length > len ? text.substr(0, len) + endfix : text;
});
Vue.filter('videoTime', function (time) {
    let seconds = (time % 60) + '';
    if (seconds.length == 1) seconds = '0' + seconds;
    let minutes = (parseInt(time / 60) % 60) + '';
    if (minutes.length == 1) minutes = '0' + minutes;
    let hours = (parseInt(time / 3600)) + '';
    if (hours.length == 1) hours = '0' + hours;
    if (hours > 0) {
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
});