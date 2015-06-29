// LICENSE : MIT
"use strict";
/**
 * default option values of browser-runner
 */
var defaultOptions = {
    "rootDir": process.cwd(),
    "browser": "phantomjs",
    "server": {
        "script": require("../server/static-server"),
        "port": 8991
    }
};
export default defaultOptions;