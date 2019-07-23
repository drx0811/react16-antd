function previewCatalog(){
    var lineList = getControlList();
    var width = ($(window).width()-200)<800?800:($(window).width()-200);
    var height = ($(window).height()-200)<600?600:($(window).height()-200);
    layer.open({
        type: 1,
        title: '预览',
        skin: 'layui-layer-rim', //加上边框
        area: [width+'px',height+'px'], //宽高
        content: getPreviewHtml(lineList)
    });
}

function previewTemplate(title){
    var width = ($(window).width()-200)<800?800:($(window).width()-200);
    var height = ($(window).height()-200)<600?600:($(window).height()-200);

    var dom= $("<div ></div>");
    dom.append("<h2 style='text-align: center;width:100%;margin-left: 10px;'>"+title+"</h2>")
    if (!tree || !catalogList){
        layer.alert("获取目录结构失败,请尝试刷新页面后重试");
        return;
    }

    $.each(catalogList,function(index,catalog){
        if (catalog.id==-1){
            return;
        }

        var level = parseInt(catalog.indexLevel)+1;
        if (level>5){
            level=5;
        }
        dom.append("<h"+level+" style='width:100%;'>"+catalog.indexName+"</h"+level+">")
        if (catalog.indexContent && catalog.indexContent!=null){
            dom.append(getPreviewHtml(JSON.parse(catalog.indexContent)));
        }
    });
    layer.open({
        type: 1,
        title: '预览',
        skin: 'layui-layer-rim', //加上边框
        area: [width+'px',height+'px'], //宽高
        content: dom.html()
    });
}

function getPreviewHtml(lineList){
    var dom= $("<div ></div>");
    if (!lineList || !$.isArray(lineList)){
        return dom.html();
    }
    var container= $("<form class='form-horizontal' style='margin-top: 10px;'></form>");
    $.each(lineList,function(index,object){
        var row = $("<div class='row' style='width: 100%;'></div>");
        var colsLength = object.length;
        for(var i=0;i<colsLength;i++){
            var control = $("<div class='col-md-"+12/colsLength+" col-xs-"+12/colsLength+"'></div>");
            var group = $("<div class='form-group'></div>");
            group.append($("<label class='col-md-"+(colsLength==1?2:4)+" col-xs-"+(colsLength==1?2:4)+" control-label'>"+object[i].title+"</label>"));
            switch (parseInt(object[i].type)){
                case 1: // 单行输入文本
                case 3: // 数字输入框
                case 4: // 金额输入框
                    group.append($("<div class='col-md-"+(colsLength==1?10:8)+" col-xs-"+(colsLength==1?10:8)+"'><input class='form-control' placeholder='"+object[i].placeholder+"'></div>"));
                    break;
                case 2: // 多行输入文本
                    group.append($("<div class='col-md-"+(colsLength==1?10:8)+" col-xs-"+(colsLength==1?10:8)+"'><textarea cols='8' class='form-control' placeholder='"+object[i].placeholder+"'></textarea></div>"));
                    break;
                case 5: // 单选
                    var options=$('<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"></div>');
                    if(object[i].options){
                        $.each(object[i].options,function(index,option){
                            options.append($('<label class="radio-inline"><input type="radio" name="option" value="'+option+'">'+option+'</label>'));
                        });
                    }
                    group.append(options);
                    break;
                case 6: // 多选
                    var options=$('<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"></div>');
                    if(object[i].options) {
                        $.each(object[i].options, function (index, option) {
                            options.append($('<label class="checkbox-inline"><input type="checkbox" name="option" value="' + option + '">' + option + '</label>'));
                        });
                    }
                    group.append(options);
                    break;
                case 7: // 日历
                    var html = '<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"><div class="input-group date form_date" data-date=""'+
                    'data-date-format="yyyy-mm-dd"'+
                    'data-link-format="yyyy-mm-dd 00:00:00">'+
                        '<input class="form-control" name="loanExpireDateChoose"'+
                    'data-bv-notempty="true"'+
                        'data-bv-notempty-message="结束日不能为空"'+
                    'value=""'+
                    'size="16" type="text" value="" readonly>'+
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-remove"></span></span>'+
                    '<span class="input-group-addon">' +
                    '<span class="glyphicon glyphicon-calendar"></span></span>'+
                    '</div></div>';

                    group.append(html);
                    break;
                case 8: // 图片
                    var list=$('<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"></div>');
                    list.append($("<div class='imgIcon'><img src='../../dist/img/img_icon.png'/></div>"));
                    group.append(list);
                    break;
                case 9: // 视频
                    var list=$('<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"></div>');
                    list.append($("<div class='imgIcon'><img src='../../dist/img/video_icon.png'/></div>"));
                    group.append(list);
                    break;
                case 11: // 附件
                    var list=$('<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"></div>');
                    list.append($("<div class='col-md-4'><img class='img-thumbnail' style='width: 100%;' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTY2ZWE0ZTAwZCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjZlYTRlMDBkIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4='/></div>"));
                    //list.append($("<div class='col-md-4'><img class='img-thumbnail' style='width: 100%;' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTY2ZWE0ZTAwZCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjZlYTRlMDBkIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4='/></div>"));
                    //list.append($("<div class='col-md-4'><img class='img-thumbnail' style='width: 100%;' src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTY2ZWE0ZTAwZCB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1NjZlYTRlMDBkIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4='/></div>"));
                    group.append(list);
                    break;
                case 10: // 表格
                    var table=$('<div class="col-md-'+(colsLength==1?10:8)+' col-xs-'+(colsLength==1?10:8)+'"></div>');
                    var tbody=$('<table class="table table-bordered"></table>');
                    var thead=$('<tr></tr>');
                    thead.append($('<th>序号</th>'));
                    $.each(object[i].cols,function(index,col){
                        thead.append($('<th>'+col+'</th>'));
                    });
                    tbody.append(thead);
                    for (var m=0;m<2;m++){
                        var tr=$('<tr></tr>');
                        tr.append($('<td>'+(m+1)+'</td>'));
                        $.each(object[i].cols,function(index,col){
                            tr.append($('<td>&nbsp;&nbsp;</td>'));
                        });
                        tbody.append(tr);
                    }
                    table.append(tbody);
                    group.append(table);
                    break;
                case 12: // 说明文字
                    group.append($("<div class='col-md-"+(colsLength==1?10:8)+" col-xs-"+(colsLength==1?10:8)+"'><p>"+object[i].placeholder+"</p></div>"));
                    break;
            }
            control.append(group);
            row.append(control);
        }
        container.append(row);
    });
    dom.append(container);
    return dom.html();
}

