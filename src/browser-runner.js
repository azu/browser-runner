// LICENSE : MIT
"use strict";
import {EventEmitter} from "events"
import deepmerge from "deepmerge"
import {resolveTargetPath} from "./utils/option-utils"
import Browser from "./Browser"
import defaultOptions from "./options/default-options"
export default class BrowserRunner {
    constructor(options) {
        this.options = deepmerge(defaultOptions, options);
        this.serverEmitter = new EventEmitter();
        this.serverEmitter.setMaxListeners(100);
    }

    runBrowser(filePath) {
        var close = (result)=> {
            this._closeServer();
            if (result instanceof Error) {
                return Promise.reject(result);
            }
            return result;
        };
        var URL = resolveTargetPath(filePath, this.options);
        var browser = new Browser(this.options);
        return this._setupServer()
            .then(()=> {
                return browser.goToURL(URL)
            })
            .then(close, close);
    }


    _setupServer() {
        if (!this.options.server || !this.options.server.script) {
            return Promise.resolve();
        }
        if (typeof this.options.server.script !== "function") {
            throw new Error("options.server.script should be function.");
        }
        return new Promise((resolve, reject)=> {
            this.serverEmitter.once("connection", ()=> {
                this.serverEmitter.removeAllListeners("error");
                resolve();
            });
            this.serverEmitter.once("error", (error)=> {
                reject(error);
            });
            var severImplement = this.options.server.script;
            severImplement(this.serverEmitter, this.options);
            assert(this.serverEmitter.listeners("close").length > 0, `${severImplement.name} should implement emitter.on("close", function({ ... })`);
        });
    }

    _closeServer() {
        this.serverEmitter.emit("close");
        this.serverEmitter.removeAllListeners();
    }

}