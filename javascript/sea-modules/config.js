define(function(require,exports,module){
    var Theme = require("theme");
    var Strategy = require("strategy");
    module.exports = {
        "border":"solid #ffffff 10px",
        "bgcolor":"#000",
        "strategy":Strategy.get("xu"),
        "theme":Theme.getTheme("num"),
        "direction":"up",
        "oldT":[],
        setBorder:function(border){
            this.border=border;
        },
        setBgcolor:function(bgcolor){
            this.bgColor = bgcolor;
        },
        setStrategy:function(startegy){
            this.strategy = Strategy.get(startegy);
        },
        setTheme:function(theme){
            this.theme = Theme.getTheme(theme);
        },
        setDirection: function (dir) {
            this.direction=dir;
        },
        setOldT:function(t){
            //this.oldT= Array.prototype.concat.call(t);//用这种方法进行数组clone,只能是1维数组，如果是二维数组还是不行啊

            //需要一种二维数组的clone方法

            this.oldT=[];
            for(var i=0;i< t.length;i++){
                this.oldT.push(t[i].concat());
            }

        }
    }
})
