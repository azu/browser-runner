#!/usr/bin/env node

var cli = require("../lib/cli/cli");
cli.execute(process.argv).then(function (result) {
    console.log(result);
    process.exit(0);
}).catch(function (error) {
    console.error(error.message);
    console.error(error.stack);
    process.exit(1)
});