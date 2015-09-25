/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : main.js
 *  Date : 9/13/15 2:19 PM
 *  Description :
 *
 */
'use strict';
var express = require("express");
var controllers = require("../controllers");

var router = express.Router();
var ctrl = controllers.MainController;

router.get("/", ctrl.index);
router.get("/sample", ctrl.sample);

exports = module.exports = {
    path: "/",
    router: router
};
