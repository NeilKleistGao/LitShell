const process = require("child_process");
const path = require("path");
const fs = require("fs");

module.exports = {
    publish: function (address) {
        let child = process.spawn("npm", ["run", "build"], {cwd: path.join(__dirname, "templates")});

        child.stdout.on("data", (data) => {
            console.log(data.toString());
        });

        child.on("close", (code) => {
            if (code === 0 && copyAndPush(address)) {
                console.log("your blog has been published at " + address);
            }
            else {
                console.log("failed to publish");
            }
        });
    }
}

function copyAndPush(address) {
    try {
        let begin = address.lastIndexOf("/") + 1, end = address.lastIndexOf(".");
        let directory = address.substr(begin, end - begin);

        if (!fs.existsSync(path.join(__dirname, directory))) {
            if (!cloneGit(address)) {
                throw "";
            }
        }

        if (!copyFiles(address) || !pushGit(address)) {
            throw "";
        }
    }
    catch (e) {
        return false;
    }

    return true;
}

function cloneGit(address) {
    try {
        console.log("clone git repo from " + address);
        let child = process.spawnSync("git", ["clone", address]);
        console.log(child.stdout.toString());
    }
    catch (e) {
        return false;
    }

    return true;
}

function copyFiles(address) {
    return true;
}

function pushGit(address) {
    return true;
}