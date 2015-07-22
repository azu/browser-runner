# browser-runner [![Build Status](https://travis-ci.org/azu/browser-runner.svg?branch=master)](https://travis-ci.org/azu/browser-runner)

launch Browser from Node.js/Command line via [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver "selenium-webdriver").

## Installation

    npm install browser-runner

## Usage


### Command Line

Install with `-g`

```
npm install -g browser-runner
```

Launch browser and access to local html.

```sh
$ browser-runner -b firefox path/to/index.html
```

#### Help

```
$ browser-runner -h
browser-runner [options]

Options:
  -h, --help            Show help
  -v, --version         Outputs the version number
  -b, --browser String  Specify Browser - default: phantomjs
```

Supported `-b` value list: [http://selenium.googlecode.com/git/docs/api/javascript/enum_webdriver_Browser.html](http://selenium.googlecode.com/git/docs/api/javascript/enum_webdriver_Browser.html "Browser")

### Node.js modules

Access URL example: [example/example.js](example/example.js)

```js
var BrowserRunner = require("browser-runner");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser("http://example.com").then(function () {
    console.log("FINISH EXAMPLE!");
}).catch(console.error.bind(console));
```

Access local file example: [example/local-example.js](example/local-example.js)

```js
var BrowserRunner = require("browser-runner");
var path = require("path");
var runner = new BrowserRunner({
    "browser": "phantomjs"
});
runner.runBrowser(path.join(__dirname, "local.html")).then(function () {
    console.log("FINISH LOCAL EXAMPLE!");
}).catch(console.error.bind(console));
```

[default-options.js](https://github.com/azu/browser-runner/blob/e350a481f013dcda0d605575c89e50d6d990bd11/src/options/default-options.js "default-options.js"):

```js
var defaultOptions = {
    "rootDir": process.cwd(),
    "browser": "phantomjs",
    "server": {
        "script": require("../server/static-server"),
        "port": 8991
    }
};
```

## Tests

    npm test

## TODO

- [ ] Firefox doesn't ouput `console.log`
    - [firefox - Selenium - how to turn on firebug with console, script and net - Stack Overflow](http://stackoverflow.com/questions/4681072/selenium-how-to-turn-on-firebug-with-console-script-and-net "firefox - Selenium - how to turn on firebug with console, script and net - Stack Overflow")

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
