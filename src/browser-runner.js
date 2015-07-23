// LICENSE : MIT
"use strict";
import assert from "assert"
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
        this.serverEmitter = null;
    }

    /**
     * launch browser and access the path.
     * @param {string} filePath filePath or URL
     * @param customAction customAction(webdriver, options)
     * @returns {Promise}
     */
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
        return new Promise((resolve, reject) => {
            var severImplement = this.options.server.script;
            var {emitter} = severImplement(this.options);
            this.serverEmitter = emitter;
            emitter.once("connection", ()=> {
                emitter.removeAllListeners("error");
                resolve();
            });
            emitter.once("error", (error)=> {
                reject(error);
            });
            assert(emitter.listeners("close").length > 0, `${severImplement.name} should implement emitter.on("close", function({ ... })`);
        }).catch(error => console.error(error.stack));
    }

    _closeServer() {
        this.serverEmitter.emit("close");
        this.serverEmitter.removeAllListeners();
    }

}