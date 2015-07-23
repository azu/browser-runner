// LICENSE : MIT
"use strict";
var staticServer = require('node-static');
var assert = require("assert");
import {EventEmitter} from "events"
var debug = require("debug")("browser-runner:server");
/**
 * @param {object} options
 */
module.exports = function (options) {
    assert(options && options.server && options.server.port != null, "must set options.server.port");
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
                debug("serving " + request.url);
            });
        }).resume();
    }).listen(options.server.port, function () {
        // finish setup callback
        emitter.emit("connection");
    });
    // when reftest-runner emit "close", then sever should be closed.
    emitter.on("close", function () {
        server.close()
    });
    return {
        emitter
    }
};
