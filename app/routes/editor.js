/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : editor
 *  Date : 9/27/15 9:06 AM
 *  Description :
 *
 */
'use strict';
var conf = require("config");
var express = require("express");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');

var controllers = require("../controllers");

var USERS = conf.get("editor.users"); // TODO: Encode the plain passwords
var BASE_URL = "/editor";

var router = express.Router();
var ctrl = controllers.EditorController;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(expressSession({
    cookie: { path: BASE_URL, httpOnly: true, secure: false, maxAge: null },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Authentication
router.use(passport.initialize());
router.use(passport.session());

// passport config
passport.use(new LocalStrategy(function(username, password, done) {
    // TODO: look up username in USERS
}));
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(username, done) {
    // TODO: look up username in USERS
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(BASE_URL);
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(BASE_URL);
    });
});





router.get("/", ctrl.index);
router.post("/save", ctrl.index);

exports = module.exports = {
    path: BASE_URL,
    router: router
};
