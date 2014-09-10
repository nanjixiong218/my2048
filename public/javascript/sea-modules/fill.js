/**
 * 这里封装了fill方法用来二维数组t来填充页面table。
 * 同时，在fill之后对score的计算已经是否进行动画和动画的触发也写在fill当中
 * 以后有待分离。
 * 模块暴露接口有两个，一个fill
 * 还有一个setCoorTest，这个接口是产生随机数的时候填充某个单元格用的
 */
define(function(require,exports,module){
    var config = require("config");
    var colors=["#ffffff","#fafad2","#f5deb3","#f0e68c",
        "#f4a460","#d2691e","#ffa500","#ffd700",
        "#ffff00","#ffa07a","#ff7f50","#ff4500","#ff0000"];


    /**
     * 用t填充table
     */
    function fill(t,table){
        var theme = config.theme;
        for(var i=0;i< t.length;i++){
            for(var j=0;j<t[i].length;j++){
                var target = table.rows[i].cells[j];
                var num = t[i][j];
                var pow = Math.log(num)/Math.log(2);
                if(t[i][j]!=0){
                    //textContent这个属性肯定兼容性有问题TODO
                    target.textContent=theme.data.get(t[i][j]).text;
                    target.style.backgroundColor=colors[pow];
                }else{
                    target.textContent='';
                    target.style.backgroundColor=colors[0];
                }
            }
        }
        document.getElementById("score").innerHTML=getScore(t);
        if(isAnimate(t)){
            theme.data.get(getMax(t).num).func();
        }
    }
    /**
     * 设置对应位置的td的值
     * @param coor
     */
    function setCoorTest(t,table,coor,num){
        var theme = config.theme;
        var i=coor[0];
        var j=coor[1];
        var target = table.rows[i].cells[j];
        t[i][j]=num;
        target.textContent=theme.data.get(t[i][j]).text;
        var pow =Math.log(num)/Math.log(2);
        target.style.backgroundColor=colors[pow];
    }

    /**
     * 判断是否触发动画，查找当前最大的值，如果最大值是第一次出现，就返回true
     * @param t
     * @returns {boolean}
     */

    function isAnimate(t){
        var oldMax = config.oldMax;
        var max = getMax(t);
        if(max.num>oldMax){
            config.setOldMax(max.num);
            return true;
        }
        return false;

    }
    /**
     * 获取最大的数，返回值是个对象，包括这个最大的数和它出现的次数
     * @param t
     * @returns {{num: number, count: number}}//count暂时没用到，留给以后扩展程序功能时用
     */
    function getMax(t){
        var result = 0;
        var count = 0;
        for(var i=0;i< t.length;i++)//查找最大的元素
            for(var j=0;j< t.length;j++){
                if(t[i][j]>result){
                    result = t[i][j];
                }
            }
        for(var i=0;i< t.length;i++)//计算最大的元素出现的次数
            for(var j=0;j< t.length;j++){
                if(t[i][j]==result){
                    count++;
                }
            }
        return {num:result,count:count};
    }

    /**
     * 计算得分
     * @param t
     */
    function getScore(t){
        var score = 0 ;
        for(var i=0;i< t.length;i++)
            for(var j=0;j< t.length;j++){
                score+=t[i][j];
            }
        return score;

    }


    exports.fill=fill;
    exports.setCoorTest = setCoorTest;
});