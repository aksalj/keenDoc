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
var conf = require("config");
var fs = require("fs");
var path = require("path");
var showdown = require("showdown");
var cheerio = require('cheerio');
var hoek = require('hoek');

var converter = new showdown.Converter({
    parseImgDimensions: true,
    strikethrough: true,
    tables: true,
    tasklists: true
});

var APP_MANIFEST = path.join(process.cwd(), conf.get("app.manifest"));
var APP_CONTENT = path.join(process.cwd(), conf.get("content"));

exports = module.exports = {

    index: function (req, res) {

        // Read manifest and content on every request to allow them to be edited w/o restarting the server...
        var manifest = require(APP_MANIFEST);
        var content = converter.makeHtml(fs.readFileSync(APP_CONTENT, 'utf8'));

        // Get language tabs from generated HTML
        var language_tabs = (function(){ // FIXME: Must eliminate languages not intended for the tabs e.g. json results
            var $ = cheerio.load(content);
            var tabs = [];
            $("pre code").each(function () {
                var cls = $(this).attr("class").trim();
                cls = cls.split(" ");
                cls.forEach(function (lang) {
                    if (!lang.match(/language-.+/ig)) {
                        tabs.push(lang);
                    }
                });
            });
            return hoek.unique(tabs);
        })();


        var data = {
            title: "keenDoc API Documentation",
            scripts: manifest.app.scripts,
            styles: manifest.app.styles,
            language_tabs: language_tabs,
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
