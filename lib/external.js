/*prettydiff.com api.topcoms:true,api.insize:4,api.inchar:" ",api.vertical:true */
/*jshint laxbreak: true*/
/*global node: true*/
/***********************************************************************
 This external library is written by Austin Cheney on 7 Jul 2016.
 Anybody may use this code without permission so long as this comment
 exists verbatim in each instance of its use.

 http://mailmarkup.org/
 http://prettydiff.com/
 **********************************************************************/
/* A simple bridge from the various Pretty Diff parsers to external
   third party applications */
var external = function external(data) {
    "use strict";
    //API:
    //callback - a function to perform once all child tasks are complete
    //command - the child process to execute
    //items - a list of token indexes to process
    //token - complete token list
    var child = require("child_process").exec,
        a = 0,
        len = 0,
        input = "",
        fail = function external__fail(text) {
            console.log(text);
            process.exit(1);
        };
    if (data.tokens === undefined || typeof data.tokens === "string" || data.tokens.length === undefined || data.tokens.length < 1) {
        fail("data.tokens of lib/external.js is empty or missing");
    }
    if (data.items === undefined || typeof data.items === "string" || data.items.length === undefined || data.items.length < 1) {
        fail("data.items of lib/external.js is empty or missing");
    }
    if (typeof data.command !== "string") {
        fail("data.command of lib/external.js is not a string");
    }
    if (typeof data.callback !== "function") {
        fail("data.callback of lib/external.js is not a function");
    }
    len = data.items.length;
    for (a = 0; a < len; a += 1) {
        input = data.command.replace("prettydiffinput", data.tokens[data.items[a]]);
        /*child(input, function external__callback(err, stdout, stderr) {
            console
        });*/
    }
    data.callback();
};
if (typeof exports === "object" || typeof exports === "function") {
    //commonjs and nodejs support
    exports.api = function commonjs(x) {
        "use strict";
        return external(x);
    };
} else if ((typeof define === "object" || typeof define === "function") && (ace === undefined || ace.prettydiffid === undefined)) {
    //requirejs support
    define(function requirejs(require, exports) {
        "use strict";
        exports.api = function requirejs_export(x) {
            return external(x);
        };
        //worthless if block to appease RequireJS and JSLint
        if (typeof require === "number") {
            return require;
        }
        return exports.api;
    });
}