function saveCatalog(){
    var nodes = tree.getSelectedNodes();
    if (!nodes || nodes.length==0){
        layer.alert("至少选择一个目录节点");
        return;
    }

    if (nodes.length>1){
        layer.alert("只能选择一个目录节点");
        return;
    }

    var node = nodes[0];
    var content = JSON.stringify(getControlList());
    var checkTemplateCatalogInfo ={
        id: node.id,
        indexContent: content
    };

    node.indexContent=content;
    dataSubmit(checkTemplateCatalogInfo, "/check/template/catalog/edit/submit.json", "保存成功", null, function(){
        layer.msg("保存成功",{icon: 1});
        tree.refresh();
        tree.selectNode(node);
        //window.location.href=webRoot+"/pages/settings/tempManage.html?id="+id;
    });
}

function renderCatalog(){
    var nodes = tree.getSelectedNodes();
    if (!nodes || nodes.length==0){
        layer.alert("至少选择一个目录节点");
        return;
    }

    if (nodes.length>1){
        layer.alert("只能选择一个目录节点");
        return;
    }

    var node = nodes[0];
    var content = JSON.parse(node.indexContent);
    if (!content || content.length<=0){
        return;
    }

    for (var i=0;i<content.length;i++){
        var lineData = content[i];
        var lineDom = addLine();
        $.each(lineData,function(index,control){
            var type = control.type;
            switch (parseInt(type)){
                case 1:
                    lineDom.append(getLineInputHtml(control.title,control.placeholder));
                    break;
                case 2:
                    lineDom.append(getMultiLineInputHtml(control.title,control.placeholder));
                    break;
                case 3:
                    lineDom.append(getDigitsInputHtml(control.title,control.placeholder));
                    break;
                case 4:
                    lineDom.append(getMoneyInputHtml(control.title,control.placeholder));
                    break;
                case 5:
                    lineDom.append(getCheckBoxHtml(control.title,control.options));
                    break;
                case 6:
                    lineDom.append(getMultiCheckBoxHtml(control.title,control.options));
                    break;
                case 7:
                    lineDom.append(getCalendarHtml(control.title));
                    break;
                case 8:
                    lineDom.append(getPictureHtml(control.title));
                    break;
                case 9:
                    lineDom.append(getVideoHtml(control.title));
                    break;
                case 10:
                    lineDom.append(getTableHtml(control.title,control.cols));
                    break;
                case 11:
                    lineDom.append(getAttachMentHtml(control.title));
                    break;
                case 12:
                    lineDom.append(getDescriptionHtml(control.title,control.placeholder));
                    break;
            }
        });
    }
}

