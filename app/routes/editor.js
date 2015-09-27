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
var cookieSession = require('cookie-session');
var flash = require('flash');

var BASE_URL = "/editor";
var LOGIN_URI = "/editor/login";

var router = express.Router();
var ctrl = require("../controllers").EditorController;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    else {
        res.redirect(LOGIN_URI);
    }
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(cookieSession({secret: '2hT4juO1MzuSu8akOZfy', path: BASE_URL }));
router.use(flash());

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

    return done(null, false, {message: "Invalid username and/or password"});

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

    if(req.isAuthenticated()) {
        return res.redirect(BASE_URL);
    }

    var flash = req.session.flash;
    var message = (flash && flash.length > 0)? flash[0] : null;
    res.render('login', { loginUri: LOGIN_URI, flash: message});
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: LOGIN_URI, successRedirect: BASE_URL, failureFlash: true })
);

router.get('/logout', ensureAuthenticated, function(req, res, next) {
    req.logout();
    res.redirect("/");
});

router.get("/", ensureAuthenticated, ctrl.index);

router.post("/save", ensureAuthenticated, ctrl.save);

router.get("/content", ensureAuthenticated, ctrl.sendContent);

exports = module.exports = {
    path: BASE_URL,
    router: router
};
