// IMPORTS
let logger = require('./gp-modules/gp-logger.js'),
    inquirer = require('inquirer'),
    rw = require('./gp-modules/gp-read-write')
    inquery = require('./gp-modules/gp-inquery');

// Globals
let answer = null, themes, config, confContent;

async function main(){
    themes = rw.listFiles('./gp-content/gp-themes');
    config = './gp-config.json';

    logger.log('Welcome to GitPres static site generator. Follow the instruction to build your website.');
    answer = await inquery.bool('Setup new environment?');
    console.log(answer);
    if (answer){
        console.log('running init');
        initiate();
    }
    else{
        console.log('running build');
        buildModule();
    }
    
    
}

function initiate(){
    logger.warn(`Building new environment. Please clean up the workspace before you continue:\n
    1. Remove files within public_html directory
    2. Remove files within gp-templates directory`);
}

function buildModule(){

}


// function valAndBuildFiles() {
//     let fileArray = mdReader.getAllFiles();
//     for(let item of fileArray){
//         let content = rw.read(item);
        
//         if(content.match(new RegExp(/<!--\s*{.*/) && content.match(new RegExp(/.*}\s*-->/)))) {
//             let meta = JSON.parse(content.substring(content.indexOf('<!--') + 4, content.indexOf('-->')));
//             buildDatabase(meta);
//         } else {
//             logger.alert("PLEASE FIX THE FOLLOWING FILE", item);
//         }
//     }
// }

// function buildDatabase(metadata){
//     database.addEntry(metadata.title);
//     for(let k in metadata){
//         if(k != "title"){
//             database.addProp(k);
//             database[`set_${k}`](metadata.title, metadata[k]);
//         }
//     }
// }

//READ WRITE SECTION

// function generateIndex(){
// }


// Content Handler
// function handler(read_path, write_path){
  
// }

// Read File Logic
// function readFile(path){
  
// };

// Write File Logic
// function generateFile(path, content){
 
// }

main();