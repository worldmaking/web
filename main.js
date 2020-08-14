// IMPORTS
const logger = require('./modules/logger.js');
const { exit } = require('process');
const mdReader = require('./modules/mdReader');
const template = require('./modules/template');
const path = require('path')   
const filePath = path.join(__dirname);
const db = require('./modules/json_db');


const database = new db.module();

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

};


//READ WRITE SECTION

function generateIndex(){
}


// Content Handler
function handler(read_path, write_path){
  
}

// Read File Logic
function readFile(path){
  
};

// Write File Logic
function generateFile(path, content){
 
}