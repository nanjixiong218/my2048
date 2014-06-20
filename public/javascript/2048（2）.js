/**
 * 另一种移动合并算法，解决级联合并问题。
 * Created by Administrator on 2014/6/8.
 */

function up1(){//纵向移动就纵向遍历
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
}