function getControlList(){
    var lineList=[];
    $(".rowBody").find(".lineRow").each(function(index,lineObject){
        var controlList = [];
        $(lineObject).find(".controlList").each(function(index,controlObject){
            controlList.push($(controlObject).serializeJson());
        });
        lineList.push(controlList);
    });
    return lineList;
}

function addLine(){
    /**
     * Created by zhanglidong on 16/8/5.
     */
    var html = $('<fieldset class="lineRow">'+
        '<legend>行</legend>'+
        '<div style="text-align: right;margin-bottom: 10px;">'+
        '<div class="btn-group dropup">'+
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+
        '添加控件<span class="caret"></span>'+
        '</button>'+
        '<ul class="dropdown-menu" style="width:115px;min-width: 115px;">'+
        '<li><a onclick="addLineInput($(this))">单行输入框</a></li>'+
        '<li><a onclick="addMultiLineInput($(this))">多行输入框</a></li>'+
        '<li role="separator" class="divider"></li>'+
        '<li><a onclick="addDigitsInput($(this))">数字输入框</a></li>'+
        '<li><a onclick="addMoneyInput($(this))">金额输入框</a></li>'+
        '<li role="separator" class="divider"></li>'+
        '<li><a onclick="addCheckBox($(this))">单项选择框</a></li>'+
        '<li><a onclick="addMultiCheckBox($(this))">多项选择框</a></li>'+
        '</ul>'+
        '<ul class="dropdown-menu" style="width:115px;min-width: 115px;left:115px;">'+
        '<li><a onclick="addPicture($(this))">图片选择框</a></li>'+
        '<li><a onclick="addVideo($(this))">视频选择框</a></li>'+
        '<li role="separator" class="divider"></li>'+
        '<li><a onclick="addCalendar($(this))">日历选择框</a></li>'+
        //'<li><a onclick="addAttachMent($(this))">附件选择框</a></li>'+
        '<li><a onclick="addTable($(this))">表格数据框</a></li>'+
        '<li><a onclick="addDescription($(this))">说明文字框</a></li>'+
        '</ul>'+
        '</div>'+
        '<button type="button" class="btn btn-danger" style="width: 100px;right: 0px;" onclick="$(this).parent().parent().remove()">删除行</button>'+
        '</div>'+
        '</fieldset>');
    $('.rowBody').append(html);
    return html;
}

function removeControl(target){
    target.closest(".controlList").remove();
}

function addLineInput(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getLineInputHtml('',''));
}

function getLineInputHtml(title,placeholder){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">单行文本输入框</h3>'+
        '<input type="hidden" name="type" value="1" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-6">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '<div class="col-md-6">'+
        '<input type="text" name="placeholder" class="form-control" placeholder="请输入输入框提示文字" value="'+placeholder+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addMultiLineInput(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getMultiLineInputHtml('',''));
}

function getMultiLineInputHtml(title,placeholder){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">多行文本输入框</h3>'+
        '<input type="hidden" name="type" value="2" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-6">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '<div class="col-md-6">'+
        '<textarea type="text" cols="8" name="placeholder" class="form-control" placeholder="请输入输入框提示文字">'+placeholder+'</textarea>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addDigitsInput(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getDigitsInputHtml('',''));
}

function getDigitsInputHtml(title,placeholder){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">数字输入框</h3>'+
        '<input type="hidden" name="type" value="3" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-6">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '<div class="col-md-6">'+
        '<input type="text" name="placeholder" class="form-control" placeholder="请输入输入框提示文字" value="'+placeholder+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addMoneyInput(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }

    target.closest('.lineRow').append(getMoneyInputHtml('',''));
}

function getMoneyInputHtml(title,placeholder){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">金额输入框</h3>'+
        '<input type="hidden" name="type" value="4" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-6">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '<div class="col-md-6">'+
        '<input type="text" name="placeholder" class="form-control" placeholder="请输入输入框提示文字" value="'+placeholder+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addCheckBox(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getCheckBoxHtml('',[]));
}

function getCheckBoxHtml(title,options){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">单项选择框</h3>'+
        '<input type="hidden" name="type" value="5" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-10">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>' +
        '<div class="col-md-2">'+
        '<button type="button" class="btn btn-primary" value="添加选项" onclick="addOption($(this))">添加选项</button>'+
        '</div>' +
        '</div><br>'+
        '<div class="row optionList">';
    if (options) {
        $.each(options, function (index, option) {
            html += getOptionHtml(option);
        });
    }
    html +='</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addMultiCheckBox(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getMultiCheckBoxHtml('',[]));
}

