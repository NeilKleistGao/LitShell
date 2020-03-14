const path = require("path");
const fs = require("fs");

module.exports = {
    copyFiles: function (from, to, clr = true) {
        if (clr) {
            this.clearDirectory(to);
        }

        let list = fs.readdirSync(from);
        for (let index in list) {
            this.copyFile(path.join(from, list[index]), path.join(to, list[index]));
        }
    },

    copyFile: function (from, to) {
        if (fs.statSync(from).isDirectory()) {
            fs.mkdirSync(to);
            let sub_list = fs.readdirSync(from);
            for (let index in sub_list) {
                this.copyFile(path.join(from, sub_list[index]), path.join(to, sub_list[index]));
            }
        }
        else {
            fs.writeFileSync(to, fs.readFileSync(from));

            console.log("copy " + from);
        }
    },

    clearDirectory: function (directory, log = false) {
        let list = fs.readdirSync(directory);
        for (let index in list) {
            if (list[index] !== ".git") {
                let name = path.join(directory, list[index]);

                if (fs.statSync(name).isDirectory()) {
                    this.clearDirectory(name);
                    fs.rmdirSync(name);
                }
                else {
                    fs.unlinkSync(name);

                    if (log) {
                        console.log("> remove " + name);
                    }
                }
            }
        }
    }
}

