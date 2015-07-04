// LICENSE : MIT
"use strict";
import BrowserRunner from "../src/browser-runner"
import path from "path"
import TestServer from "./test-server"
import {EventEmitter} from "events"
import assert from "power-assert"
import Webdriver from "selenium-webdriver"
describe("BrowserRunner", function () {
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
    it("run with custom action", function () {
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
        return browserRunner.runBrowser(process.cwd() + "/test/index.html", function (driver, options) {
            driver.findElement(Webdriver.By.css("#click")).click();
            return driver.wait(function () {
                var htmlClassAttr = driver.findElement(Webdriver.By.tagName('html')).getAttribute("class");
                return htmlClassAttr.then(function (className) {
                    return className === "test-finish";
                });
            }, 5000);
        });
    });
});
