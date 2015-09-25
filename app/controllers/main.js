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
var path = require("path");
var showdown = require("showdown");
var conf = require("config");

var converter = new showdown.Converter({
    parseImgDimensions: true,
    strikethrough: true,
    tables: true,
    tasklists: true
});

var APP_MANIFEST = path.join(process.cwd(), conf.get("app.manifest"));
var APP_CONTENT = path.join(process.cwd(), conf.get("content.file"));

exports = module.exports = {

    index: function (req, res) {

        // Read manifest and content on every request to allow them to be edited w/o restarting the server...
        var manifest = require(APP_MANIFEST);
        var content = converter.makeHtml(fs.readFileSync(APP_CONTENT, 'utf8'));
        var languages = conf.get("content.languages"); // FIXME: Should parse languages from markdown or generated html?

        var data = {
            title: "keenDoc API Documentation",
            scripts: manifest.app.scripts,
            styles: manifest.app.styles,
            language_tabs: languages,
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
