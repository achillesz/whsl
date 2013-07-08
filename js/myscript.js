String.prototype.trim = function(){
        return this.replace(/^\s+ | \s+$ /,'');
};
// jsonp
request.n = 0;
function request(url, callback) {
    request.n++;
    var head0 = document.getElementsByTagName('head')[0];
    var scriptEle = document.createElement('script');
    var time = (new Date).getTime();
    var fname = 'hx_json' + request.n + time;
    scriptEle.type = "text/javascript";
    url += url.indexOf('?') != -1 ? '&' : '?';
    url += 'callback=' + fname;
    window[fname] = callback;
    document.title = url;
    scriptEle.src = url;
    head0.appendChild(scriptEle);
    if (scriptEle.readyState) {
        scriptEle.onreadystatechange = function () {
            if (scriptEle.readyState == 'loaded' || scriptEle.readyState == 'complete') {
                scriptEle.onreadystatechange = null;
                document.getElementsByTagName('head')[0].removeChild(scriptEle);
                try {
                    delete callback;
                }
                catch (e) {
                }
            }
        }
    }
    else {
        scriptEle.onload = function () {
            document.getElementsByTagName('head')[0].removeChild(scriptEle);
            try {
                delete callback;
            }
            catch (e) {
            }
        }
    }
}

// 滚动新闻
(function () {
    var obox = document.getElementById('scrollText'),
        oboxIner = obox.getElementsByTagName('div')[0],
        oCon = oboxIner.getElementsByTagName('ul')[0],
        w = oCon.offsetWidth,
        sl = obox.scrollLeft;
    oboxIner.appendChild(oCon.cloneNode(true));
    var time = setInterval(function () {
        if (w - obox.scrollLeft < 0) {
            obox.scrollLeft = 0;
        }
        else {
            obox.scrollLeft += 1;
        }
    }, 30)
    obox.onmouseover = function (e) {
        clearInterval(time);
    }
    obox.onmouseout = function (e) {
        time = setInterval(function () {
            if (w - obox.scrollLeft < 0) {
                obox.scrollLeft = 0;
            }
            else {
                obox.scrollLeft++
            }
        }, 30)
    }
})();

// 时间判断
(function () {
    var obox = document.getElementById('timeBox'),
        oboxDivs = obox.childNodes, len1 = oboxDivs.length, i, eles = [];
    for (i = 0; i < len1; i++) {
        if (oboxDivs[i].nodeType == 1) {
            eles.push(oboxDivs[i]);
        }
    }
    var time = new Date();
    var hours = time.getHours();
    var min = time.getMinutes();
    if (hours > 8 && hours < 12) {
        if (hours == 9 && min < 30) return;
        if (hours == 11 && min > 30) return;
        eles[0].className = 'fl timep1 timep2';
        eles[1].className = 'fl timep1';
        eles[2].className = 'fl timep1';

    }
    else if (hours > 13 && hours < 17) {
        eles[0].className = 'fl timep1';
        eles[1].className = 'fl timep1 timep2';
        eles[2].className = 'fl timep1';

    }
    else if (hours > 19 && hours < 20) {
        eles[0].className = 'fl timep1';
        eles[1].className = 'fl timep1';
        eles[2].className = 'fl timep1 timep2';

    }
})();

