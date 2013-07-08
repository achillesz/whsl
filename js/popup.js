var move = false, _X, _Y;

var isIE = document.all ? true : false;

function StartDrag(e) {  //定义准备拖拽的函数 按下鼠标onMousedown
    var parentwin = document.getElementById("alertFram");
    var d = document;
    var e = e ? e : event;
    if (isIE) {
        parentwin.setCapture(); //对当前对象的鼠标动作进行跟踪

    } else {

        window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);

    }
    move = true;
    //获取鼠标相对内容层坐标
    //_X = parentwin.offsetLeft - e.clientX;
    //_Y = parentwin.offsetTop - e.clientY;
    var mx = e.pageX || e.clientX + document.documentElement.scrollLeft;
    var my = e.pageY || e.clientY + document.documentElement.scrollTop;
    var ox = parentwin.offsetLeft + 103;
    var oy = parentwin.offsetTop + (isIE ? -40 : 75);
    //alert(e.pageY)
    //alert(e.clientY)
    d.onmousemove = function (e) {//定义拖拽函数 鼠标放上拖动onMousemove
        var e = e ? e : event;

        if (move) {

            //var parentwin = document.getElementById("alertFram");

            //var x = e.clientX + _X;

            //var y = e.clientY + _Y;
            var mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft;
            var mouseY = e.pageY || e.clientY + document.documentElement.scrollTop;

            //if (x <= 0)

            //    x = 0

            //if (y <= 0)

            //    y = 0


            //parentwin.style.left = (x) + "px";

            //parentwin.style.top = (y) + "px";
            parentwin.style.left = ox + mouseX - mx + "px";

            parentwin.style.top = oy + mouseY - my + "px";

            parentwin.style.cursor = "move";

        }

    }
    d.onmouseup = function () {//定义停止拖拽函数 松开鼠标onMouseup

        //停止对当前对象的鼠标跟踪

        if (isIE) {
            parentwin.releaseCapture();
        }

        else {
            window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        d.onmousemove = null;
        move = false;

    }
}

//@mql_modify 2013-4-22 start-------
//g_myBodyInstance = (document.documentElement ? document.documentElement : window);

//window.onscroll = function () {
//    var parentwin = document.getElementById("alertFram");

//    if (parentwin != null) {
//        parentwin.style.top = (window.screen.height * 0.2 + g_myBodyInstance.scrollTop) + "px";
//    }
//};

//@mql_modify 2013-4-22 end-------

var popup_state = false;
function popup(topic, frameurl, height) {
    if (popup_state == false) {
        popup_state = true;
        popupW(topic, frameurl, 342, height)
    }
    return false;
}
//带有宽度的调用
function popupW(topic, frameurl, Pwidth, height) {
    var eSrc;
    try {
        eSrc = (window.parent.document.all) ? window.event.srcElement : arguments[1];
    } catch (e) {
    }
    var shield = window.parent.document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = ((window.parent.document.documentElement.clientWidth > window.parent.document.documentElement.scrollWidth) ? window.parent.document.documentElement.clientWidth : window.parent.document.documentElement.scrollWidth) + "px";
    ;
    shield.style.height = ((window.parent.document.documentElement.clientHeight > window.parent.document.documentElement.scrollHeight) ? window.parent.document.documentElement.clientHeight : window.parent.document.documentElement.scrollHeight) + "px";
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=0)";
    shield.style.opacity = 0;
    var alertFram = window.parent.document.createElement("DIV");
    alertFram.id = "alertFram";
    //@mql_modify 2013-4-22 start----------
    // alertFram.style.position = "absolute";
    alertFram.style.position = "fixed";
    //@mql_modify 2013-4-22 end;-----------
    alertFram.style.left = "50%";
    alertFram.style.top = "20%";
    alertFram.style.marginLeft = "-103px";
