// LICENSE : MIT
"use strict";
var optionator = require("optionator");
export default optionator({
    prepend: "browser-runner [options]",
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
    options: [
        {
            heading: "Options"
        }, {
            option: "help",
            alias: "h",
            type: "Boolean",
            description: "Show help"
        }, {
            option: "version",
            alias: "v",
            type: "Boolean",
            description: "Outputs the version number"
        }, {
            option: "browser",
            alias: "b",
            type: "String",
            default: "phantomjs",
            description: "Specify Browser"
        }
    ]
});