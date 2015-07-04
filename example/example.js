// LICENSE : MIT
"use strict";
var BrowserRunner = require("browser-runner");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser("http://example.com").then(function () {
    console.log("FINISH EXAMPLE!");
}).catch(console.error.bind(console));