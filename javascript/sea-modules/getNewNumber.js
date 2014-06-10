/**
 * Created by Administrator on 2014/6/10.
 */

define(function(require,exports,module){
    /**
     * 获得一个随机空位置
     * 返回一个coor，二维数组位置
     */
    var fill = require("fill");
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
        if(emptyNum==0){//死了
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
            alert("you are a pig!");
        }
    }
    exports.getNewNum = getNewNum;
});