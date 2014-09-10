/**
 * 本模块是2048的移动算法
 * 和Theme一样暴露一个Strategy工厂
 * 每个策略中还写了一个isChanged判断是否产生了移动，今儿进而判断是否需要新生成数字，
 * 不应该把它划分在这里，需要改进。
 */
define(function(require,exports,module){
    //var config = require("config");//这样将出现嵌套require，页面直接卡死
    //var oldT = config.oldT;
    var Strategy = (function(){
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
        name:"orc",//这种算法不太好，解决级联合并问题比较困难，而且难以进行抽象
        up:function(t){
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
        down:function(t){
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
        left:function(t){
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
        right:function(t){
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
        },
        isChanged:function(t,oldT){
            for(var i=0;i< t.length;i++){
                for(var j=0;j< t.length;j++){
                    if(t[i][j]!=oldT[i][j]){
                        return true;
                    }
                }
            }
            return false;
        }
    };
    var st2 = {
        name:"one",//我女朋友想的算法，没有级联合并问题
        up:function(t){//纵向移动就纵向遍历
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
        down:function(t){
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
        left:function(t){
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
        right:function(t){
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
        },
        isChanged:function(t,oldT){
            for(var i=0;i< t.length;i++){
                for(var j=0;j< t.length;j++){
                    if(t[i][j]!=oldT[i][j]){
                        return true;
                    }
                }
            }

            return false;
        }
    }
    Strategy.add(st1);
    Strategy.add(st2);

    module.exports = Strategy;
});


