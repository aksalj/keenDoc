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
var _ = require('lodash');

var Const = require("../const");

var converter = new showdown.Converter({
    parseImgDimensions: true,
    strikethrough: true,
    tables: true,
    tasklists: true
});


/**
 * Prepare data to send to layout view
 * @param title
 * @param manifest
 * @param language_tabs
 * @param content
 * @returns {{title: (*|string), scripts: (Array|string), styles: (Array|string), language_tabs: (*|Array), toc_footers: *[], content: (*|string)}}
 * @private
 */
var _makeLayoutData = function (title, manifest, language_tabs, content) {
    return {
        title: title || "keenDoc API Documentation",
        scripts: manifest.app.scripts || "", // FIXME: manifest key "app" could be changed from manifest.config.js
        styles: manifest.app.styles || "",
        language_tabs: language_tabs || [],
        toc_footers: [ //[{text:String, uri: String}]
            {
                text: "powered by keenDoc",
                uri: "http://github.com/aksalj/keenDoc"
            }
        ],
        content: content || ""
    };
};

/**
 * Get language tabs from generated HTML
 * @param content
 * @private
 */
var _makeLanguageTabs = function (content) {
    var $ = cheerio.load(content);
    var tabs = [];
    $("pre code").each(function () {
        var cls = $(this).attr("class");
        if (cls) {
            cls = cls.trim();
            cls = cls.split(" ");
            cls.forEach(function (lang) {
                if (!lang.match(/language-.+/ig)) {
                    tabs.push(lang);
                }
            });
        }
    });

    tabs = _.unique(tabs);

    // HUH: Eliminate languages not intended for the tabs e.g. json results. Is there a better way??
    tabs = _.difference(tabs, conf.get('content.exclude_tabs'));

    return tabs;
};

exports = module.exports = {

    index: function (req, res) {
        // Read manifest and content on every request to allow them to be edited w/o restarting the server...
        var manifest = require(Const.APP_MANIFEST);
        var content = converter.makeHtml(fs.readFileSync(Const.APP_CONTENT, 'utf8'));

        var language_tabs = _makeLanguageTabs(content);
        var data = _makeLayoutData(conf.get("content.title"), manifest, language_tabs, content);

        res.render("layout", data);
    },

    sample: function (req, res) {

        var manifest = require(Const.APP_MANIFEST);
        var content = converter.makeHtml(fs.readFileSync(path.join(process.cwd(), "source/sample.md"), 'utf8'));

        var language_tabs = _makeLanguageTabs(content);
        var data = _makeLayoutData("Sample API documentation", manifest, language_tabs, content);

        res.render("layout", data);

    }
};
