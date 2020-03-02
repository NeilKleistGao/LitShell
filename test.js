const process = require("child_process");
const path = require("path");

module.exports = {
    test: function () {
        let child = process.spawn("npm", ["run", "serve"], {cwd: path.join(__dirname, "templates")});

        child.stdout.on("data", (data) => {
            console.log(data.toString());
        });
    }
}