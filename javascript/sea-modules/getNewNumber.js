/**
 * Created by Administrator on 2014/6/10.
 */

define(function(require,exports,module){
    /**
     * 获得一个随机空位置
     * 返回一个coor，二维数组位置
     */
    var fill = require("fill");
    var config = require("config");
    function needNum(t){//这个函数是判断，在移动方向上是否有已经满的行或列。如果有就不增加新数字。/先不用这个方法
        var dir = config.direction;
        switch(dir){
            case"up":if(isVerticalFull()){return false};break;
            case"left":if(isHorizanalFull()){return false};break;
            case"down":if(isVerticalFull()){return false};break;
            case"right":if(isHorizanalFull()){return false};break;
        }
        return true;
        function isHorizanalFull() {
            var count = 0;
            for (var i = t.length - 1; i >= 0; i--) {
                count=0;
                for (var j = t.length - 1; j >= 0; j--) {
                    if (t[i][j] != 0) {//这两个函数只有这一行不同.如何能够抽象在一起呢？
                        count++;
                        if (count == 4) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        function isVerticalFull() {
            var count = 0;
            for (var i = t.length - 1; i >= 0; i--) {
                for (var j = t.length - 1; j >= 0; j--) {
                    count=0;
                    if (t[j][i] != 0) {
                        count++;
                        if (count == 4) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
    }
    function getRandomPosition(t){

        var empty=[];
        for(var i=0;i<t.length;i++){
            var row = t[i];
            for(var j=0;j<row.length;j++){
                var col = row[j];
                if(col==0){
                    empty.push(getPos(i,j));
                }
            }
        }
        var emptyNum = empty.length;
        if(emptyNum==0){
            return false;
        }
        var random = Math.floor(Math.random()*(emptyNum));

        return getCoor(empty[random]);
        /**
         * 通过二维数组索引获得总位置
         * @param i
         * @param j
         * @returns {number|string}
         */
        function getPos(i,j){
            return 4*i+j;
        }

        /**
         * 通过总位置获得二维数组位置
         * @param pos
         * @returns {Array}
         */
        function getCoor(pos){
            return [Math.floor(pos/4),pos%4];
        }
    }
    /**
     * 产生一个新的数字2
     *
     */
    function getNewNum(t,table){


        var coor = getRandomPosition(t);
        if(coor){
            fill.setCoorTest(t,table,coor,2);
        }else{
            if(isDead(t)){
                alert("you are a pig!");
            }

        }
    }
    function isDead(t){//这个判断死亡的算法好垃圾啊感觉，需要优化。
        for(var i= t.length-1;i>=0;i--){
            for(var j= t.length-1;j>=0;j--){
                if(j!=0&&i!=0){
                    if(t[i][j]==t[i-1][j]||t[i][j]==t[i][j-1]){
                        return false;
                    }

                }else if(j==0&&i!=0){
                    if( t[i][j]==t[i-1][j]){
                        return false;
                    }
                }else if(j!=0&&i==0){
                    if(t[i][j]==t[i][j-1]){
                        return false;
                    }
                }else{
                    return true;
                }
            }

        }
        return true;

    }

    exports.getNewNum = getNewNum;
    exports.isDead = isDead;
});