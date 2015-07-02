// LICENSE : MIT
"use strict";
import options from "./cli-options"
import path from "path"
var BrowserRunner = require("../browser-runner");
var debug = require("debug")("browser-runner:cli");
var cli = {
    execute: function (args) {
        var currentOptions = options.parse(args);
        if (currentOptions.version) { // version from package.json
            return Promise.resolve("v" + require("../../package.json").version);
        } else if (currentOptions.help) {
            return Promise.resolve(options.generateHelp());
        }
        var files = currentOptions._;
        if (files.length === 0) {
            return Promise.reject(new Error("must specify html file"));
        }
        debug("CLI options %@", currentOptions);
        var runner = new BrowserRunner(currentOptions);
        debug("files %@", files);
        return runner.runBrowser(files[0])
    }
};
export default cli;