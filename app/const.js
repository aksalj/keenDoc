/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : const
 *  Date : 9/27/15 3:00 PM
 *  Description :
 *
 */
'use strict';
var conf = require("config");
var path = require("path");

exports.DEBUG = conf.get("debug");
exports.APP_MANIFEST = path.join(process.cwd(), conf.get("app.manifest"));
exports.APP_CONTENT = path.join(process.cwd(), conf.get("content.file"));
