// IMPORTS
var logger = require('./run/logger.js');
const { exit } = require('process');
var fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'start.html'),
    util = require("util");

// CLI
const ARGS = process.argv.slice(2);
if (ARGS.length == 0){
    main();
}
if (ARGS.includes("help") || ARGS.includes("h")){
    help();
}
else if (ARGS.includes("help:comments") || ARGS.includes("h:comments")){
    commenting();
}

function help(){
    logger.log("HERE IS YOUR HELP");
}

function commenting(){
    logger.log("HERE ARE THE SAMPLE COMMENT FORMATS");
    logger.alert('Here is an alert example [logger.alert(...args)]');
    logger.note('Here is an notice example [logger.note(...args)]');
    logger.warn('A warning for user [logger.warn(...args)]');
    logger.clear('Here is an message after success example [logger.clear(...args)]');
}

function main(){
    logger.log('Starting up');
    generateIndex();
};


//READ WRITE SECTION

function generateIndex(path='./content/index.md'){
    logger.note("Reading home page content");
    var content;
    try{
        logger.log("...");
        content = fs.readFileSync(path, 'utf8');
        logger.clear("Read", path)
    } catch (e) {
        logger.alert(e);
    }
    logger.log("...");
    generateFile('./sample.html', content)
}

function generateFile(path, content){
    fs.writeFile(path, content, function (err) {
        if (err) {
            console.log(err);
        } else
            logger.clear('Content written to', path);
        });
}