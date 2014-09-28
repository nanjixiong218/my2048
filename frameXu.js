var url = require('url');
var fs = require("fs");
var path = require("path");
var mime = require("./mime").types;
var files = {};//文件缓存
var cache = {};//缓存，可以替换成高级点的缓存模块
var VIEWS_FOLDER = './';//使用绝对路径还是不行
//配置路由映射
var routes={
    all:[]
};
//路由
var app={};
var middles={};
middles["cookie"]=cookie;
middles["querystring"]=querystring;
/**
 * RESTful分配
 */
['get','post','delete','put'].forEach(function(method){
    routes[method] = [];
    app[method] = function(path,action){
        var handle;
        if(typeof path =="string"){//如果第一个参数是字符串说明是路径，后面的是中间件
            handle = {
                path:pathRegexp(path),
                stack:Array.prototype.slice.call(arguments,1)
            };
        }else{//如果第一个参数不是字符串，那就全当中间件处理,并且把path设为访问根路径
            handle = {
                path:pathRegexp("/"),
                stack:Array.prototype.slice.call(arguments,0)
            };
        }
        routes[method].push(handle);
    }
});
app.use = use;
/**
 * 这个方法应该主要用于配置全局中间件，即任何访问都会用到的中间件，但是这里的实现还有问题，需要修改。
 * @param path
 * @param action
 */
function use(path) {
    var handle;
    if (typeof path == "string") {//如果第一个参数是字符串说明是路径，后面的是中间件
        handle = {
            path: pathRegexp(path),
            stack: Array.prototype.slice.call(arguments, 1)
        };
    } else {//如果第一个参数不是字符串，那就全当中间件处理,并且把path设为访问根路径
        handle = {
            path: pathRegexp("/"),
            stack: Array.prototype.slice.call(arguments, 0)
        };
    }
    routes.all.push(handle);
};


function createServerFunction() {

    return function frameXU(req,res) {
        res.render = render;

        //
        var pathname = url.parse(req.url).pathname;
        console.log(pathname);
        var realPath = "public"+pathname;
        console.log(realPath);
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        console.log(ext);
        if(ext=="unknown"){
            route();
        }else{
            path.exists(realPath, function (exists) {
                console.log(exists);

                if (!exists) {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write("This request URL " + pathname + " was not found on this server.");
                    res.end();
                } else {
                    fs.readFile(realPath, "binary", function (err, file) {

                        if (err) {
                            res.writeHead(500, {//500是什么错误
                                'Content-Type': 'text/plain'
                            });

                            res.end(err);
                        } else {
                            var contentType = mime[ext] || "text/plain";
                            res.writeHead(200, {'Content-Type': contentType});
                            console.log(contentType);
                            res.write(file,"binary");
                            res.end();
                        }
                    });
                }
            });

        }




    //路由匹配，分发处理
        //route();
    //处理不了才会执行到这，用try catch更合理一点
        //handle404(req, res);
        /**
         * 第一个完整版渲染引擎,把它放在了createServer里面形成了一个闭包，这样才能访问到res，是不是不太好，
         * 最好是用中间件形式
         * @param viewname
         * @param data
         */
        function render(viewname, data) {
            var layout = data.layout;
            if (layout) {
                if (!cache[layoout]) {
                    try {
                        cache[layout] = fs.readFileSync(path.join(VIEWS_FOLDER, layout), 'utf-8');
                    }
                    catch (e) {
                        res.writeHead(500, {'Content-Type': 'text/html'});
                        res.end('layout file failed download ！');
                        return;
                    }
                }
            }
            var layoutContent = cache[layout] || '<%-body%>';//如果没有指定布局文件，那么布局文件直接就是这个字符串
            var text = '';
            try {
                text = renderlayout(layoutContent, viewname);
            } catch (e) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('template file failed download!');//如何解决中文乱码问题
                return;
            }
            var key = viewname + ':' + layout;
            cache[key] = compile(text);

            var compiled = cache[key];
            res.writeHead(200, {'Content-Type': 'text/html'});
            var html = compiled(data, escape);
            res.end(html);
        };
        /**
         * 路由分发部分
         */
        function route() {
            var pathname = url.parse(req.url).pathname;
            var method = req.method.toLowerCase();
            var stacks = match(pathname, routes.all);//这样的话，如果在use中设置了action，get，post等中设置的action将不会执行到
            if (routes.hasOwnProperty(method)) {//写了中间件这个位置代码简化很多
                stacks = stacks.concat(match(pathname, routes[method]));
            }
            ;
            if (stacks.length) {
                handleMiddle(req, res, stacks);
            } else {
                handle404(req, res);
            }

        };
        /**
         * 访问路径与路由中设定的路径进行匹配，并且获取参数值附加到req上
         * @param pathname  访问路径，比如user/mengying
         * @param routes  一个包含对应访问方式的所有处理对象，是一个数组。比如routes.all，routes.get,route.delete等中所包含的数组
         */
        function match(pathname, routes) {
            var stacks = [];
            for (var i = 0; i < routes.length; i++) {//遍历这个数组中的所有handler
                var route = routes[i];
                var keys = route.path.keys;
                var reg = route.path.regexp;
                var matched = reg.exec(pathname);
                if (matched) {
                    var params = {};
                    for (var i = 0; i < keys.length; i++) {
                        var value = matched[i + 1];
                        if (value) {
                            params[keys[i]] = value;
                        }
                    };
                    //将中间件交给handle方法处理
                    req.params = params;
                    stacks = stacks.concat(route.stack);
                }
            }
            return stacks;
        };

        /**
         * 用于处理中间件的方法,这个方法很不错
         * 即便放在了里面，还是把req和res传递一下比较好
         */
        function handleMiddle(req, res, stack) {
            var next = function () {
                var middleWare = stack.shift();
                if (middleWare) {
                    //传入next使其能够递归调用，这也是编写中间件是必须写next参数，并在最后调用next（）的原因。
                    middleWare(req, res, next);
                }
            };
            next();
        };
        /**
         *处理404错误
         * 放在了里面可以不传递req和res
         *
         **/
        function handle404() {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('404Wrong!');
        }
    }
};


