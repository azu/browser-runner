// LICENSE : MIT
"use strict";
var staticServer = require('node-static');
var assert = require("assert");
var debug = require("debug")("browser-runner:server");
module.exports = function (testEmitter) {
    /**
     * @param {EventEmitter} emitter
     * @param {object} options
     */
    return function (emitter, options) {
        var fileServer = new staticServer.Server(options.rootDir);
        var server = require('http').createServer(function (request, response) {
            request.addListener('end', function () {
                fileServer.serve(request, response, function (err, result) {
                    if (err) { // There was an error serving the file
                        debug("Error serving " + request.url + " - " + err.message);

                        // Respond to the client
                        response.writeHead(err.status, err.headers);
                        response.end();
                        return;
                    }
                    testEmitter.emit("serve", request.url);
                    debug("serving " + request.url);
                });
            }).resume();
        }).listen(options.server.port);
        // when reftest-runner emit "close", then sever should be closed.
        emitter.on("close", function () {
            server.close()
        });
        // finish setup callback
        emitter.emit("connection");
    }
};