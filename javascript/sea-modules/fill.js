/**
 * Created by Administrator on 2014/6/10.
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
                    target.textContent=theme.data.get(t[i][j]).text;
                    target.style.backgroundColor=colors[pow];
                }else{
                    target.textContent='';
                    target.style.backgroundColor=colors[0];
                }
            }
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



    exports.fill=fill;
    exports.setCoorTest = setCoorTest;
});