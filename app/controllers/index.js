/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : index
 *  Date : 9/13/15 11:40 AM
 *  Description : Simply export app controllers. Your controllers could be express middlewares or anything you want.
 *
 */
'use strict';

exports.MainController = {
    index: function(req, res) {

        var data = {
            title: "keenDoc API Documentation",
            language_tabs: ['shell', 'ruby', 'python'], // [String]
            search: true,
            toc_footers: [ //[{text:String, uri: String}]
                {
                    text: "powered by keenDoc",
                    uri: "http://github.com/aksalj/keenDoc"
                }
            ]
        };

        res.render("index", data);
    }
};
