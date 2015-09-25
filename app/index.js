/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : index
 *  Date : 9/13/15 11:40 AM
 *  Description :
 *
 */
'use strict';
var conf = require("config");
var fs = require("fs-extra");
var morgan = require('morgan');
var debug = require('debug')('app');
var express = require("express");
var routes = require("./routes");

var DEBUG = conf.get("debug");

var app = express();

// Express setup

    // Logging
if(DEBUG) { app.use(morgan('dev')); }
else {
    // In production, log access to file
    var logDir = process.cwd() + "/log/";
    fs.mkdirpSync(logDir);
    var accessLogStream = fs.createWriteStream(logDir + 'access.log', {flags: 'a'});
    app.use(morgan('combined', {stream: accessLogStream}));
}

    // Templates
app.set('view engine', 'ejs');
app.set('views', 'app/views');

// Static files
app.use(express.static('public'));

    // Setup Routes
routes.forEach(function(route) {
    app.use(route.path, route.router);
});


exports = module.exports = app;
