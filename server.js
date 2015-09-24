/**
 *  Copyright (c) 2015 Salama AB
 *  All rights reserved
 *  Contact: aksalj@aksalj.me
 *  Website: http://www.aksalj.me
 *
 *  Project : meansfw
 *  File : server
 *  Date : 9/13/15 12:38 PM
 *  Description :
 *
 */
'use strict';
var debug = require('debug')('server');
var fs = require('fs');
var os = require('os');
var cluster = require('cluster');
var conf = require('config');
var https = require('https');
var http = require('http');


/**
 * Simple wrappler around express and mongoose
 * @param app Object express app
 * @constructor
 */
var Server = function (app) {
    var _self = this;
    _self.process = cluster.worker;
    _self.app = app;

    /**
     * Start express app
     * @param callback
     */
    this.start = function (callback) {

        /**
         * Either start a HTTP or HTTPS server depending on the configuration
         * @param cb
         * @returns {*}
         * @private
         */
        var _startHttpServer = function (cb) {
            var port = conf.get("app.port");
            var host = conf.get("app.host");
            var server = null;

            if (conf.get("app.secure")) {

                var credentials = conf.get("app.credentials");
                var options = {};

                if (credentials.pfx) {
                    options = {
                        pfx: fs.readFileSync(credentials.pfx)
                    };

                } else if (credentials.key && credentials.cert) {
                    options = {
                        key: fs.readFileSync(credentials.key),
                        cert: fs.readFileSync(credentials.cert)
                    };

                } else {
                    console.error("Invalid HTTPS options");
                    return _self.process.kill();
                }

                server = https.createServer(options, _self.app);

            } else {

                server = http.createServer(_self.app);

            }

            server.listen(port, host, cb);
        };

        _startHttpServer(callback);

    };

};


if (cluster.isMaster) {
    // Fork workers.
    var numCPUs = os.cpus().length;
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening', function (worker, address) {
        if (worker.id == numCPUs) { // Last worker to listen
            console.log('App listening at http%s://%s:%s [%d worker%s running...]',
                conf.get("app.secure") ? "s" : "",
                address.address, address.port,
                numCPUs, numCPUs > 1 ? "s" : "");
        }
    });

    cluster.on('exit', function (worker, code, signal) {
        if (worker.suicide === true) {
            console.info('worker #' + worker.id + ' committed suicide (' + code + ')');
        } else {
            console.log('worker ' + worker.id + ' died (' + code + ')');
        }
    });

} else {
    // Workers can share any TCP connection
    // In this case it's a HTTP server
    var server = new Server(require("./app"));
    server.start(function (err) {
        if (err) {
            console.error(err);
        }
    });
}
