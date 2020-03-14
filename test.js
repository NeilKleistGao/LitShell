const process = require("child_process");
const path = require("path");
const compile = require("./compile");

module.exports = {
    test: function () {
        compile.preprocess();

        let child = process.spawn("npm", ["run", "serve"], {cwd: path.join(__dirname, "templates")});
        child.stdout.on("data", (data) => {
            console.log(data.toString());
        });
    }
}