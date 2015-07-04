// LICENSE : MIT
"use strict";
import {EventEmitter} from "events"
import deepmerge from "deepmerge"
import {resolveTargetPath} from "./utils/option-utils"
import Browser from "./Browser"
import defaultOptions from "./options/default-options"
function identity() {
    return;
}
export default class BrowserRunner {
    constructor(options) {
        this.options = deepmerge(defaultOptions, options);
        this.serverEmitter = new EventEmitter();
        this.serverEmitter.setMaxListeners(100);
    }

    runBrowser(filePath, customAction) {
        var close = (result)=> {
            this._closeServer();
            if (result instanceof Error) {
                return Promise.reject(result);
            }
            return result;
        };
        var URL = resolveTargetPath(filePath, this.options);
        return this._setupServer()
            .then(this._launchBrowser.bind(this, URL, customAction))
            .then(close, close);
    }


    /**
     * Launch browser and access URL
     * @param URL
     * @param customAction
     * @returns {Promise}
     * @private
     */
    _launchBrowser(URL, customAction = identity) {
        // 非同期でやるとWebDriverが終了してしまう。
        // そのため同期的に呼び出されなければならない
        var browser = new Browser(this.options);
        var close = (result)=> {
            return browser.outputLogs()
                .then(browser.closeDriver.bind(browser))
                .then(function () {
                    if (result instanceof Error) {
                        return Promise.reject(result);
                    }
                    return result;
                });
        };
        return browser.goToURL(URL).then(()=> {
            return customAction(browser.driver, this.options);
        }).then(close, close);
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