/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : main
 *  Date : 9/24/15 10:06 PM
 *  Description :
 *
 */
'use strict';
var fs = require("fs");
var showdown = require("showdown");
var converter = new showdown.Converter({
    parseImgDimensions: true,
    strikethrough: true,
    tables: true,
    tasklists: true
});

var APP_BUNDLE = __dirname + "/../../manifest.json"; // HUH!!
var APP_CONTENT = __dirname + "/../../source/index.md";

// TODO: Read multiple md files?

exports = module.exports = {

    index: function (req, res) {
        var manifest = require(APP_BUNDLE);
        var content = converter.makeHtml(fs.readFileSync(APP_CONTENT, 'utf8'));

        var data = {
            title: "keenDoc API Documentation",
            scripts: manifest.app.scripts,
            styles: manifest.app.styles,
            language_tabs: ['shell', 'ruby', 'python'], // [String] TODO: Parametrize some how
            toc_footers: [ //[{text:String, uri: String}]
                {
                    text: "powered by keenDoc",
                    uri: "http://github.com/aksalj/keenDoc"
                }
            ],
            content: content
        };

        res.render("index", data);
    }
};
