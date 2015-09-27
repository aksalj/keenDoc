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
var conf = require('config');
var _ = require('lodash');

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

        var data = {
            user: req.user
        };

        console.error(data);

        res.render("editor", data);
    },

    save: function(req, res) {

        res.sendStatus(500);
    }
};
