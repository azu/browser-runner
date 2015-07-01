// LICENSE : MIT
"use strict";
import webdriver from "selenium-webdriver"
/**
 * Browser class is the interface of browser like phantomjs, chrome, firefox, IE...
 */
export default class Browser {
    constructor(browserOptions) {
        var runningCapabilities = {
            browserName: browserOptions.browser
        };
        this.driver = this._openDriver(runningCapabilities);
    }

    goToURL(URL) {
        return this.driver.get(URL);
    }

    /**
     * build webdriver with capabilities option and return webdriver object.
     * @param {webdriver.Capabilities} capabilities
     * https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
     * @returns {!webdriver.WebDriver}
     * @private
     */
    _openDriver(capabilities) {
        return new webdriver.Builder()
            .withCapabilities(capabilities)
            .build();
    }

    _closeDriver(driver) {
        driver.quit();
    }

}