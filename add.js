const path = require("path");
const fs = require("fs");

module.exports = {
    add: function (name) {
        const dir = path.join(__dirname, "markdowns", name);
        if (fs.existsSync(dir)) {
            console.log("this directory exists.");
            return;
        }

        fs.mkdirSync(dir);
        let config = JSON.parse(fs.readFileSync(path.join(__dirname, "markdowns", "catalog.json")));
        config["sections"].push({
            "name": name,
            "title": "专栏标题",
            "cover": "专栏封面",
            "intro": "专栏简介",
            "full-intro": "这里是专栏的完整介绍",
            "tags": []
        });

        fs.writeFileSync(path.join(__dirname, "markdowns", "catalog.json"), JSON.stringify(config));
        console.log("create " + name + " successfully.");
    }
}