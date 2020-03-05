const fs = require("fs");
const path = require("path");

module.exports = {
    clear: function () {
        let directories = getAllGitDirectories();
        if (directories.length == 0) {
            console.log("no git directory to be cleaned.");
        }
        else {
            for (let dir_index in directories) {
                clearFiles(directories[dir_index]);
                fs.rmdirSync(directories[dir_index]);
                console.log("> remove " + directories[dir_index]);
            }

            console.log("all git directories has been deleted.");
        }
    }
}

function getAllGitDirectories() {
    let files_list = fs.readdirSync(".");
    let git_list = new Array();
    for (let index in files_list) {
        let path = "./" + files_list[index];
        let state = fs.statSync(path);
        if (state.isDirectory() && checkGit(path)) {
            git_list.push(path);
        }
    }

    return git_list;
}

function clearFiles(dir) {
    if (fs.statSync(dir).isDirectory()) {
        let sub_list = fs.readdirSync(dir);
        for (let index in sub_list) {
            clearFiles(path.join(dir, sub_list[index]));
        }

        fs.rmdirSync(dir);
    }
    else {
        fs.unlinkSync(dir);

        console.log("remove " + dir);
    }
}

function checkGit(path) {
    let files_list = fs.readdirSync(path);
    return (files_list.indexOf(".git") !== -1);
}