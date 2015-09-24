/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : gulpfile.js
 *  Date : 9/24/15 5:39 PM
 *  Description :
 *
 */
'use strict';
var gulp = require('gulp');
var del = require('del');
var flatten = require('gulp-flatten');
var bundle = require('gulp-bundle-assets');

var CONFIG = "./manifest.config.js";
var SOURCE = "./static/";
var DESTINATION = "./public/";


gulp.task('clean', function(cb) {
    del(DESTINATION, cb);
});


gulp.task('copyFonts', ["clean"], function() {
    var src = SOURCE + "**/*.{eot,ttf,woff,woff2,svg}";
    var dst = DESTINATION; // + "fonts";
    return gulp.src(src).pipe(flatten()).pipe(gulp.dest(dst));
});

gulp.task('copyImages', ["clean"], function() {
    var src = [
        SOURCE + "img/*.{gif,ico,png}",
        SOURCE + "img/**/*.{gif,ico,png}"
    ];
    var dst = DESTINATION + "img";
    return gulp.src(src).pipe(gulp.dest(dst));
});

gulp.task('copyRobots', ["clean"], function() {
    var src = SOURCE + "../robots.txt";
    var dst = DESTINATION + "robots.txt";
    return gulp.src(src).pipe(gulp.dest(dst));
});


gulp.task('build', ["clean", "copyFonts", "copyImages", "copyRobots"], function () {
    return gulp.src(CONFIG)
        .pipe(bundle({
            quietMode: true
        }))

        .pipe(bundle.results({
            dest: './',
            fileName: 'manifest'
        }))

        .pipe(gulp.dest(DESTINATION));
});
