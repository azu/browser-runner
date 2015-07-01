// LICENSE : MIT
"use strict";
import BrowserRunner from "../src/browser-runner"
import path from "path"
it("BrowserRunner", function () {
    var browserRunner = new BrowserRunner({
        rootDir: process.cwd(),
        browser: "phantomjs"
    });
    console.log(process.cwd() + "/test/index.html");
    return browserRunner.runBrowser(process.cwd() + "/test/index.html");
});