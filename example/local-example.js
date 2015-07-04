// LICENSE : MIT
"use strict";
var BrowserRunner = require("browser-runner");
var path = require("path");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser(path.join(__dirname, "local.html")).then(function () {
    console.log("FINISH LOCAL EXAMPLE!");
}).catch(console.error.bind(console));