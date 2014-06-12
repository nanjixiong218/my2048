/**
 * Created by xu695_000 on 2014/6/12.
 */

define(function(require,exports,module){
    function Map(){
        this.data = {};
        this.length=this.size();
    }
    Map.prototype.put = function (key,value){
        this.data[key] = value;
    };
    Map.prototype.get = function(key){
        return this.data[key];
    };
    Map.prototype.remove = function(key){
        delete this.data[key];
    }
    Map.prototype.size = function(){
        var count=0;
        for(property in this.data){
            if(this.data.hasOwnProperty(property)){
                count++;
            }
        }
        this.length = count;
        return this.length;
    }


    var Theme = (function(){
        var all={};
        var length=0;
        return {
            getTheme:function(theme){
                if(all[theme]){
                    return all[theme];
                }else{
                    throw new Error("没有这个主题");
                }

            },
            addTheme:function(t){
                if(all[t.name]){
                    throw new Error("这个主题的名字已经存在");
                }else{
                    all[t.name]=t;
                    length++;
                }
            },
            getLenght:function(){
                return length;
            }
        }
    })();
    charTheme = {
        name:"char",
        data:new Map(),
        fillData:function(){
            this.data.put("2",{text:"a",func:function(){}});
            this.data.put("4",{text:"b",func:function(){}});
            this.data.put("8",{text:"c",func:function(){}});
            this.data.put("16",{text:"d",func:function(){}});
            this.data.put("32",{text:"e",func:function(){}});
            this.data.put("64",{text:"f",func:function(){}});
            this.data.put("128",{text:"g",func:function(){}});
            this.data.put("256",{text:"h",func:function(){}});
            this.data.put("512",{text:"i",func:function(){}});
            this.data.put("1024",{text:"j",func:function(){}});
            this.data.put("2048",{text:"k",func:function(){}});
            this.data.put("4096",{text:"l",func:function(){}});
        }
    }
    charTheme.fillData();
    numTheme = {
        name:"num",
        data:new Map(),
        fillData:function(){
            this.data.put("2",{text:"2",func:function(){}});
            this.data.put("4",{text:"4",func:function(){}});
            this.data.put("8",{text:"8",func:function(){}});
            this.data.put("16",{text:"16",func:function(){}});
            this.data.put("32",{text:"32",func:function(){}});
            this.data.put("64",{text:"64",func:function(){}});
            this.data.put("128",{text:"128",func:function(){}});
            this.data.put("256",{text:"256",func:function(){}});
            this.data.put("512",{text:"512",func:function(){}});
            this.data.put("1024",{text:"1024",func:function(){}});
            this.data.put("2048",{text:"2048",func:function(){}});
            this.data.put("4096",{text:"4096",func:function(){}});
        }
    }
    numTheme.fillData();
    Theme.addTheme(charTheme);
    Theme.addTheme(numTheme);

    module.exports = Theme;
});
