define(function(require,exports,module){
    var Theme = require("theme");
    var Strategy = require("strategy");
    module.exports = {
        "border":"solid #ffffff 10px",
        "bgcolor":"#000",
        "strategy":Strategy.get("xu"),
        "theme":Theme.getTheme("num"),
        setBorder:function(border){
            this.border=border;
        },
        setBgcolor:function(bgcolor){
            this.bgColor = bgcolor;
        },
        setStrategy:function(startegy){
            this.strategy = Strategy.get(startegy);;
        },
        setTheme:function(theme){
            this.theme = Theme.getTheme(theme);
        }

    }
})