//    alertFram.style.marginTop = -75 + window.parent.document.documentElement.scrollTop + "px";
    alertFram.style.width = Pwidth + "px";
    // alertFram.style.height ="600px";
    alertFram.style.background = "";
    alertFram.style.textAlign = "center";
    //alertFram.style.lineHeight = "150px";
    alertFram.style.zIndex = "10001";

    strHtml = "<dl onMousedown=\"StartDrag(event)\" style=\"cursor:move;\"><dd><span class=\"memberLogin_topicClass\">" +
        topic +
        "</span><div class='login_right'><a style='cursor:pointer;' onmousedown='closePop()' title='关闭此对话框' class='close'>关闭</a><a class='zc' onclick=\"window.open('https://reg.hexun.com/regname.aspx?gourl='+" +
        "escape(top.location));top.location.reload();\" href='#' target=\"_top\">快速注册</a></div></dd>";
    strHtml += "<dt><iframe style=\"position:relative\" src='" + frameurl +
        "' scrolling='no' width='100%' frameborder='0' height='" +
        height +
        "px'></iframe></dt></dl>";
    alertFram.innerHTML = strHtml;
    window.parent.document.body.appendChild(alertFram);
    window.parent.document.body.appendChild(shield);
    //@mql_modify 2013-4-22 start-------
    (function (win, doc) {
        var isIE6 = !!document.all && doc.documentMode == undefined,
            div = doc.getElementById("alertFram"),
            html = doc.getElementsByTagName('html')[0],
            divTop = 0;
        if (isIE6 && doc.body.currentStyle.backgroundAttachment !== 'fixed') {//IE下防抖动
            html.style.backgroundImage = 'url(about:blank)';
            html.style.backgroundAttachment = 'fixed';
            div.style.position = "absolute";
            divTop = parseFloat(div.currentStyle.top) || 200;
            fixedHandle();
            win.onscroll = fixedHandle;
        }
        ;
        function fixedHandle() {
            div.style.top = doc.documentElement.scrollTop + divTop + 'px';
        }
    })(window, document)
    //@mql_modify 2013-4-22 end-------
    this.setOpacity = function (obj, opacity) {
        if (opacity >= 1) opacity = opacity / 100;
        try {
            obj.style.opacity = opacity;
        } catch (e) {
        }
        try {
            if (obj.filters.length > 0 && obj.filters("alpha")) {
                obj.filters("alpha").opacity = opacity * 100;
            } else {
                obj.style.filter = "alpha(opacity=\"" + (opacity * 100) + "\")";
            }
        } catch (e) {
        }
    }
    var c = 0;
    this.doAlpha = function () {
        if (++c > 20) {
            clearInterval(ad);
            return 0;
        }
        setOpacity(shield, c);
    }
    var ad = setInterval("doAlpha()", 1);
    this.doOk = function () {
        alertFram.style.display = "none";
        shield.style.display = "none";
        try {
            eSrc.focus();
        } catch (e) {
        }
    }
    try {
        eSrc.blur();
    } catch (e) {
    }
}
function popupHTML(topic, frameurl, height) {
    popupWHTML(topic, frameurl, 240, height)
}
function popupWHTML(topic, popHtm, width, height) {
    var eSrc;
    try {
        eSrc = (window.parent.document.all) ? window.event.srcElement : arguments[1];
    } catch (e) {
    }
    var shield = window.parent.document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = "100%";
    shield.style.height = ((window.parent.document.documentElement.clientHeight > window.parent.document.documentElement.scrollHeight) ? window.parent.document.documentElement.clientHeight : window.parent.document.documentElement.scrollHeight) + "px";
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=0)";
    shield.style.opacity = 0;
    var alertFram = window.parent.document.createElement("DIV");
    alertFram.id = "alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.left = "50%";
    alertFram.style.top = "20%";
    alertFram.style.marginLeft = "-225px";
    //  alertFram.style.marginTop = -75 + window.parent.document.documentElement.scrollTop + "px";
    alertFram.style.width = width + "px";
    // alertFram.style.height ="600px";
    alertFram.style.background = "";
    alertFram.style.textAlign = "center";
    //alertFram.style.lineHeight = "150px";
    alertFram.style.zIndex = "10001";

    strHtml = "<dl><dd><h3>" + topic + "</h3><a style='cursor:hand;' onclick='closePop()' title='关闭此对话框' class='close'>关闭</a></dd>";
    //debugger;
    //popHtm = HTMLEncode(popHtm);
    strHtml += "<dt><table width=100% height=" + height + "px><tr><td valign=top align=left>" + popHtm + "</td></tr></table></dt></dl>";


    alertFram.innerHTML = strHtml;
    window.parent.document.body.appendChild(alertFram);
    window.parent.document.body.appendChild(shield);
    this.setOpacity = function (obj, opacity) {
        if (opacity >= 1) opacity = opacity / 100;
        try {
            obj.style.opacity = opacity;
        } catch (e) {
        }
        try {
            if (obj.filters.length > 0 && obj.filters("alpha")) {
                obj.filters("alpha").opacity = opacity * 100;
            } else {
                obj.style.filter = "alpha(opacity=\"" + (opacity * 100) + "\")";
            }
        } catch (e) {
        }
    }
    var c = 0;
    this.doAlpha = function () {
        if (++c > 20) {
            clearInterval(ad);
            return 0;
        }
        setOpacity(shield, c);
    }
    var ad = setInterval("doAlpha()", 1);
    this.doOk = function () {
        alertFram.style.display = "none";
        shield.style.display = "none";
        try {
            eSrc.focus();
        } catch (e) {
        }
    }
    try {
        eSrc.blur();
    } catch (e) {
    }
}


// 关闭
function closePopHtml() {
    try {
        window.parent.document.body.removeChild(window.parent.document.getElementById("shield"));
        window.parent.document.body.removeChild(window.parent.document.getElementById("alertFram"));
    } catch (e) {
    }
}

function closePop() {
    try {
        parent.document.body.removeChild(parent.document.getElementById("shield"));
        parent.document.body.removeChild(parent.document.getElementById("alertFram"));
        popup_state = false;
    } catch (e) {
    }
}