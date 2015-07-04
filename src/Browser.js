// LICENSE : MIT
"use strict";
import webdriver from "selenium-webdriver"
/**
 * Browser class is the interface of browser like phantomjs, chrome, firefox, IE...
 */
export default class Browser {
    constructor(browserOptions) {
        var runningCapabilities = {
            browserName: browserOptions.browser,
            loggingPrefs: {'browser': 'ALL'}
        };
        webdriver.promise.controlFlow().on('uncaughtException', function (e) {
            console.error('Unhandled error: ' + e);
        });

        this.driver = this.openDriver(runningCapabilities);
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
    openDriver(capabilities) {
        return new webdriver.Builder()
            .withCapabilities(capabilities)
            .setLoggingPrefs({'browser': 'ALL'})
            .build();
    }

    closeDriver(driver) {
        driver.quit();
    }

    outputLogs() {
        return this.driver.manage().logs().get('browser').then(function (browserLog) {
            var filteredLog = browserLog.filter(function (logEntry) {
                return logEntry.level.value > webdriver.logging.Level.ALL.value;
            });
            if (filteredLog.length) {
                console.log('browser console errors: ' + require('util').inspect(browserLog));
            }
        });
    }

}