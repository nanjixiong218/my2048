/**
 * Created by xu on 2014/6/8.
 */
define(function(require,exports,modules){
    var config = require("config");
    var fill = require("fill");
    var newNum = require("getNewNumber");

    function my2048(){
        var table = document.getElementsByTagName("table")[0];
        var t = [];//table对应的二维数组，其中记录了table对应位置的值，这样方便访问，不需要总访问dom
        initT();
        fill.fill(t,table);
        newNum.getNewNum(t,table);
        document.onkeyup=keyupEvent;
        function keyupEvent(event){
            var event = event?event:window.event;
            var target = event.target?event.target:event.srcElement;
            var keycode = event.which?event.which:event.keyCode?event.keyCode:event.charCode;
            switch(keycode){
                case 65:
                    config.strategy.left(t);break;
                case 87:
                    config.strategy.up(t);break;
                case 68:
                    config.strategy.right(t);break;
                case 83:
                    config.strategy.down(t);break;
                default :return;
            }
            //反映到页面上
            fill.fill(t,table);
            //判断是否需要产生新数据，如果移动后和移动前状态改变了，需要产生新数据，如果没改变就什么都不执行
            //isChanged划分在了strategy模块中，isDead划分在了newNum模块中
            //这种分块设计的很不好呀！
            if(config.strategy.isChanged(t,config.oldT)){
                newNum.getNewNum(t,table);
                config.setOldT(t);
            }else{
                //这里进行判死，在死了以后，玩家继续按键会不断提醒游戏结束。
                if(newNum.isDead(t)){
                    alert("你已经输了，重新开始吧！");
                }
            };
        }


        /**
         * 初始化t
         */
        function initT(){
            for( var i = 0,len = table.rows.length ;i < len ;i++){
                var row = table.rows[i];
                var tr = [];
                for(var j = 0,len = row.cells.length;j < len;j++){
                    var col = row.cells[j];
                    tr.push(0);
                }
                t.push(tr);
            }
            config.setOldT(t);
        }
    }
    exports.my2048 = my2048;
});

