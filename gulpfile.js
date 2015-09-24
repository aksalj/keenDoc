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
var bundle = require('gulp-bundle-assets');

var CONFIG = "./manifest.config.js";
var DESTINATION = "./public/";


gulp.task('build', [], function () {
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
