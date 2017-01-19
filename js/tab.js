function Tab(options){
    this.oWrapper = document.querySelector('.wrapper');
    this.oTitle = this.oWrapper.querySelectorAll('.title');
    this.oContent = this.oWrapper.querySelectorAll('.content');
    this.len = this.oTitle.length;
    this.iNow = 0;
    this.clock = null;
    var defaults = {
        autoPlay:true, //自动轮播
        autoTime:1000 //自动轮播时间间隔
    };
    this.ops = options || {};
    for (var i in defaults) {
        if (typeof options[i] === 'undefined') {
            options[i] = defaults[i];
        } else if (typeof options[i] === 'object') {
            for (var j in defaults[i]) {
                if (typeof options[i][j] === 'undefined') {
                    options[i][j] = defaults[i][j];
                }
            }
        }
    }
    this.init();
    if(this.ops.autoPlay === true){
        this.autoTab();
        this.switchTab();
    }
}
Tab.prototype.init = function(){
    var _this = this;
    for(var i=0;i<this.len;i++){
        this.oTitle[i].index = i;
        this.oTitle[i].addEventListener("click",function(){
            _this.iNow = this.index;
            _this.titleShow();
            _this.contentShow();
        },false);
    }
};
Tab.prototype.titleShow = function(){
    var _this = this;
    for(var j=0;j<_this.len;j++){
        _this.oTitle[j].className = "title";
        _this.oTitle[_this.iNow].className = "title active";
    }
};
Tab.prototype.contentShow = function(){
    var _this = this;
    for(var j=0;j<_this.len;j++){
        _this.oContent[j].className = "content";
        _this.oContent[_this.iNow].className = "content show";
    }
};
Tab.prototype.autoTab = function(){
    var _this = this;
    _this.clock=setInterval(function(){
        _this.iNow++;
        if(_this.iNow>(_this.len-1)){
            _this.iNow=0;
        }
        _this.titleShow();
        _this.contentShow();
    },_this.ops.autoTime);
};
Tab.prototype.switchTab = function(){
    var _this = this;
    _this.oWrapper.addEventListener("mouseover",function(){
        clearInterval(_this.clock);
    },false);
    _this.oWrapper.addEventListener("mouseout",function(){
        _this.autoTab();
    },false)
};
function tab(options) {
    return new Tab(options);
}