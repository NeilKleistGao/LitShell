const fs = require("fs");
const path = require("path");
const move = require("./move");

module.exports = {
    clear: function () {
        let directories = getAllGitDirectories();
        if (directories.length == 0) {
            console.log("no git directory to be cleaned.");
        }
        else {
            for (let dir of directories) {
                move.clearDirectory(dir, true);
                console.log("> remove " + dir);
            }

            console.log("all git directories has been deleted.");
        }
    }
}

function getAllGitDirectories() {
    let files_list = fs.readdirSync(".");
    let git_list = new Array();
    for (let path of files_list) {
        let state = fs.statSync(path);
        if (state.isDirectory() && checkGit(path)) {
            git_list.push(path);
        }
    }

    return git_list;
}

function checkGit(path) {
    let files_list = fs.readdirSync(path);
    return (files_list.indexOf(".git") !== -1);
}