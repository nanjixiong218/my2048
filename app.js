/**
 * Created by xu on 2014/6/19.
 * 本应用基本不需要后台交互，所以node作为后台仅仅提供下运行环境，所以很多模块都需要用到，整个后台的代码架构也没有
 * 只用了两个文件，一个app.js和frameXu.js。后一个其实也可以不用，因为只是个单页面应用，不要什么mvc。
 * 只是笔者测试自己的小框架。
 */
var http = require("http");
var url = require('url');
var fs = require("fs");
var path = require("path");
var frameXu = require("./frameXu.js");

var action = function(req,res){
    res.render("2048.html",{});
}
frameXu.app.get("/",action);
http.createServer(frameXu.createServerFunction()).listen(8001,'127.0.0.1');
