/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : sample
 *  Date : 9/13/15 2:22 PM
 *  Description :
 *
 */
'use strict';
var models = require("../models");

var model = models.Sample;

exports.createResource = function(req, res) {
    res.send("CREATE");
};

exports.readResource = function(req, res) {

    model.find({}, function (err, samples) {
        var response = {
            error: err || null,
            data: samples
        };
        res.send(response);
    });

};

exports.updateResource = function(req, res) {
    res.send("UPDATE");
};

exports.deleteResource = function(req, res) {
    res.send("DELETE");
};
