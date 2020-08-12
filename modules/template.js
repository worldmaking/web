// IMPORTS
const logger = require('./logger');
const fs = require('fs');
const path = require('path');
const home_dir = path.join(__dirname, '..')


// Read File Logic
// NOTE FILE PATH IS DEFAULT AT web DIRECTORY
function readFile(filepath){
    let content;
    filepath = path.join(home_dir, filepath)
    console.log(filepath);
    try{
        content = fs.readFileSync(filepath, 'utf8');
        logger.clear("Read", path)
    } catch (e) {
        logger.alert(e);
        process.exit(1);
    }
    return content;
};

exports.header = function (){
    let content = readFile("/content/templates/header.html");
    return content;
}

exports.footer = function (){
    let content = readFile("/content/templates/footer.html");
    return content;
}