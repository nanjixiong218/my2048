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
        var i=0;
        var j=0;
        initT();
        fill.fill(t,table);
        newNum.getNewNum(t,table);
        document.onkeyup=keyupEvent;
        function keyupEvent(event){
            var event = event?event:window.event;
            var target = event.target?event.target:event.srcElement;
            var keycode = event.which?event.which:event.keyCode?event.keyCode:event.charCode;

            switch(keycode){
                case 37:
                    config.setDirection("left");config.strategy.left(t);break;
                case 38:
                    config.setDirection("up");config.strategy.up(t);break;
                case 39:
                    config.setDirection("right");config.strategy.right(t);break;
                case 40:
                    config.setDirection("down");config.strategy.down(t);break;
            }
            fill.fill(t,table);
            if(config.strategy.isChanged(t,config.oldT)){
                newNum.getNewNum(t,table);
                config.setOldT(t);
            }else{
                if(newNum.isDead(t)){
                    alert("you are a pig!");
                }
            };
        }


        /**
         * 初始化t
         */
        function initT(){
            for(i=0;i<table.rows.length;i++){
                var row = table.rows[i];

                var tr = [];
                for(j=0;j<row.cells.length;j++){
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
