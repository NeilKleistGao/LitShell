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
            if (code === 0) {
                update(address);
            }
            else {
                console.log("failed to publish");
            }
        });
    }
}

function update(address) {
    let begin = address.lastIndexOf("/") + 1, end = address.lastIndexOf(".");
    let directory = address.substr(begin, end - begin);
    let work_path = path.join(__dirname, directory);

    let download_child = null;

    if (!fs.existsSync(work_path)) {
        download_child = process.spawn("git", ["clone", address]);
    }
    else {
        download_child = process.spawn("git", ["pull"], {cwd: work_path});
    }

    download_child.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    download_child.on("close", (code) => {
        if (fs.existsSync(work_path)) {
            copyFiles(path.join(__dirname, "templates", "dist"), work_path);
            push(work_path);
        }
        else {
            console.log("can't get data from " + address);
        }
    });
}

function copyFiles(from, to) {
    clearDirectory(to);

    let list = fs.readdirSync(from);
    for (let index in list) {
        copyFile(path.join(from, list[index]), path.join(to, list[index]));
    }
}

function clearDirectory(directory) {
    let list = fs.readdirSync(directory);
    for (let index in list) {
        if (list[index] !== ".git") {
            let name = path.join(directory, list[index]);

            if (fs.statSync(name).isDirectory()) {
                clearDirectory(name);
                fs.rmdirSync(name);
            }
            else {
                fs.unlinkSync(name);
            }
        }
    }
}

function copyFile(from, to) {
    if (fs.statSync(from).isDirectory()) {
        fs.mkdirSync(to);
        let sub_list = fs.readdirSync(from);
        for (let index in sub_list) {
            copyFile(path.join(from, sub_list[index]), path.join(to, sub_list[index]));
        }
    }
    else {
        fs.writeFileSync(to, fs.readFileSync(from));

        console.log("copy " + from);
    }
}

function push(work_path) {
    let add_child = process.spawn("git", ["add", "."], {cwd: work_path});
    add_child.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    add_child.on("close", (code) => {
        if (code === 0) {
            let commit_child = process.spawn("git", ["commit", "-m", "update blog " + new Date().toDateString()], {cwd: work_path});
            commit_child.stdout.on("data", (data) => {
                console.log(data.toString());
            });

            commit_child.on("close", (code) => {
                if (code === 0) {
                    let push_child = new process.spawn("git", ["push"], {cwd: work_path});
                    push_child.stdout.on("data", (data) => {
                        console.log(data.toString());
                    });

                    push_child.on("close", (code) => {
                        if (code === 0) {
                            console.log("your blog has been published.");
                        }
                        else {
                            console.log("can't push to git.");
                        }
                    });
                }
                else {
                    console.log("can't commit to the git.");
                }
            })
        }
        else {
            console.log("can't add data into git.")
        }
    })
}