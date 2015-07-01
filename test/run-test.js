// LICENSE : MIT
"use strict";
import BrowserRunner from "../src/browser-runner"
import path from "path"
import TestServer from "./test-server"
import {EventEmitter} from "events"
import assert from "power-assert"
it("Browser access the server", function () {
    var testEmitter = new EventEmitter();
    var server = TestServer(testEmitter);
    var browserRunner = new BrowserRunner({
        rootDir: process.cwd(),
        browser: "phantomjs",
        server: {
            script: server
        }
    });
    testEmitter.on("serve", function (URL) {
        assert.equal(URL, "/test/index.html");
    });
    return browserRunner.runBrowser(process.cwd() + "/test/index.html");

});