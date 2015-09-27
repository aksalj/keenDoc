/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : keenDoc
 *  File : _editor.js
 *  Date : 9/27/15 2:44 PM
 *  Description :
 *
 */
'use strict';
$(function(){
    // TODO: Fetch content md, setup auto refresh && auto save
    var converter = new showdown.Converter();

    var preview = function (text) {
        var html = converter.makeHtml(text);
        $("#preview").html(html);
    };

    var save = function (text) {
        $.ajax({
            type: "POST",
            url: "/editor/save",
            data: {content: text}
        });
    };


    var opts = {
        wait: 750,
        highlight: true,
        captureLength: 1,
        callback: function (text) {
            preview(text);
            save(text);
        }
    };
    $("#editor").typeWatch(opts);


    $.get("/editor/content", function(data) {
        preview(data);
        $("#editor").val(data);
    });

});
