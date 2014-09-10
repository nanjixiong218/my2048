/**
 * 主体模块
 * 用闭包写了一个Theme对象最为主体工厂，并暴露出去。
 * Theme暴露了三个接口，getTheme,setTheme和getLength
 *
 */

define(function(require,exports,module){
    //自己写了一个类似java的Map容器,其实没有必要，js的普通对象就是Map，这里是写着玩的。
        function Map(){
        this.data = {};
        this.length=this.size();
    };
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
            getLength:function(){
                return length;
            }
        }
    })();
    //下面都是不同的主题设计，每个主题是一个拥有统一接口的对象。
    // 每个主题有一个name属性表示主题的名字，
    // 有一个data属性，是一个Map对象，保存着主题2-2048的文本已经对应动画效果，
    // 想要写一个主题很容易，只需要换个名字，改变主题的fileData方法即可。
    // 暴露fillData接口是为了后续提供给开发者开发自己主题的，这样的设计好像不太好，需要仔细思考!可以写一个createTheme的方法。
    var charTheme = {
        name:"char",
        data:new Map(),
        fillData:function(){
            this.data.put("2",{text:"a",func:function(){
            }});
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
                var canvasDiv = document.getElementById("canvasDiv");
                var canvas = document.getElementById("myCanvas");
                var cxt = canvas.getContext("2d");
                canvasDiv.style.display="block";
                cxt.font="200px Times New Roman";
                var width=0;
                var height=canvas.height/2;
                var interval = setInterval(function(that){
                    return function draw(){
                        // cxt.clearRect(0,0,canvas.width,canvas.height);
                        cxt.fillText(that.text,width++,height++);
                    }
                }(this),30);

                setTimeout(function(){
                    clearInterval(interval);
                    canvasDiv.style.display="none";
                },4000);


            }});
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
                },5000);
            }});
            this.data.put("32",{text:"e",func:function(){
                //css3d动画
                var span = $("<span >"+this.text+"</span>").addClass("pop2");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },4000);
            }});
            this.data.put("64",{text:"f",func:function(){
                //jquery动画
                var span = $("<span >"+this.text+"</span>").css({
                    "position":"relative",
                    "left":"0",
                    "top":"0",
                    "width":"100px",
                    "height":"100px",
                    "font-size":"200px"
                }).animate({left:"200px"},3000,"easeInElastic").animate({left:"0px"},3000,"easeOutElastic");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },8000);
            }});
            this.data.put("128",{text:"g",func:function(){
                //canvas动画
                var canvasDiv = document.getElementById("canvasDiv");
                var canvas = document.getElementById("myCanvas");
                var cxt = canvas.getContext("2d");
                canvasDiv.style.display="block";
                cxt.font="200px Times New Roman";

                var interval = setInterval(function(that){
                    return function draw(){
                        cxt.clearRect(0,0,canvas.width,canvas.height);
                        cxt.fillText(that.text,Math.random()*canvas.width|0,Math.random()*canvas.height|0);
                    }
                }(this),30);

                setTimeout(function(){
                    clearInterval(interval);
                    canvasDiv.style.display="none";
                },4000);
            }});
            this.data.put("256",{text:"h",func:function(){
                //css3d动画
                var span = $("<span >"+this.text+"</span>").addClass("pop3");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },4000);
            }});
            this.data.put("512",{text:"i",func:function(){
                //css3d动画
                var span = $("<span >"+this.text+"</span>").addClass("pop4");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },5000);
            }});
            this.data.put("1024",{text:"j",func:function(){
                var span = $("<span >"+this.text+"</span>").addClass("pop5");
                $("#pop").append(span).show();
                setTimeout(function(){
                    $("#pop").html("");
                    $("#pop").hide();
                },4000);
            }});
            this.data.put("2048",{text:"k",func:function(){
                var canvasDiv = document.getElementById("canvasDiv");
                var canvas = document.getElementById("myCanvas");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                var cxt = canvas.getContext("2d");
                canvasDiv.style.display="block";
                cxt.font="20px Georgia";
                var gradient=cxt.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0,"magenta");
                gradient.addColorStop(0.5,"blue");
                gradient.addColorStop(1.0,"red");
                cxt.textAlign = "center";
                cxt.textBaseline = "middle";
                cxt.fillStyle = gradient;
                var size = 20;
                var interval = setInterval(function (){
                        cxt.clearRect(0,0,canvas.width,canvas.height);
                        cxt.font=size+"px Times New Roman";
                        size+=0.1;
                        cxt.fillText("恭喜你，大神，通关成功了！",canvas.width/2|0,canvas.height/2|0);
                    }
                    ,1);
                setTimeout(function(){
                    clearInterval(interval);
                    canvasDiv.style.display="none";
                },4000);

            }});
        }
    };
    charTheme.fillData();
    var numTheme = {
        name:"num",
        data:new Map(),
        fillData:function(){
            this.data.put("2",{text:"2",func:function(){
                $("body").css("background-color","#aa40ff");
                //canvas动画
                var canvasDiv = document.getElementById("canvasDiv");
                var canvas = document.getElementById("myCanvas");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                var cxt = canvas.getContext("2d");
                canvasDiv.style.display="block";
                cxt.font="20px Georgia";
                var gradient=cxt.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop("0","magenta");
                gradient.addColorStop("0.5","blue");
                gradient.addColorStop("1.0","red");
                cxt.fillStyle = gradient;
                cxt.fillText("恭喜你，大神，通关成功了！",20,canvas.height/2|0);
            }});
            this.data.put("4",{text:"4",func:function(){
                $("body").css("background-color","#00cf3f");
            }});
            this.data.put("8",{text:"8",func:function(){$("body").css("background-color","#00c13f")}});
            this.data.put("16",{text:"16",func:function(){$("body").css("background-color","#1faeff")}});
            this.data.put("32",{text:"32",func:function(){$("body").css("background-color","#56c5ff")}});
            this.data.put("64",{text:"64",func:function(){$("body").css("background-color","#f4b300")}});
            this.data.put("128",{text:"128",func:function(){$("body").css("background-color","#ff7d23")}});
            this.data.put("256",{text:"256",func:function(){$("body").css("background-color","#ff2e12")}});
            this.data.put("512",{text:"512",func:function(){$("body").css("background-color","#ff76bc")}});
            this.data.put("1024",{text:"1024",func:function(){$("body").css("background-color","#e064b7")}});
            this.data.put("2048",{text:"2048",func:function(){
                $("body").css("background-color","#fa10fc");
                //通关成功canvas动画
                var canvasDiv = document.getElementById("canvasDiv");
                var canvas = document.getElementById("myCanvas");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                var cxt = canvas.getContext("2d");
                canvasDiv.style.display="block";
                cxt.font="20px Georgia";
                var gradient=cxt.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0,"magenta");
                gradient.addColorStop(0.5,"blue");
                gradient.addColorStop(1.0,"red");
                cxt.textAlign = "center";
                cxt.textBaseline = "middle";
                cxt.fillStyle = gradient;
                var size = 20;
                var interval = setInterval(function (){
                        cxt.clearRect(0,0,canvas.width,canvas.height);
                        cxt.font=size+"px Times New Roman";
                        size+=0.1;
                        cxt.fillText("恭喜你，大神，通关成功了！",canvas.width/2|0,canvas.height/2|0);
                    }
                    ,1);
                setTimeout(function(){
                    clearInterval(interval);
                    canvasDiv.style.display="none";
                },4000);
            }});
        }
    };
    numTheme.fillData();
    var travelTheme = {
        name:"travel",
        data:new Map(),
        fillData:function(){
            this.data.put("2",{text:"趵突泉",func:function(){document.body.style.backgroundImage="url('static/image/scene/btq.jpg')"}});//页面总是会闪一下是什么原因？可能需要先把图片下下来，缓存住。
            this.data.put("4",{text:"九寨沟",func:function(){document.body.style.backgroundImage="url('static/image/scene/jzg.jpg')"}});
            this.data.put("8",{text:"丽江",func:function(){document.body.style.backgroundImage="url('static/image/scene/lj.jpg')"}});
            this.data.put("16",{text:"泰山",func:function(){document.body.style.backgroundImage="url('static/image/scene/ts.jpg')"}});
            this.data.put("32",{text:"断桥",func:function(){document.body.style.backgroundImage="url('static/image/scene/dq.jpg')"}});
            this.data.put("64",{text:"黄山",func:function(){document.body.style.backgroundImage="url('static/image/scene/hs.jpg')"}});
            this.data.put("128",{text:"龙门石窟",func:function(){document.body.style.backgroundImage="url('static/image/scene/lmsk.jpg')"}});
            this.data.put("256",{text:"西溪湿地",func:function(){document.body.style.backgroundImage="url('static/image/scene/xixi.jpg')"}});
            this.data.put("512",{text:"凤凰山",func:function(){document.body.style.backgroundImage="url('static/image/scene/fhs.jpg')"}});
            this.data.put("1024",{text:"大理",func:function(){document.body.style.backgroundImage="url('static/image/scene/dl.jpg')"}});
            this.data.put("2048",{text:"天堂",func:function(){
                document.body.style.backgroundImage="url('static/image/scene/tt.jpg')";

                var canvasDiv = document.getElementById("canvasDiv");
                var canvas = document.getElementById("myCanvas");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                var cxt = canvas.getContext("2d");
                canvasDiv.style.display="block";
                cxt.font="20px Georgia";
                var gradient=cxt.createLinearGradient(0,0,canvas.width,0);
                gradient.addColorStop(0,"magenta");
                gradient.addColorStop(0.5,"blue");
                gradient.addColorStop(1.0,"red");
                cxt.textAlign = "center";
                cxt.textBaseline = "middle";
                cxt.fillStyle = gradient;
                var size = 20;
                var interval = setInterval(function (){
                        cxt.clearRect(0,0,canvas.width,canvas.height);
                        cxt.font=size+"px Times New Roman";
                        size+=0.1;
                        cxt.fillText("恭喜你，大神，通关成功了！",canvas.width/2|0,canvas.height/2|0);
                    }
                    ,1);
                setTimeout(function(){
                    clearInterval(interval);
                    canvasDiv.style.display="none";
                },4000);
            }});
        }
    };
    travelTheme.fillData();
    Theme.addTheme(charTheme);
    Theme.addTheme(numTheme);
    Theme.addTheme(travelTheme);

    module.exports = Theme;
});
