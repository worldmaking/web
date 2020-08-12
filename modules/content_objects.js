const fs = require('fs');
const path = require("path");
const filepath = path.join(__dirname, '../_content');

exports.module = class {
    constructor() {
    }

    getAllFiles(dirPath = filepath, arrayOfFiles = []) {
        let files = fs.readdirSync(dirPath);
        var self = this;
        arrayOfFiles = arrayOfFiles || [];

        files.forEach(function(file) {
            if (fs.statSync(dirPath + "\\" + file).isDirectory()) {
                arrayOfFiles = self.getAllFiles(dirPath + "\\" + file, arrayOfFiles);
            } else {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        });

        return arrayOfFiles;
    }
}

let example = new this.module();

let array = example.getAllFiles();
console.log(array);