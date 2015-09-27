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
var SHA256 = require("crypto-js/sha256");
var _ = require('lodash');

exports = module.exports = {

    Users: function () {
        var _self = this;
        var _users = conf.get('editor.users');

        _users.forEach(function(usr) {
            usr.password = SHA256(usr.password);
        });

        this.findByUsername = function (username) {
            return _.find(_users, function(usr) {
                return usr.username === username;
            });
        };

        this.validatePassword = function (username, password) {
            var usr = _self.findByUsername(username);
            if(usr) {
                return usr.password === SHA256(password);
            } else {
                return false;
            }
        }

    },


    index: function (req, res) {

        var data = {
            user: req.user
        };

        res.render("editor", data);
    },

    save: function(req, res) {

        res.sendStatus(500);
    }
};
