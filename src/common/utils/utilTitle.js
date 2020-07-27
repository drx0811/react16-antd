export const  Utilities ={
    formatDate(){//时间格式转换
        var d=new Date();
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        var date=d.getDate();
        if(month<10){

        }
        return year+"-"+(month<10?"0"+month:month)+"-"+(date<10?"0"+date:date);
    },
	formatDateTime(data){//时间格式转换
        var d=new Date(data);
        var year=d.getFullYear();
        var month=d.getMonth()+1;
        var date=d.getDate();
        if(month<10){

        }
        return year+"-"+(month<10?"0"+month:month)+"-"+(date<10?"0"+date:date);
    },
	getReportType(type){
		switch (type){
			case 1:return "贷前";
			case 2:return "贷中";
			case 3:return "贷后";
		}
	},
    changeMoney(val){
        if(val===4||val===5||val===8||val===6||val===10){
            return "元"
        }else{
            return "万元"
        }
    },
    //获取图片状态
	// getImgType(val){
		// switch (val){
		// 	case -5:return "已删除";
		// 	case -4:return "已失效";
		// 	case -3:return "待失效";
		// 	case -2:return "待驳回";
		// 	case -1:return "驳回";
		// 	case 0:return "未处理";
		// 	case 1:return "驳回重传";
		// 	case 2:return "==";
		// }
	// },
    getInvestmentType(val){
		if(val==1){
    		return "经营贷";
		}else if(val==2){
			return "电商贷";
		}else if(val==3){
			return "车抵贷";
		}else if(val==4){
			return "小额贷";
		}else if(val==5){
			return "青春贷";
		}else if(val==6){
			return "工薪贷";
		}else if(val==7){
			return "消费贷";
		}else if(val==8){
			return "分期贷";
		}else if(val==9){
			return "房抵贷";
		}else if(val==10){
			return "极速贷";
		}
	},
	getImgType(val){
		switch (val){
			case -5:return "已删除";
			case -4:return "失效";
			case -3:return "失效";
			case -2:return "驳回";
			case -1:return "驳回";
			case 0:return "新";
			case 1:return "新";
			case 2:return "通过";
		}
	},


	getApplyStatus : function(applyStatus){
		switch (applyStatus){
			case -7:return "超时关闭";
			case -6:return "复审失败";
			case -4:return "终审失败";
			case -3:return "对接失败";
			case -2:return "初审失败";
			case -1:return "已取消";
			case 0:return "受理中";
			case 1:return "已受理";
			case 2:return "对接中";
			case 3:return "待分配";
			case 4:return "已分配";
			case 5:return "审批中";
			case 6:return "终审通过";
			case 7:return "已放款";
			case 8:return "已结清";
		}
	},
	getUnit:function (units) {
		switch (units){
			case 1:return "万元";
			case 2:return "万元";
			case 3:return "万元";
			case 4:return "元";
			case 5:return "元";
			case 6:return "万元";
			case 7:return "元";
			case 8:return "元";
			case 9:return "万元";
			case 10:return "元";
		}
	},
	// getReportCat(val){
	// 	switch (val){
	// 		case 1:return "个人";
	// 		case 2:return "企业";
	// 		case 3:return "项目";
	// 		case 4:return "车况";
	// 		case 5:return "淘宝电商";
	// 	}
	// },
    // applyStatusType(val){
    //     switch (val){
    //         case -3:return "对接不成功";
    //         case -4:return "终审失败";
    //         case 4:return "已分配";
    //         case 5:return "放款机构审批中";
    //         case 6:return "终审通过";
    //         case 7:return "放款成功";
    //     }
    // },
    getReportCat(val){
        switch (val){
            case 1:return "个人";
            case 2:return "企业";
            case 3:return "项目";
            case 4:return "车况";
            case 5:return "淘宝电商";
        }
    },
    getPrepayment(val){
        if (val==1){
            return "是";
        }
        return "否";
    },
    getRelateType(relateType){
        switch (relateType){
            case 0:return "申请";
            case 1:return "借款";
            case 2:return "共借";
            case 3:return "用款";
            case 4:return "保证";
            case 5:return "抵质押";
        }
    },
    getExtendInfo(extendInfo){
        return eval('(' + extendInfo + ')');

    },
    getIdentifyDetail(identifyDetail) {
        if(identifyDetail){
            return identifyDetail
        }else{
            return "";
        }
    },
    getCheckObjectType(checkObjectType){
        switch (checkObjectType){
            case 1:return "企业";
            case 2:return "项目";
            case 3:return "人";
            case 4:return "网店";
            case 5:return "汽车";
            case 6:return "房产";
        }
    },
    getFromIdCard: function IdCard(idcard,type){
        if(type==1){
            var birth=idcard.substring(6, 10) + "-" + idcard.substring(10, 12) + "-" + idcard.substring(12, 14);
            return birth;
        }
        if(type==2){
            if (parseInt(idcard.substr(16, 1)) % 2 == 1) {
                return "男";
            } else {
                return "女";
            }
        }
        if(type==3){
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - idcard.substring(6, 10) - 1;
            if (idcard.substring(10, 12) < month || idcard.substring(10, 12) == month && idcard.substring(12, 14) <= day) {
                age++;
            }
            return age;
        }
    },
    //企业档案的数据状态
    status:function (statusValue) {
		switch (statusValue){
			case 1:return "\<i style='color:red'\>数据同步中\</i\>";
			case 2:return "同步完成";
			default:return "未知";
		}

    },
	orgUrlHead:"http://daily.api.guoshujinfu.com",
	orgUrlHeads:"https://daily.api.guoshujinfu.com",
}