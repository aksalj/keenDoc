/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : editor
 *  Date : 9/27/15 9:07 AM
 *  Description :
 *
 */
'use strict';
var path = require("path");
var conf = require('config');
var fs = require("fs");
var _ = require('lodash');

var Const = require("../const");

var UserModel = function () {
    var _self = this;
    var _users = conf.get('editor.users');

    this.findByUsername = function (username) {
        return _.find(_users, function(usr) {
            return usr.username === username;
        });
    };

    this.validatePassword = function (username, password) {
        var usr = _self.findByUsername(username);
        if(usr) {
            return usr.password === password;
        } else {
            return false;
        }
    }
};

exports = module.exports = {

    Users: new UserModel(),


    index: function (req, res) {

        var manifest = require(Const.APP_MANIFEST);

        var data = {
            user: req.user,
            styles: manifest.editor.styles,
            scripts: manifest.editor.scripts
        };

        res.render("editor", data);
    },

    save: function(req, res) {

        fs.writeFile(Const.APP_CONTENT, req.body.content, function (err) {
            if (err){
                console.error(err);
                res.sendStatus(500);
            }
            else {
                res.end();
            }
        });
    },

    sendContent: function (req, res) {
        res.sendFile(Const.APP_CONTENT);
    }
};