function getMultiCheckBoxHtml(title,options){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">多项选择框</h3>'+
        '<input type="hidden" name="type" value="6" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-10">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>' +
        '<div class="col-md-2">'+
        '<button type="button" class="btn btn-primary" value="添加选项" onclick="addOption($(this))">添加选项</button>'+
        '</div>' +
        '</div><br>'+
        '<div class="row optionList">';
    if (options) {
        $.each(options, function (index, option) {
            html += getOptionHtml(option);
        });
    }
    html +='</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addCalendar(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getCalendarHtml(''));
}

function getCalendarHtml(title){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">日历选择框</h3>'+
        '<input type="hidden" name="type" value="7" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-12">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addPicture(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getPictureHtml(''));
}

function getPictureHtml(title){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">图片选择框</h3>'+
        '<input type="hidden" name="type" value="8" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-12">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addVideo(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getVideoHtml(''));
}

function getVideoHtml(title){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">视频选择框</h3>'+
        '<input type="hidden" name="type" value="9" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-12">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addTable(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getTableHtml('',[]));
}

function getTableHtml(title,cols){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">表格</h3>'+
        '<input type="hidden" name="type" value="10" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-10">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>' +
        '<div class="col-md-2">'+
        '<button type="button" class="btn btn-primary" value="添加选项" onclick="addTableCol($(this))">添加列</button>'+
        '</div>' +
        '</div><br>'+
        '<div class="row optionList">';
    if (cols) {
        $.each(cols, function (index, col) {
            html += getTableColHtml(col);
        });
    }
    html +='</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addAttachMent(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getAttachMentHtml(''));
}

function getAttachMentHtml(title){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">附件选择框</h3>'+
        '<input type="hidden" name="type" value="11" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-12">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addDescription(target){
    if(target.closest(".lineRow").find(".controlList").length>=2){
        layer.alert("一行最多只能放入两个控件");
        return;
    }
    target.closest('.lineRow').append(getDescriptionHtml('',''));
}

function getDescriptionHtml(title,placeholder){
    var html='<form class="controlList">'+
        '<div class="box box-warning">'+
        '<div class="box-header with-border">'+
        '<h3 class="box-title">说明文字</h3>'+
        '<input type="hidden" name="type" value="12" />'+
        '<div class="box-tools pull-right">'+
        '<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>'+
        '<button type="button" class="btn btn-box-tool" onclick="removeControl($(this))"><i class="fa fa-times"></i></button>'+
        '</button>'+
        '</div>'+
        '</div>'+
        '<div class="box-body" style="display: block;">'+
        '<div class="row">'+
        '<div class="col-md-12">'+
        '<input type="text" name="title" class="form-control" placeholder="请输入标题" value="'+title+'">'+
        '</div>' +
        '</div><br/><div class="row">'+
        '<div class="col-md-12">'+
        '<textarea type="text" name="placeholder" cols="4" class="form-control" placeholder="请输入说明文字">'+placeholder+'</textarea>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</form>';
    return html;
}

function addOption(target){
    if(target.closest(".box-body").find(".input-group").length>=6){
        layer.alert("最多支持6个选项");
        return;
    }
    var $parent = target.closest(".box-body");
    $parent.find(".optionList").append(getOptionHtml(''));
}

function getOptionHtml(option){
    var html = "<div class='col-md-12'>" +
        "<div class='input-group' style='margin-bottom:10px;'>" +
        "<input type='text' class='form-control' name='options' placeholder='请输入选项描述文字' value='"+option+"'>" +
        '<span class="input-group-btn">'+
        '<button class="btn btn-default delete" type="button" onclick="removeOption($(this))"><i class="glyphicon glyphicon-remove"/></button>'+
        '</span>'+
        "</div>" +
        "</div>";
    return html;
}

function addTableCol(target){
    var $parent = target.closest(".box-body");
    $parent.find(".optionList").append(getTableColHtml(''));
}

function getTableColHtml(col){
    var html = "<div class='col-md-12'>" +
        "<div class='input-group'>" +
        "<input type='text' class='form-control' name='cols' placeholder='请输入列描述文字' value='"+col+"'>" +
        '<span class="input-group-btn">'+
        '<button class="btn btn-default" type="button" onclick="removeTableCol($(this))"><i class="glyphicon glyphicon-remove"/></button>'+
        '</span>'+
        "</div>" +
        "</div>";
    return html;
}

function removeOption(target){
    target.closest('.col-md-12').remove();
}

function removeTableCol(target){
    target.closest('.col-md-12').remove();
}