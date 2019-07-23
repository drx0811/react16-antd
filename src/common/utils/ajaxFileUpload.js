function checkType(fileType,typeList){
    var success = false;
    $.each(typeList, function (index, obj) {
        if(fileType == obj){
            success = true;
            return success;
        }
    });
    return success;
}
var allTypeList = ['.JPG','.PNG','.BMP','.MP4','.JPEG','.DOCX','.DOC','.XLSX','.XLS','.PDF','.TXT','.PPT'];
var imgTypeList = ['.JPG','.PNG','.BMP','.JPEG'];
var videoTypeList = ['.MP4','.MPE','.MPEG','.MKV','.FLV','.RMVB','.WMV','.MPG','.VOB','.MPE','.ASF'];
import {Modal} from "antd"
//  上传图片
export function AjaxFileUpload(filepath,param,url,fileElementId,fileElement,funcSuccess,fileStatus,inputVal){
    var extStart=filepath.lastIndexOf(".");
    var ext=filepath.substring(extStart,filepath.length).toUpperCase();
    if(fileStatus==true){
        if(!checkType(ext,allTypeList)){
			Modal.info({
                title:"信息",
                content:"请上传符合条件的文件格式！"
            })
            return;
        }
        if(fileElement[0].files[0].size > 1024 * 1024 * 10){
			Modal.info({
				title:"信息",
				content:"上传的文件不能大于10M！！"
			})
            return;
        }
    }else if(fileStatus==2){
        if(!checkType(ext,videoTypeList)){
			Modal.info({
				title:"信息",
				content:"请上传视频文件！"
			})
            return;
        }
        if(fileElement[0].files[0].size > 1024 * 1024 * 10){
			Modal.info({
				title:"信息",
				content:"上传的文件不能大于10M！"
			})
            return;
        }
    }else{
        if(ext!=".BMP"&&ext!=".PNG"&&ext!=".JPG"&&ext!=".JPEG"){
			Modal.info({
				title:"信息",
				content:"请上传bmp,png,jpg,jpeg文件！"
			})
            // $(this).val("");
            // inputVal="";
            return false;
        }
        // if(fileElement[0].files[0].size  > 1024 * 1024 * 2){
			// Modal.info({
			// 	title:"信息",
			// 	content:"上传的图片不能大于2M！"
			// })
        //     return false;
        // }
    }
    $.ajaxFileUpload({
        url : process.env.PUBLIC_URL+"/api" + url,
        secureuri : false,
        data: param,
        fileElementId : fileElementId,
        fileElement:fileElement,
        dataType : 'json',
        success : function(data) {
        	console.log(data)
            if(data.success){
                funcSuccess(data)
            } else {
				Modal.info({
					title:"信息",
					content:"需要刷新页面,重新添加!"
				},function () {
					window.location.reload()
				})
            }
        },
        error : function(data, status, e) {
			console.log(data)
			// console.log(status)
			// console.log(e)
			Modal.info({
				title:"信息",
				content:"需要刷新页面,重新添加!"
			},function () {
				window.location.reload()
			})
            // inputVal="";
            // $(this).val("");
        }
    });
}