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

var BASE_URL = "/editor";

var router = express.Router();
var ctrl = require("../controllers").EditorController;

var ensureAuthenticated = function (req, res) {
    if (req.isAuthenticated()) { return next(); }
    else {
        // HUH: Redirect or just send error?
        res.redirect(BASE_URL + "/login");
    }
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(expressSession({
    cookie: { path: BASE_URL, httpOnly: true, secure: false, maxAge: null },
    secret: '2hT4juO1MzuSu8akOZfy',
    resave: false,
    saveUninitialized: false
}));

// Authentication
router.use(passport.initialize());
router.use(passport.session());

// passport config
passport.use(new LocalStrategy(function(username, password, done) {

    var usr = ctrl.Users.findByUsername(username);
    if(usr) {
        if (ctrl.Users.validatePassword(username, password)) {
            return done(null, usr);
        }
    }

    done("Invalid username and/or password", null);

}));
passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(username, done) {
    var usr = ctrl.Users.findByUsername(username);
    var err = usr? null : "User not found";
    done(err, usr);
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res, next) {
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(BASE_URL);
    });
});

router.get('/logout', ensureAuthenticated, function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect(BASE_URL);
    });
});


router.get("/", ensureAuthenticated, ctrl.index);
router.post("/save", ensureAuthenticated, ctrl.save);

exports = module.exports = {
    path: BASE_URL,
    router: router
};
