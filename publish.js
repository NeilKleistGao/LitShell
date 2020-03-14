const process = require("child_process");
const path = require("path");
const fs = require("fs");
const move = require("./move");
const compile = require("./compile");

module.exports = {
    publish: function (address) {
        compile.preprocess();

        let child = process.spawn("npm", ["run", "build"], {cwd: path.join(__dirname, "templates")});
        child.stderr.on("data", (data) => {
            console.log(data.toString());
        });

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

    download_child.stderr.on("data", (data) => {
        console.log(data.toString());
    });

    download_child.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    download_child.on("close", (code) => {
        if (fs.existsSync(work_path)) {
            move.copyFiles(path.join(__dirname, "templates", "dist"), work_path);
            push(work_path);
        }
        else {
            console.log("can't get data from " + address);
        }
    });
}



function push(work_path) {
    let add_child = process.spawn("git", ["add", "."], {cwd: work_path});

    add_child.stderr.on("data", (data) => {
        console.log(data.toString());
    });
    add_child.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    add_child.on("close", (code) => {
        if (code === 0) {
            let commit_child = process.spawn("git", ["commit", "-m", "update blog " + new Date().toDateString()], {cwd: work_path});
            commit_child.stderr.on("data", (data) => {
                console.log(data.toString());
            });
            commit_child.stdout.on("data", (data) => {
                console.log(data.toString());
            });

            commit_child.on("close", (code) => {
                if (code === 0) {
                    let push_child = new process.spawn("git", ["push"], {cwd: work_path});
                    push_child.stderr.on("data", (data) => {
                        console.log(data.toString());
                    });
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