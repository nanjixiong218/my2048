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
            this.data.put("4",{text:"b",func:function(){
                //css3d动画
                var span = $("<span >"+this.text+"</span>").addClass("pop1");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },4000);
            }});
            this.data.put("8",{text:"c",func:function(){
                //canvas动画
                $("#myModal").modal({
                    backdrop:true,
                    keyboard:true,
                    show:true
                });
                var canvas = document.getElementById("myCanvas");
                var cxt = canvas.getContext("2d");
                cxt.fillStyle = "blue";
                cxt.fillRect(0,0,100,100);


            }})
            this.data.put("16",{text:"d",func:function(){
                //jquery动画
                var span = $("<span >"+this.text+"</span>").css({
                    "position":"relative",
                    "left":"0",
                    "top":"0",
                    "width":"100px",
                    "height":"100px",
                    "font-size":"200px"
                }).animate({left:"200px"},5000,"easeOutBounce");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },4000);
            }});
            this.data.put("32",{text:"e",func:function(){
                var span = $("<span >"+this.text+"</span>").addClass("pop2");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },4000);
            }});
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
            this.data.put("2",{text:"2",func:function(){$("body").css("background-color","white")}});
            this.data.put("4",{text:"4",func:function(){$("body").css("background-color","#60a917")}});
            this.data.put("8",{text:"8",func:function(){$("body").css("background-color","#00c13f")}});
            this.data.put("16",{text:"16",func:function(){$("body").css("background-color","#1faeff")}});
            this.data.put("32",{text:"32",func:function(){$("body").css("background-color","#56c5ff")}});
            this.data.put("64",{text:"64",func:function(){$("body").css("background-color","#f4b300")}});
            this.data.put("128",{text:"128",func:function(){$("body").css("background-color","#ff7d23")}});
            this.data.put("256",{text:"256",func:function(){$("body").css("background-color","#ff2e12")}});
            this.data.put("512",{text:"512",func:function(){$("body").css("background-color","#ff76bc")}});
            this.data.put("1024",{text:"1024",func:function(){$("body").css("background-color","#e064b7")}});
            this.data.put("2048",{text:"2048",func:function(){$("body").css("background-color","#aa40ff")}});
            this.data.put("4096",{text:"4096",func:function(){$("body").css("background-color","#569ce3")}});
        }
    }
    numTheme.fillData();
    var travelTheme = {
        name:"travel",
        data:new Map(),
        fillData:function(){
            this.data.put("2",{text:"趵突泉",func:function(){document.body.style.backgroundImage="url('static/image/f/0.jpg')"}});//页面总是会闪一下是什么原因？可能需要先把图片下下来，缓存住。
            this.data.put("4",{text:"九寨沟",func:function(){document.body.style.backgroundImage="url('static/image/f/1.jpg')"}});
            this.data.put("8",{text:"丽江",func:function(){document.body.style.backgroundImage="url('static/image/f/2.jpg')"}});
            this.data.put("16",{text:"泰山",func:function(){document.body.style.backgroundImage="url('static/image/f/3.jpg')"}});
            this.data.put("32",{text:"华山",func:function(){$("body").css("background-color","#56c5ff")}});
            this.data.put("64",{text:"嵩山",func:function(){$("body").css("background-color","#f4b300")}});
            this.data.put("128",{text:"龙门石窟",func:function(){$("body").css("background-color","#ff7d23")}});
            this.data.put("256",{text:"白马寺",func:function(){$("body").css("background-color","#ff2e12")}});
            this.data.put("512",{text:"512",func:function(){$("body").css("background-color","#ff76bc")}});
            this.data.put("1024",{text:"1024",func:function(){$("body").css("background-color","#e064b7")}});
            this.data.put("2048",{text:"2048",func:function(){$("body").css("background-color","#aa40ff")}});
            this.data.put("4096",{text:"4096",func:function(){$("body").css("background-color","#569ce3")}});
        }
    }
    travelTheme.fillData();
    Theme.addTheme(charTheme);
    Theme.addTheme(numTheme);
    Theme.addTheme(travelTheme);

    module.exports = Theme;
});
