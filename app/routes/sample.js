/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : sample.js
 *  Date : 9/13/15 2:19 PM
 *  Description :
 *
 */
'use strict';
var express = require("express");
var controllers = require("../controllers");

var controller = controllers.SampleController;

var router = express.Router();

// Local middleware
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Simple CRUD
router.post("/r", controller.createResource);
router.get("/r/:name?", controller.readResource);
router.put("/r", controller.updateResource);
router.delete("/r", controller.deleteResource);

exports = module.exports = {
    path: "/s",
    router: router
};
