/**
 * Created by Admin on 2017/9/5.
 */
import Axios from "axios"
import config from 'utils/config'
import {Toast,Modal} from 'antd-mobile';
import {AjaxUrls} from "utils/ajaxUrl";
// console.log(process.env.PUBLIC_APPID)
let wechatAppid=process.env.PUBLIC_APPID;
//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            weibo: u.indexOf('weibo') >-1,    //微博
            qq:u.match(/\sQQ/i) == " QQ", //是否QQ
            Safari: u.indexOf("Safari") > -1
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
 function getUrlParam(name){
    var reg = new RegExp("(^|&)?" + name + "=([^&]*)($|&)");
    // var strArr = window.location.hash.substr(1).match(reg);
     var strArr = window.location.href.match(reg);
    if(strArr != null) return unescape(strArr[2]);
    return "";
}
//金额
function outputmoney(number) {
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
        return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
        return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}
//格式化金额
function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (let i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}
//计算几个月后的日期
function datetime(beginDate,monthAdd){
    if (monthAdd >= 12) {
        var year = monthAdd / 12;
        var mon = monthAdd % 12;
        beginDate.setFullYear(beginDate.getFullYear() + year);
        beginDate.setMonth(parseInt(mon));
    } else {
        beginDate.setMonth(monthAdd);
    }
    if (parseInt(beginDate.getDate()) < 10) {
        var d = "0" + (beginDate.getDate());
    } else {
        d = beginDate.getDate();
    }
    if (parseInt(beginDate.getMonth() + 1) < 10) {
        var m = "0" + (beginDate.getMonth() + 1);
    } else {
        m = (beginDate.getMonth() + 1);
    }
    var datetime=beginDate.getFullYear() + "-" + m + "-" + d;
    var endTime = new Date(Date.parse(datetime) - 1000 * 60 * 60 * 24);
    return endTime;
}
//
function dateDayTime(datetime,date){
    var lw = new Date(Date.parse(datetime) + 1000 * 60 * 60 * 24 * date);
    // var startdate = lw.Format("YYYY-MM-DD");
    return lw;
}
//cookie
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
let num=60;
////获取验证码 读秒
function getVerifyCodeTime($this){
    const that=$this;
    const interval = setInterval(function() {
        that.setState({
            changeTest:num+"s",
            enable:true, //验证码按钮不可点击
        });
        num--;
        if(num == 0) {
            that.setState({
                changeTest:"重新获取",
                enable:false,//验证码按钮可点击
            });
            num=60;
            clearInterval(interval);
        }
    }, 1000);
}
//json请求
let addressUrl=encodeURIComponent(window.location.href);

function submitAjax(url,token,params,successFun,errorFunc){
    Toast.loading('加载中...',1000);
    Axios({
        method:"post",
        headers: AjaxUrls.getCooperId(token),
        url:url,
        data:params,
        config
    })
        .then(function (res) {
            Toast.hide();
            if(typeof res.data == "object"&&!res.data.success){
                if(res.data.errorCode=="NEED_LOGIN"){
                    Toast.info('登录已失效，请登录！',2,()=>{
                        localStorage.clear("accessToken");
                        localStorage.clear("wechatOpenId");
                        weChat();
                    });
                   }else{
                    if(errorFunc){
                        errorFunc(res)
                    }else{
                        Toast.info(res.data.errorMsg,2);
                    }
                }
                return false;
            }
            if(successFun){
                // console.log(res)
                successFun(res)
            }
        })
        .catch(function (err) {
			console.log(err)
            Toast.hide();
            Toast.info("请求失败！",2);
            console.log(err)
        })
}
//nojson请求
function simpleAjax(url,param,successFun,errorFunc){
    Toast.loading('加载中...',1000);
    Axios.post(url,param,config)
        .then(function (res) {
            Toast.hide();
            if(typeof res.data == "object"&&!res.data.success){
                if( res.data.errorCode=="NEED_LOGIN"){
                    Toast.info('登录已失效，请登录！',2,()=>{
                        localStorage.clear("accessToken");
                        localStorage.clear("wechatOpenId");
                        weChat();
                    });
                }else{
                    if(errorFunc){
                        errorFunc(res)
                    }else{
                        Toast.info(res.data.errorMsg,2);
                    }
                }
                return false;
            }
            if(successFun){
                successFun(res);
            }
        })
        .catch(function (err) {
            Toast.hide();
            Toast.info("请求失败！",2);
            console.log(err);

        })
}
//get请求
function  getAjax(url,token,params,successFun,errorFunc) {
    Toast.loading('加载中...', 10000);
    Axios({
        method:"get",
        headers: AjaxUrls.getCooperId(token),
        url:url,
        data:params,
    })
        .then(function (res) {
            Toast.hide();
            if(typeof res.data == "object"&&!res.data.success){
                if( res.data.errorCode=="NEED_LOGIN"){
                    Toast.info('登录已失效，请登录！',2,()=>{
                        localStorage.clear("accessToken");
                        localStorage.clear("wechatOpenId");
                        weChat();
                    });
                }else{
                    if(errorFunc){
                        errorFunc(res)
                    }else{
                        Toast.info(res.data.errorMsg,2);
                    }
                }
                return false;
            }
            if(successFun){
                successFun(res);
            }
        })
        .catch(function (err) {
            Toast.hide();
            Toast.info("请求失败！",2);
            console.log(err);
        })
}
function weChat(){
    if(browser.versions.weixin){
        const loca=window.location.href;
        if(loca.indexOf("code=")!=-1){
            const mm=loca.replace(loca.substr(loca.indexOf('?'),loca.indexOf('#')-loca.indexOf('?')),"");
            addressUrl=encodeURIComponent(mm)
        }
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize" +
            "?appid="+wechatAppid+"&redirect_uri="+addressUrl+"&response_type=code&scope=snsapi_userinfo&state=guoshu#wechat_redirect";
    }else{
       window.location.href=process.env.WINDOWURL+"/#/login"
    }
}


// export  default getUrlParam  定义单个函数
export  {browser,getUrlParam,outputmoney,dateDayTime,datetime,getCookie,getVerifyCodeTime,submitAjax,simpleAjax,getAjax,weChat}