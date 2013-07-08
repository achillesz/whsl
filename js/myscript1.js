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
// 问答数据
function Ask(url, options) {
    this.pageSizeCanche = options.pageSize;
    this.time = null;
    this.settime = 600000;
    this.obj = document.getElementById('questionAndAnswer');
    this.url = url;
    this.pageIndex = options.pageIndex;
    this.pageSize = options.pageSize;
    this.labelIds = options.labelIds;
    this.hasanswer = options.hasanswer;
    this.oscr = null;
//    this.page = document.getElementById('page');
//    this.pre = this.page.getElementsByTagName('a')[0];
//    this.next = this.page.getElementsByTagName('a')[1];
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
                _this.view(data);
                _this.callback();
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


    },
    callback:function(){
       if(this.oscr){
           this.oscr.clear();
       }
       this.oscr = null;
       this.oscr =  new Scroll('questionAndAnswer');
    }
};


function Scroll(obj){
    this.ele = document.getElementById(obj);
    this.tar = this.ele.parentNode;
    this.timer = null;
    this.timeset = 40;
    this.oneH = 0;
    this.init();
}
Scroll.prototype = {
    init:function(){
        this.oneH = this.ele.offsetHeight;
        var _this = this;
        this.ele.innerHTML += this.ele.innerHTML;
        this.timer = setInterval(function(){
            _this.scroll();
        },this.timeset);
        this.bind();
    },
    scroll:function(){
        if(this.tar.scrollTop - this.oneH > 0){
            this.tar.scrollTop = 0;
            console.log(this.tar.scrollTop);
            return;
        }

        this.tar.scrollTop++;
    },
    clear:function(){
        clearInterval(this.timer)
    },
    bind:function(){
        var _this = this;
        this.tar.onmouseover = function(){
            if(_this.timer){
                _this.clear();
            }
        };
        this.tar.onmouseout = function(){
            if(_this.timer) {
                _this.clear();
            }
            _this.timer =setInterval(function(){
                _this.scroll();
            },_this.timeset)
        };
    }
};