// select
(function () {
    var osel = document.getElementById('select'),
        oText = osel.children[0],
        oCon = osel.children[1],
        pText = oText.getElementsByTagName('p')[0],
        isopen = true,
        oul = oCon.getElementsByTagName('ul')[0],
        olis = oul.getElementsByTagName('li'), i, len;

    oText.onclick = function (e) {
        e = e || window.event;
        if (isopen) {
            osel.className += ' select1';
            oCon.style.display = 'block';
            isopen = false;
        }
        else {
            oCon.style.display = 'none';
            osel.className = 'select fl mt10 pr';
            isopen = true;
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        return false;
    };
    document.onclick = function () {
        if (isopen) return;
        oCon.style.display = 'none';
        osel.className = 'select fl mt10 pr';
        isopen = true;
    }
    for (i = 0, len = olis.length; i < len; i++) {
        olis[i].onmouseover = function () {
            this.style.backgroundColor = "#eee";
        };
        olis[i].onmouseout = function () {
            this.style.backgroundColor = "#fff";
        };
        olis[i].onclick = function (e) {
            pText.innerHTML = this.innerHTML;
            if(this.value === 60000){
                alert('已设置为1分钟刷新一次');
            }
            else if(this.value === 120000){
                alert('已设置为2分钟刷新一次');
            }
            else{
                alert('已设置为5分钟刷新一次');
            }
            if(oAsk.time){ clearInterval(oAsk.time)}
            oAsk.settime = this.value;
            oAsk.time = setInterval(function(){oAsk.doIt(oAsk.setUrl())},oAsk.settime);
        }
    }
})();

// search
(function () {
    var obj = document.getElementById('search');
    osub = obj.parentNode.getElementsByTagName('input')[1];
    obj.onfocus = function () {
        this.style.color = "#000";
        if (this.value == '请输入搜索内容') {
            this.value = '';
        }
        this.parentNode.className += " search1";
    };
    obj.onblur = function () {
        this.style.color = "#BBBBBB";
        if (this.value == '') {
            this.value = "请输入搜索内容";
        }
        this.parentNode.className = "search";
    };
    osub.onclick = function(e){
        var url = 'http://wenda.hexun.com/Search?vt=question&keywords=' + escape(obj.value);
        if(obj.value.trim() == '' || obj.value == '请输入搜索内容'){
            alert('请输入问题')
            return false;
        }
        window.open(url);
    };
})();

// drop
(function () {
    var obj = document.getElementById('drop'),
        dropText = obj.getElementsByTagName('div')[0],
        dropCon = obj.children[1],
        ptext = dropText.getElementsByTagName('p')[0],
        lists = dropCon.getElementsByTagName('ul')[0].getElementsByTagName('li'),
        isopen = true,
        len = lists.length,
        i;
    dropText.onclick = function (e) {
        e = e || window.event;
        if (isopen) {
            this.parentNode.className += ' drop2';
            dropCon.style.display = 'block';
            isopen = false;
        }
        else {
            this.parentNode.className = 'fl drop';
            dropCon.style.display = 'none';
            isopen = true;
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }

    };
    if (document.addEventListener) {
        document.addEventListener('click', function () {
            if (isopen) return;
            obj.className = 'fl drop';
            dropCon.style.display = 'none';
            isopen = true;
        });
    }
    else {
        document.attachEvent('onclick', function () {
            if (isopen) return;
            obj.className = 'fl drop';
            dropCon.style.display = 'none';
            isopen = true;
        })
    }
    for (i = 0; i < len; i++) {
        lists[i].index = i;
        lists[i].onclick = function (e) {
            var str;
            ptext.innerHTML = this.innerHTML;
            // labelids
            if(this.index == 0){
                str =  ZJtag[0] +'|' +  ZJtag[1] + '|' + ZJtag[2];
            }
            else if(this.index == 1){
                str =  ZJtag[0];
            }
            else if(this.index == 2){
                str =  ZJtag[1];
            }
            else{
                str =  ZJtag[2];
            }
            oAsk.labelIds = str;
            oAsk.doIt(oAsk.setUrl());

        }
    }

})();
// ask
function Ask(url, options) {
    this.pageSizeCanche = options.pageSize;
    this.time = null;
    this.settime = 60000;
    this.obj = document.getElementById('questionAndAnswer');
    this.url = url;
    this.pageIndex = options.pageIndex;
    this.pageSize = options.pageSize;
    this.labelIds = options.labelIds;
    this.hasanswer = options.hasanswer;
    this.page = document.getElementById('page');
    this.pre = this.page.getElementsByTagName('a')[0];
    this.next = this.page.getElementsByTagName('a')[1];
    this.doIt(this.setUrl());
}
Ask.prototype = {
    setUrl: function () {
        var url = this.url,ret = [];
        if(this.hasanswer != 0 && this.pageSizeCanche != this.pageSize){
            this.pageSize = this.pageSizeCanche;
        }
        if ((typeof this.pageIndex) != 'undefined') {
            ret.push('pageIndex=' + this.pageIndex);
        }
        if ((typeof this.pageSize) != 'undefined') {
            ret.push('pageSize=' + this.pageSize);
        }
        if ((typeof this.labelIds) != 'undefined') {
            ret.push('labelIds=' + this.labelIds);
        }
        if ((typeof this.hasanswer) != 'undefined') {
            ret.push('hasanswer=' + this.hasanswer);
        }
        url += url.indexOf('?') == '-1' ? '?' : '&';
        return url += ret.join('&');
    },
    doIt: function (url) {

        if(this.time){
            clearInterval(this.time);
        }
        var _this = this;
        request(url, function (data) {


            if(data.status == 1){
                if(data.result.length < _this.pageSize){
                    if(_this.pageIndex == 1){
                        _this.pre.style.display = 'none';
                        _this.next.style.display = 'none';
                    }
                    _this.next.style.display = 'none';
                }
                _this.view(data);
            }
            if(data.status == 1000){
                _this.obj.innerHTML = '';
                alert("没有数据")
            }
            _this.time = setInterval(function(){_this.doIt(_this.setUrl())},_this.settime)
        });
    },
    view: function (data) {
        var pageInfo;
        if(this.hasanswer != 0){
             pageInfo = doT.template(document.getElementById('wdT').text);
            this.obj.innerHTML = pageInfo(data);
        }
        else{

             pageInfo = doT.template(document.getElementById('askT').text);
             this.obj.innerHTML = pageInfo(data);
        }


    }
};
//hasanswer 选择
(function(){
    var ele = document.getElementById('askNavBox'),
        lis = ele.getElementsByTagName('li'),
        i=0,
        len = lis.length;
    for(i; i < len; i++){
        lis[i].index = i;
        lis[i].onclick = function(e){
            var str;
            for(k = 0; k < len; k++){
                lis[k].className = '';
                this.className = 'tagOn';
            }
            if(this.index == 0){
                //已回答 默认
                str = 1;
            }
            else if(this.index == 1){
                // 未回答
                str = 0;
                oAsk.pageSize = oAsk.pageSizeCanche*2;
            }
            else{
                // 全部回答
                str = 2;
            }
            oAsk.hasanswer = str;
            oAsk.doIt(oAsk.setUrl());
        }
    }
})();
//page
(function(){
    var obj = document.getElementById('page'),
        pre = obj.getElementsByTagName('a')[0],
        next = obj.getElementsByTagName('a')[1];
    pre.onclick = function(e){
        if(oAsk.pageIndex == 0){return false;}
        oAsk.pageIndex--;
        oAsk.doIt(oAsk.setUrl());
        return false;
    };
    next.onclick = function(e){
        oAsk.pageIndex++;
        oAsk.doIt(oAsk.setUrl());
        return false;
    };

})();

// teatArea 登录
(function(){
    var textArea = document.getElementById('textArea'),
        niming = document.getElementById('niming'),
        username = document.getElementById('userName'),
        form = document.getElementById('formCon'),
        btn = document.getElementById('subForm');
        nimingInput = niming.getElementsByTagName('input')[0];
    function loginName(){
        var o1 = document.getElementById('hexunMember_isloginedSetup_span_display_username') || null;
            if(o1){
            username.innerHTML =  o1.innerHTML;
                }

    }
    loginName();
    textArea.onfocus = function(e){
        var  _this = this;
        this.parentNode.className = "fr textArea textArea1 mt15";
        if(this.value.trim() == '请登录后输入问题'){
            this.value = '';
        }
        request('http://reg.tool.hexun.com/wapreg/checklogin.aspx?format=json',function(data){
                if(data.islogin == 'True'){
                    niming.style.display = 'block';

                }
                else{

                   popup('登录','http://login.tool.hexun.com/OtherInterFace/IFR_userLoginDialog_01.aspx?hexunMember_loginSetup_referrer='+document.referrer,'300');
                }
        })
    };
    textArea.onblur = function(e){
        this.parentNode.className = "fr textArea mt15";
        if(this.value ==""){
            this.value = "请登录后输入问题";
        }
    };
    btn.onclick = function(e){
        var title = textArea.value,labels,IsAnonymous,url,nowZJ,
            timebox = document.getElementById('timeBox'),odivs = timebox.children,len = odivs.length;

        if(title.trim() == '请登录后输入问题'){
            alert('请输入问题');
            return false;
        }
        title = encodeURI(title);
        labels = ZJtag[3];
        for(var k = 0; k < len; k++){
            if(odivs[k].className.indexOf('timep2') > 0){
                labels += '|' + ZJtag[k];
            }
        }
        if(nimingInput.checked){
            IsAnonymous = 'true';
        }
        else{
            IsAnonymous = 'False';
        }
        url = 'http://wenda.tool.hexun.com/Salon/PostQuestion?' + 'title=' + title + '&labels=' + labels + '&IsAnonymous=' + IsAnonymous;

        if(this.value == ''){

        }
        request(url,function(json){
            if (json.status == 1) {
                alert(json.result.message);
                //成功，进行相关处理
            }
            else {
                alert(json.result.message);
            }
        });
        return false;
    }
})();

// 专家好评版
(function(){
    var url = 'http://wenda.tool.hexun.com/Salon/ExpertList';
    var o1 = document.getElementById('hpbFirst');
    var o2 = document.getElementById('hpbSecond');
    url += url.indexOf('?') == -1 ? '?' : '&';
    url +='userIDS=' + uids.join('|');

    var pageinfo1 = doT.template(document.getElementById('phb1T').text);
    var pageinfo2 = doT.template(document.getElementById('phb2T').text);


    request(url,function(response){
        var list1 = o1.getElementsByTagName('li'),list2 = o2.getElementsByTagName('li'), i, j,len1,len2;
        if(response.status == 1){
            o1.innerHTML = pageinfo1(response);
            o2.innerHTML = pageinfo2(response);
            for( i = 0,len1 = list1.length; i < len1; i++ ){
                list1[i].onmouseover = function(){
                    this.style.backgroundColor = "#fff";
                };
                list1[i].onmouseout = function(){
                    this.style.backgroundColor = "";
                };
            }
            for( j = 0,len2 = list2.length; j < len2; j++ ){
                list2[j].onmouseover = function(){
                    this.style.backgroundColor = "#fff";
                };
                list2[j].onmouseout = function(){
                    this.style.backgroundColor = "";
                }
            }

        }
    });
})();
// 外汇问答
(function(){
    var o3 = document.getElementById('whwd');
    var pageinfo3 = doT.template(document.getElementById('whwdT').text);
    var url = 'http://wenda.tool.hexun.com/Salon/GetQuestions?' + 'pageIndex=1&pageSize=10&labelIds=' + ZJtag[0] +'|' +  ZJtag[1] + '|' + ZJtag[2] +'&hasanswer=2';
    request(url,function(response){
        if(response.status == 1){
            o3.innerHTML = pageinfo3(response);
        }
    });
})();
// 更多专家
(function(){
    var ele = document.getElementById('hzzj'),
        divs = ele.childNodes,odivs = [], i,len, k,len1,viewMore = document.getElementById('viewMore'),nowIndex = 0;
    for(i = 0,len = divs.length; i< len; i++){
        if(divs[i].nodeType == 1 && divs[i].nodeName == 'DIV'){
            odivs.push(divs[i]);
        }
    }
    for(k = 0,len1 = odivs.length; k < len1; k++){
        odivs[k].index = k;
    }
    viewMore.onclick = function(e){
        nowIndex++;
        if(nowIndex == odivs.length -1){
            this.parentNode.style.display = "none";
        }
        odivs[nowIndex].style.display = 'block';
        return false;
    }
})();

//now line
(function(){
    var nowline = document.getElementById('nowLine');
    var temp = nowLineNum + parseInt(Math.random()*10);
    nowline.innerHTML = temp;

})();
// 立即刷新
(function(){
    var o1 = document.getElementById('shuaxin');
    o1.onclick = function(){
        oAsk.doIt(oAsk.setUrl());
        return false;
    };
    o1 = null;
})();
// 问答次数
(function(){
    var sumVisters = document.getElementById('sumVisters');
    request('http://wenda.tool.hexun.com/salon/GetQuestionsCountByLabelID?labelId=79302',function(data){
        if(data.status == 1){
            sumVisters.innerHTML = data.result;
        }
    })
})();

