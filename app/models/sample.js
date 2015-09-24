/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : sample
 *  Date : 9/13/15 2:23 PM
 *  Description :
 *
 */
'use strict';
var mongoose = require("mongoose");

exports = module.exports = mongoose.model('Cat', { name: String });
