// LICENSE : MIT
"use strict";
var staticServer = require('node-static');
var assert = require("assert");
var debug = require("debug")("browser-runner:server");
var EventEmitter = require("events").EventEmitter;
module.exports = function (testEmitter) {
    return function (options) {
        var emitter = new EventEmitter();
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
        }).listen(options.server.port, function(){
            // finish setup callback
            emitter.emit("connection");
        });
        emitter.on("close", function () {
            server.close()
        });
        return {
            emitter: emitter
        }
    }
};