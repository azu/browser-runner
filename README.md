# browser-runner

Lunch Browser from Node.js/CommandLine via [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver "selenium-webdriver").

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


### Node.js modules

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