/**
 * Created by xu on 2014/6/8.
 */
define(function(require,exports,modules){
    var Strategy= require("move");
    function my2048(){

        var table = document.getElementsByTagName("table")[0];
        var t = [];//table对应的二维数组，其中记录了table对应位置的值，这样方便访问，不需要总访问dom
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
        /*var Strategy = (function(){
         var all = {};
         var length = 0;
         return {
         get:function(name){
         if(all[name]){
         return all[name];
         }else{
         throw new Error("没有这个策略！");
         }

         },
         add:function(s){
         if(all[s.name]){
         throw  new Error("此名字的策略已经存在！");
         }
         all[s.name]=s;
         length++;
         },
         getLength:function(){
         return length;
         }
         };
         })();

         var st1 = {
         name:"xu",//这种算法不太好，解决级联合并问题比较困难，而且难以进行抽象
         up:function(){
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
         },
         down:function(){
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
         },
         left:function(){
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
         },
         right:function(){
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
         }
         var st2 = {
         name:"meng",//我女朋友想的算法，没有级联合并问题
         up:function(){//纵向移动就纵向遍历
         for(var j = 0; j<t.length; j++){
         var emptyRow = 0;//记录空行行号
         var mergeRow=0;//记录找到相同数字时的合并行
         var merge = undefined;
         for(var i=0; i< t.length; i++){
         if(t[i][j]==0){//如果是空行，记录当前行号
         continue;
         }else{//如果有数字
         if(merge){//如果merge中已经有数字
         if(merge==t[i][j]){//merge和当前数字相等,merge*2到合并行
         t[mergeRow][j]=merge*2;
         t[i][j]=0;
         merge = undefined;//已经找到两个数字，并进行了匹配，所以merge清空。
         }else{
         t[emptyRow][j]=t[i][j];
         merge=t[i][j];
         mergeRow = emptyRow;
         if(emptyRow!=i){//清空当前行
         t[i][j]=0;
         }
         emptyRow++;

         }

         }else{//merge还没有数字,移动到emptyRow，emptyRow加1
         merge = t[i][j];

         t[emptyRow][j]=merge;
         mergeRow=emptyRow;
         if(emptyRow!=i){
         t[i][j]=0;
         }
         emptyRow++;

         }
         }
         }
         }
         },
         down:function(){
         for(var j = 0; j<t.length; j++){
         var emptyRow = 3;//记录空行行号
         var mergeRow=3;//记录找到相同数字时的合并行
         var merge = undefined;
         for(var i= t.length-1; i>= 0; i--){
         if(t[i][j]==0){//如果是空行，记录当前行号
         continue;
         }else{//如果有数字
         if(merge){//如果merge中已经有数字
         if(merge==t[i][j]){//merge和当前数字相等,merge*2到合并行
         t[mergeRow][j]=merge*2;
         t[i][j]=0;
         merge = undefined;//已经找到两个数字，并进行了匹配，所以merge清空。
         }else{
         t[emptyRow][j]=t[i][j];
         merge=t[i][j];
         mergeRow = emptyRow;
         if(emptyRow!=i){//清空当前行
         t[i][j]=0;
         }
         emptyRow--;

         }

         }else{//merge还没有数字,移动到emptyRow，emptyRow加1
         merge = t[i][j];

         t[emptyRow][j]=merge;
         mergeRow=emptyRow;
         if(emptyRow!=i){
         t[i][j]=0;
         }
         emptyRow--;

         }
         }
         }
         }
         },
         left:function(){
         for(var i = 0; i<t.length; i++){
         var emptyRow = 0;//记录空行行号
         var mergeRow = 0;//记录找到相同数字时的合并行
         var merge = undefined;
         for(var j=0; j< t.length; j++){
         if(t[i][j]==0){//如果是空行，记录当前行号
         continue;
         }else{//如果有数字
         if(merge){//如果merge中已经有数字
         if(merge==t[i][j]){//merge和当前数字相等,merge*2到合并行
         t[i][mergeRow]=merge*2;
         t[i][j]=0;
         merge = undefined;//已经找到两个数字，并进行了匹配，所以merge清空。
         }else{
         t[i][emptyRow]=t[i][j];
         merge=t[i][j];
         mergeRow = emptyRow;
         if(emptyRow!=j){//清空当前行
         t[i][j]=0;
         }
         emptyRow++;

         }

         }else{//merge还没有数字,移动到emptyRow，emptyRow加1
         merge = t[i][j];

         t[i][emptyRow]=merge;
         mergeRow=emptyRow;
         if(emptyRow!=j){
         t[i][j]=0;
         }
         emptyRow++;

         }
         }
         }
         }
         },
         right:function(){
         for(var i = 0; i<t.length; i++){
         var emptyRow = 3;//记录空行行号
         var mergeRow = 3;//记录找到相同数字时的合并行
         var merge = undefined;
         for(var j= t.length-1; j>=0; j--){
         if(t[i][j]==0){//如果是空行，记录当前行号
         continue;
         }else{//如果有数字
         if(merge){//如果merge中已经有数字
         if(merge==t[i][j]){//merge和当前数字相等,merge*2到合并行
         t[i][mergeRow]=merge*2;
         t[i][j]=0;
         merge = undefined;//已经找到两个数字，并进行了匹配，所以merge清空。
         }else{
         t[i][emptyRow]=t[i][j];
         merge=t[i][j];
         mergeRow = emptyRow;
         if(emptyRow!=j){//清空当前行
         t[i][j]=0;
         }
         emptyRow--;

         }

         }else{//merge还没有数字,移动到emptyRow，emptyRow加1
         merge = t[i][j];

         t[i][emptyRow]=merge;
         mergeRow=emptyRow;
         if(emptyRow!=j){
         t[i][j]=0;
         }
         emptyRow--;
         }
         }
         }
         }
         }
         }
         Strategy.add(st1);
         Strategy.add(st2);
         */

        initT();
        getNewNum();
        document.onkeyup=keyupEvent;


        function keyupEvent(event){
            var event = event?event:window.event;
            var target = event.target?event.target:event.srcElement;
            var keycode = event.which?event.which:event.keyCode?event.keyCode:event.charCode;

            switch(keycode){
                case 37:Strategy.get("meng").left();fill();getNewNum();break;
                case 38:Strategy.get("meng").up();fill();getNewNum();break;
                case 39:Strategy.get("meng").right();fill();getNewNum();break;
                case 40:Strategy.get("meng").down();fill();getNewNum();break;
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
    exports.my2048 = my2048;
});

