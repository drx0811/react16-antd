import {browser} from "utils/common";
let cooperId=process.env.COOPERID;
export const  AjaxUrls ={
    getCooperId(token){
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type':'application/json',
            'channelId':5,  //betago使用渠道id=5，果树云使用渠道id=2,
            "deviceType":3,//1为ios,2为安卓,公众号为3
            'deviceName':'H5',//设备名称
            'cooperId':cooperId,//当前客户端所属机构  测试环境位27
            'accessToken':token?token:"",
        }
    },
    getLoginUrl(type){
        switch (type){
            case "登录":
                return "/api/v1/user/login";
            case "注册":
                return "/api/v1/user/register";
            case "重置密码":
                return "/api/v1/user/forget";
            case "获取验证码":
                return "/api/common/v1/base/verify/code";
            case "图片验证码":
                return "/api/v1/user/verify/code";
            case "个人信息":
                return '/api/v1/relate/current';
            case '简单用户信息获取':
                return '/api/v1/user/detail/simple';
            case '微信登录':
                return '/api/v1/user/wechat/login'
        }
    },
    getBankCardUrl(type){
        switch (type){
            case "银行卡列表":
                return "/api/v1/bank/card/list";
            case "判断银行卡绑卡流程":
                return "/api/v1/bank/card/register/channel";
            case "绑定银行卡":
                return "/api/v1/bank/card/bind";
            case "解绑银行卡":
                return "/api/v1/bank/card/unbind";
            case "设置默认卡":
                return "/api/v1/bank/card/default/submit";
            case "默认用户银行卡":
                return "/api/v1/bank/card/default";
            case "支持银行卡列表":
                return "/api/v1/bank/card/support/list";
            case "订单绑定银行卡":

                return "/api/v1/order/choose/submit";

        }
    },
    getRepaymentUrl(type){
        switch (type){
            case "当前应还列表":
                return "/api/v1/repayment/current/repay/list";
            case "还款计划列表":
                return "/api/v1/repayment/plan/list";
            case "还款记录":
                return "/api/v1/repayment/records";
            case "还款计划详情":
                return "/api/v1/repayment/plan/detail";
            case "校验是否可以还款":
                return "/api/v1/repayment/enable/verify";
            case "合作银行还款":
                return "/api/v1/repayment/cooper/bank/debit";
        }
    },
	getSignContractUrl(type){
		switch (type){
			case "用款签约列表":
				// return "/api/v1/investment/contract/list";
				return "/api/v1/order/contract/list";
			case "协议列表":
				// return "/api/v1/investment/agreement/list";
				return "/api/v1/order/contract/agreement/list";
			case "协议列表确认":
				// return "/api/v1/investment/agreement/confirm";
				return "/api/v1/order/contract/agreement/confirm";

		}
	},
	getWithDrawalsList(type){
		switch (type){
			case "提现订单列表":
				// return "/api/v1/order/list";
				return "/api/v2/order/list";
			case "授信订单列表":
				return "/api/v2/order/credit/list";

		}
	},
    //获取首页数据
    getHomeRequst(type){
        switch (type){
            //TODO
            case "个人中心头像":
                return "/api/v1/user/detail";
            case "退出登录":
                return "/api/v1/user/logout";
            case "客户端授信卡列表接口":
                return "/api/v2/credit/card/list"
            case "授信页G2概要":
                return "/api/v2/credit/overview"
            case "授信记录列表":
                return "/api/v1/order/credit/list";
            case "客户端授信卡详情接口":
                return "/api/v2/credit/card/detail"
            case "授信卡提现费用计算":
                return "/api/v1/order/credit/withdraw/fee/calculate"
            case "用户银行卡列表":
                return "/api/v1/bank/card/list";
            case "用户默认银行卡":
                return "/api/v1/bank/card/default";
            case "提现校验":
                return "/api/v1/order/credit/withdraw/validate"
            case "提现订单提交":
                return "/api/v1/order/use/credit/apply"
            case "提现订单详情":
                return "/api/v1/order/detail"
            case "授信订单详情":
                return "/api/v1/order/credit/detail"
            case "授信卡介绍":
                return "/api/v2/investment/credit/profile";
        }
    },
//    意向申请
    getIntentApply(type){
        switch (type){
            case "地址转换":
                return "/api/apply/intention/city/code";
            case "金融产品选择":
                return "/api/apply/intention/product/list";
            case "意向申请提交":
                return "/api/apply/intention/add";
            case "二维码":
                return "/api/apply/intention/qrcode";
        }
    },
    //    表单提交
    getFormSubmit(type){
        switch (type){
            case "名称获取":
                return "/api/v1/order/subform/name/list";
            case "字段列表获取":
                return "/api/v1/order/subform/field/list";
            case "数据保存":
                return "/api/v1/order/subform/save";
        }
    }
};