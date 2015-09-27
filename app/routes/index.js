/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : index
 *  Date : 9/13/15 12:33 PM
 *  Description : Array of all app routers.
 *
 */
'use strict';
var conf = require("config");

var routes = [
    require("./main")
];


if(conf.get("editor.enabled")) { // Add editor if enabled in configs
    routes.push(require('./editor'));
}



/**
 * Array of all app routers.
 * @type {[{path: String, router: express.Router}]}
 */
exports = module.exports = routes;
