// IMPORTS
const logger = require('./modules/logger.js');
const { exit, rawListeners } = require('process');
const mdReader = require('./modules/mdReader');
const template = require('./modules/template');
const path = require('path')   
const filePath = path.join(__dirname);
const db = require('./modules/json_db');
const rw = require("./modules/rw");


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
    valAndBuildFiles();
};

function valAndBuildFiles() {
    let fileArray = mdReader.getAllFiles();
    for(let item of fileArray){
        let content = rw.read(item);
        
        if(content.match(new RegExp(/<!--\s*{.*/) && content.match(new RegExp(/.*}\s*-->/)))) {
            let meta = JSON.parse(content.substring(content.indexOf('<!--') + 4, content.indexOf('-->')));
            buildDatabase(meta);
        } else {
            logger.alert("PLEASE FIX THE FOLLOWING FILE", item);
        }
    }
}

function buildDatabase(metadata){
    database.addEntry(metadata.title);
    for(let k in metadata){
        if(k != "title"){
            database.addProp(k);
            database[`set_${k}`](metadata.title, metadata[k]);
        }
    }
}

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