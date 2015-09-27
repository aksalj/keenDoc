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


exports = module.exports = {

    index: function (req, res) {

        var data = {};

        res.render("editor", data);
    }
};
