/**
 * 本模块主要用于产生一个新的数字2，或者不同主题对应的初级设定
 * 本模块依赖fill模块的setCoorTest方法（这样的设计有待改进，没有必要把setCoorTest写在fill模块中，
 * 直接写在此模块中也可以啊！这种模块功能的划分，依赖还需要思考！）
 * 同时产生新的数字的时候，判断是否游戏结束也在此模块中
 * 模块暴露接口有getNewNum和isDead
 */

define(function(require,exports,module){
    var fill = require("fill");
    var config = require("config");
    function needNum(t){//这个函数是判断，在移动方向上是否有已经满的行或列。如果有就不增加新数字。
    // 取消这个方法，用isChanged来判断是否需要产生新数字，所以config.direction暂时也不需要了
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
    /**
     * 获得一个随机空位置
     * 如果有空位置，返回一个coor，二维数组位置
     * 否则返回false
     */
    function getRandomPosition(t){
        //empty保存未空的td的索引，索引从0--15,之所以用总索引数而不是二维数组，因为要用random
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
        }
    }
    function isDead(t){//这个判断死亡的算法好垃圾啊感觉，需要优化。
        if(!getRandomPosition(t)){//判满
            for(var i= t.length-1;i>=0;i--){//判死
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
        }else{
            return false;
        }

    }
    exports.getNewNum = getNewNum;
    exports.isDead = isDead;
});