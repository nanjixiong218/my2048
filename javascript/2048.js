/**
 * Created by xu on 2014/6/8.
 */

function my2048(){

    var table = document.getElementsByTagName("table")[0];
    var t = [];//table对应的二维数组，其中记录了table对应位置的值，这样方面访问，不需要总访问dom
    var i=0;
    var j=0;
//var colorBases=['00','33','66','99','aa','ff'];
    /* for(var i=0;i<colorBases.length;i++){
     for(var j=0;j<colorBases.length;j++){
     for(var k=0;k<colorBases.length;k++){
     colors.push("#"+colorBases[i]+colorBases[j]+colorBases[k]);
     }

     }
     }
     */
    var colors=["#ffffff","#fafad2","#f5deb3","#f0e68c",
        "#f4a460","#d2691e","#ffa500","#ffd700",
        "#ffff00","#ffa07a","#ff7f50","#ff4500","#ff0000"];
    initT();
    getNewNum();
    document.onkeyup=keyupEvent;


    function keyupEvent(event){
        var event = event?event:window.event;
        var target = event.target?event.target:event.srcElement;
        var keycode = event.which?event.which:event.keyCode?event.keyCode:event.charCode;

        switch(keycode){
            case 37:left();fill();getNewNum();break;
            case 38:up();fill();getNewNum();break;
            case 39:right();fill();getNewNum();break;
            case 40:down();fill();getNewNum();break;
        }
    }
    /**
     * 向上的时候触发的事件
     */
    function up(){
        var flag;//向上查找是否找到有值的td标记位
        for(var i=0;i< t.length;i++){//从性能出发，i=1开始遍历即可
            for(var j=0;j<t[i].length;j++){
                flag=0;
                if(t[i][j]!=0){
                    var temp =i;//记录当前行
                    while(temp!=0){

                        if(flag){
                            break;
                        }
                        if(t[temp-1][j]!=0){
                            flag=1;//第一次找到,设为1，不再继续查找
                            if(t[temp-1][j]==t[i][j]){
                                t[temp-1][j]=t[temp-1][j]*2;
                                t[i][j]=0;
                            }else{
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[temp][j]=temp1;
                            }
                        }else{
                            if(temp==1){
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[temp-1][j]=temp1;
                            }else{

                            }
                        }
                        temp--;
                    }
                }
            }
        }
    }
    /**
     * 向下的时候触发的事件
     */
    function down(){
        var flag;//向下查找是否找到有值的td标记位
        for(var i=t.length-1;i>=0;i--){//从性能出发，i=1开始遍历即可
            for(var j=t[i].length-1;j>=0;j--){
                flag=0;
                if(t[i][j]!=0){
                    var temp =i;//记录当前行
                    while(temp!=3){

                        if(flag){
                            break;
                        }
                        if(t[temp+1][j]!=0){
                            flag=1;//第一次找到,设为1，不再继续查找
                            if(t[temp+1][j]==t[i][j]){
                                t[temp+1][j]=t[temp+1][j]*2;
                                t[i][j]=0;
                            }else{
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[temp][j]=temp1;
                            }
                        }else{
                            if(temp==2){
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[temp+1][j]=temp1;
                            }else{

                            }
                        }
                        temp++;
                    }
                }
            }
        }
    }
    /**
     * 向左的时候触发的事件
     */
    function left(){
        var flag;//向左查找是否找到有值的td标记位
        for(var j=0;j< t.length;j++){//从性能出发，i=1开始遍历即可
            for(var i=0;i<t[j].length;i++){
                flag=0;
                if(t[i][j]!=0){
                    var temp =j;//记录当前行
                    while(temp!=0){

                        if(flag){
                            break;
                        }
                        if(t[i][temp-1]!=0){
                            flag=1;//第一次找到,设为1，不再继续查找
                            if(t[i][temp-1]==t[i][j]){
                                t[i][temp-1]=t[i][temp-1]*2;
                                t[i][j]=0;
                            }else{
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[i][temp]=temp1;
                            }
                        }else{
                            if(temp==1){
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[i][temp-1]=temp1;
                            }else{

                            }
                        }
                        temp--;
                    }
                }
            }
        }
    }
    /**
     * 向右的时候触发的事件
     */
    function right(){
        var flag;//向右查找是否找到有值的td标记位
        for(var j=t.length-1;j>=0;j--){//从性能出发，i=1开始遍历即可
            for(var i=t[j].length-1;i>=0;i--){
                flag=0;
                if(t[i][j]!=0){
                    var temp =j;//记录当前行
                    while(temp!=3){

                        if(flag){
                            break;
                        }
                        if(t[i][temp+1]!=0){
                            flag=1;//第一次找到,设为1，不再继续查找
                            if(t[i][temp+1]==t[i][j]){
                                t[i][temp+1]=t[i][temp+1]*2;
                                t[i][j]=0;
                            }else{
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[i][temp]=temp1;
                            }
                        }else{
                            if(temp==2){
                                var temp1= t[i][j];//这一步是为了防止相邻航
                                t[i][j]=0;
                                t[i][temp+1]=temp1;
                            }else{

                            }
                        }
                        temp++;
                    }
                }
            }
        }
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
    }

    /**
     * 获得一个随机空位置
     * 返回一个coor，二维数组位置
     */
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
    }
    /**
     * 产生一个新的数字2
     *
     */
    function getNewNum(){
        var coor = getRandomPosition(t);
        if(coor){
            setCoorTest(coor,2);
        }else{
            alert("you are a pig!");
        }
    }
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

    /**
     * 设置对应位置的td的值
     * @param coor
     */
    function setCoorTest(coor,num){
        var i=coor[0];
        var j=coor[1];
        var target = table.rows[i].cells[j];
        t[i][j]=num;
        target.textContent=num;
        var pow =Math.log(num)/Math.log(2);
        target.style.backgroundColor=colors[pow];
    }

    /**
     * 用t填充table
     */
    function fill(){
        for(var i=0;i< t.length;i++){
            for(var j=0;j<t[i].length;j++){
                var target = table.rows[i].cells[j];
                var num = t[i][j];
                var pow = Math.log(num)/Math.log(2);
                if(t[i][j]!=0){
                    target.textContent=t[i][j];
                    target.style.backgroundColor=colors[pow];

                }else{
                    target.textContent='';
                    target.style.backgroundColor=colors[0];
                }
            }
        }
    }
}
