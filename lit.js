#!/usr/bin/env node

let argv = require("yargs")
    .usage("Usage: lit [options]")
    .option("c", {
        alias: "clear",
        describe: "delete all git files",
        boolean: true
    })
    .option("t", {
        alias: "test",
        describe: "test your blog on localhost",
        boolean: true
    })
    .option("p", {
        alias: "publish",
        describe: "build and publish your blog on github",
        type: "string"
    })
    .option("a", {
        alias: "add",
        describe: "add a new section",
        type: "string"
    })
    .example("lit --publish git@github.com:your_github_name/your_github_name.github.io.git", "publish to your_github_name.github.io")
    .help("h")
    .alias("h", "help")
    //.demandOption(["clear", "test", "publish", "help", "c", "t", "p", "h"])
    .argv;

if (argv.c !== undefined) {
    require("./clear").clear();
}
if (argv.t !== undefined) {
    require("./test").test();
}
if (argv.p !== undefined && argv.p !== "") {
    require("./publish").publish(argv.p);
}
if (argv.a !== undefined && argv.a !== "") {
    require("./add").add(argv.a);
}