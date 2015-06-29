// LICENSE : MIT
"use strict";
import assert from "assert";
import path from "path";
export function resolveTargetPath(targetPath, option) {
    var root = option.rootDir;
    // target is file path
    if (typeof option.server === "undefined") {
        throw new Error("option.server is undefined");
    }
    var absoluteA = path.resolve(root, targetPath);
    return "http://localhost:" + option.server.port + "/" + path.relative(root, absoluteA);
}