/**
 * function放在frameXu的里面和外面的区别。
 * 放在里面是frameXU私有的，并且可以直接访问req和res
 * 放在外面，不知道是不是就能够被外部访问到了，而且如果用到req和res如要传递,哪些需要放在里面，哪些需要放在外面，需要思考。
 * 比如use方法就需要放在外面让人调用去配置路由，但是可能会残生方法覆盖，这时候恐怕就要引入名字空间了。
 *
 */



/**
 *路由解析的正则匹配
 **/
function pathRegexp(path) {//这个正则部分搞得不是很清楚
    var keys = [];
    // path = path.concat(strict?'':'/?');
    path = path.replace(/\/\(/g, '(?:/');
    path = path.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture, optional, star) {
        keys.push(key);
        slash = slash || '';
        return ''
            + (optional ? '' : slash)
            + '(?:'
            + (optional ? slash : '')
            + (format || '')
            + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
            + (optional || '')
            + (star ? '(/*)?' : '')
    });
    path = path.replace(/([\/.])/g, '\\$1');
    path = path.replace(/\*/g, '(.*)');
    return {
        keys: keys,
        regexp: new RegExp('^' + path + '$')
    };
};




/**
 *布局视图功能
 * @param str 布局视图文件
 * @param viewname 模板文件
 * @returns {XML|string|void}最终模板字符串
 */
function renderlayout(str, viewname) {
    return result = str.replace(/<%-\s*body\s*%>/g, function (match) {
        if (!cache[viewname]) {
            cache[viewname] = fs.readFileSync(path.join(VIEWS_FOLDER, viewname), 'utf-8');
        }
        return cache[viewname];
    });
}
/**
 * 预编译
 * 将模板字符串中的include标签替换为子模板
 * @param str 模板字符串
 */

function preCompile(str) {
    var replaced = str.replace(/<%\s+(include\s+.*)\s+%>/g, function (match, $1) {
        var partial = $1.split(/\s/)[1];
        if (!files[partial]) {
            files[partial] = fs.readFileSync(path.join(VIEWS_FOLDER, partial), 'utf-8');
        }
        return files[partial];
    });
    //多层嵌套
    if (str.match(/<%\s+(include *)\s+%>/g)) {
        return preCompile(replaced);
    } else {
        return replaced;
    }
}
/**
 * 模板编译函数：最重要的函数，将模板字符串中的特殊标签进行替换并生成中间函数
 * 中间函数：一个能够接收数据并生成最终html文本的函数
 * @param str 模板字符串
 * @returns {Function}
 */
function compile(str) {
    str = preCompile(str);
    var tpl = str.replace(/[\n\r]/g, '\\n')//替换所有换行符
        .replace(/'/g, '\\\'')             // 替换单引号
        .replace(/<%=([\s\S]+?)%>/g,function (match, $1) {
            return "'+escape(" + $1 + ")+'";
        }).replace(/<%-([\s\S]+?)%>/g,function (match, $1) {
            return "'+" + $1 + "+'";
        }).replace(/<%([\s\S]+?)%>/g, function (match, $1) {
            return "';\n" + $1 + "\ntpl+='";
        });
    tpl = tpl.replace(/\'\n/g, '\'');
    tpl = tpl.replace(/\n\'/gm, '\'');
    tpl = "tpl = '" + tpl + "';";
    tpl = tpl.replace(/''/g, '\'\\n\'');
    tpl = "var tpl = '';\nwith(obj||{}){\n" + tpl + "\n}\nreturn tpl;";
    return new Function('obj,escape', tpl);
}
/*
 *加入xss安全防护，即使用escape进行转移。
 */
function escape(html){
    return String(html).replace(/&(?!\w+;)/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gl;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#39');//ie下不支持&apos;（单引号）转义
}
/**
 * 中间件
 */
function querystring(req, res, next) {
    req.querystring = url.parse(req.url,true).query;
    next();
}
function cookie(req, res, next) {
    var cookie = req.headers.cookie;
    var cookies = {};
    if (cookie) {
        var list = cookie.split(";");
        for (var i = 0; i < list.length; i++) {
            var pair = list[i].split("=");
            cookies[pair[0].trim()] = pair[1];
        }
    }
    req.cookie = cookies;
    next();
};

function frameXu(){
    this.app=app;
    this.middles = middles;
};
frameXu.prototype = {
    createServerFunction: createServerFunction
};

module.exports = new frameXu();

