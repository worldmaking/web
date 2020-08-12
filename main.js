// IMPORTS
const logger = require('./modules/logger.js');
const { exit } = require('process');
const parser = require('./modules/parser');
const template = require('./modules/template');
const fs = require('fs'),
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
    parser.parseFile();
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
    handler(path, './sample.html')
}


// Content Handler
function handler(read_path, write_path){
    logger.note("Reading contents of:", read_path);
    let content = readFile(read_path);
    logger.note("Writing to:", write_path);
    generateFile(write_path, content);
    logger.clear('Content written to', write_path);
}

// Read File Logic
function readFile(path){
    var content;
    try{
        logger.log("...");
        content = fs.readFileSync(path, 'utf8');
        logger.clear("Read", path)
    } catch (e) {
        logger.alert(e);
        process.exit(1);
    }
    return content;
};

// Write File Logic
function generateFile(path, content){
    // Update the raw content to HTML
    let header_content = template.header();
    let footer_content = template.footer();
    try{
        content = parser.parseFile(content);
        content = header_content + content + footer_content;
        fs.writeFileSync(path, content);
    } catch (e) {
        logger.alert(e);
        process.exit(1);
    }
}