const path = require("path");
const fs = require("fs");
const move = require("./move");

module.exports = {
    preprocess: function () {
        let config = JSON.parse(fs.readFileSync(path.join(__dirname, "markdowns", "catalog.json")));
        let all_files_list = [];

        for (let sec of config["sections"]) {
            if (!fs.existsSync(path.join(__dirname, "templates", "public", sec["name"]))) {
                fs.mkdirSync(path.join(__dirname, "templates", "public", sec["name"]));
            }

            move.copyFile(path.join(__dirname, "markdowns", sec["name"], sec["cover"]), path.join(__dirname, "templates", "public", sec["name"], sec["cover"]));
            let list = compileMarkDowns(sec["name"]);
            packJson(sec, list);
            all_files_list = all_files_list.concat(list);
        }

        all_files_list.sort(function (x, y) {
            if (x["time"] < y["time"]) {
                return 1;
            }
            else {
                return -1;
            }
        });

        all_files_list = all_files_list.slice(0, 5);
        fs.writeFileSync(path.join(__dirname, "templates", "src", "assets", "catalog.json"), JSON.stringify(config));
        fs.writeFileSync(path.join(__dirname, "templates", "src", "assets", "recent.json"), JSON.stringify({"articles":all_files_list}));
    }
}

function compileMarkDowns(section) {
    let files = fs.readdirSync(path.join(__dirname, "markdowns", section));
    let list = [];

    for (let file of files) {
        let ext = file.substr(file.lastIndexOf('.'));
        if (ext === ".md" || ext === '.markdown') {
            list.push(compileMarkDown(section, file));
        }
    }

    return list;
}

function compileMarkDown(section, filename) {
    let real_path = path.join(__dirname, "markdowns", section, filename);
    let content = fs.readFileSync(real_path).toString();
    let time = fs.statSync(real_path)["mtime"].toString();

    let index = content.indexOf('\n');
    let line = content.substr(0, index);
    content = content.substr(index + 1);
    let author = line.substr(8);
    let catalog = [];
    let current = catalog;
    let level = 0;
    let title = "";

    let stack = [];
    while (true) {
        index = content.indexOf('\n');
        line = content.substr(0, index);
        content = content.substr(index + 1);

        if (line === "---") {
            break;
        }

        for (let i = 6; i > 0; i--) {
            if (line.substr(0, i + 1) === repeat("#", i) + " ") {
                while (i - 1 < level) {
                    current = stack.pop();
                    level--;
                }

                stack.push(current);
                current.push({
                    "label": line.substr(i + 1),
                    "children": []
                });
                current = current[current.length - 1];

                if (i === 1) {
                    title = line.substr(i + 1);
                }

                break;
            }
        }
    }

    let name = filename.substr(0, filename.lastIndexOf('.'));
    fs.writeFileSync(path.join(__dirname, "templates", "public", section, name + ".md"), content);
    fs.writeFileSync(path.join(__dirname, "templates", "public", section, name + ".json"), JSON.stringify({"catalog": catalog}));

    return {
        id: name,
        name: section,
        title: title,
        author: author,
        time: time
    };
}

function repeat(str, times) {
    let res = "";
    while (times > 0) {
        res += str;
        times--;
    }

    return res;
}

function packJson(section, list) {
    let res = {};

    res["title"] = section["title"];
    res["full-intro"] = section["full-intro"];
    res["cover"] = section["cover"];
    res["tags"] = section["tags"];
    res["list"] = list;

    fs.writeFileSync(path.join(__dirname, "templates", "src", "assets", section["name"] + ".json"), JSON.stringify(res));
}