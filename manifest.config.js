/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : manifest.config.js
 *  Date : 9/24/15 5:42 PM
 *  Description :
 *
 */
'use strict';
var assets = { root : "./static/" };

var prodLikeEnvs = ["production"];

module.exports = {

    bundle: {
        app: {
            options: {
                uglify:prodLikeEnvs,
                minCss: prodLikeEnvs,
                rev: true,
                sourcemaps: false
            },

            scripts: [
                // Vendor
                assets.root + "libs/jquery/dist/jquery.min.js",

                assets.root + "js/lib/_energize.js",
                assets.root + "js/lib/_lunr.js",
                assets.root + "js/lib/_jquery.highlight.js",
                assets.root + "js/lib/_jquery_ui.js",
                assets.root + "js/lib/_jquery.tocify.js",
                assets.root + "js/lib/_imagesloaded.min.js",

                //assets.root + "libs/highlight.js/src/highlight.js",


                // Application
                assets.root + 'js/app/*.js'
            ],

            styles: [
                //assets.root + "libs/highlight.js/src/styles/default.css",

                assets.root + "/css/screen.css"

            ]
        }
    }
};

