// IMPORTS
let logger = require('./gp-modules/gp-logger.js'),
    inquirer = require('inquirer'),
    rw = require('./gp-modules/gp-read-write');

// Globals
let themes, config, confContent;

async function main(){
    themes = rw.listFiles('./gp-content/gp-themes');
    config = './gp-config.json';

    /* Check if gp-config.json exists */
    if (!rw.exists(config))
        await initiate();
    else
        confContent = await rw.read(config);
    console.log(confContent);
    
}

async function initiate(){
    var questions = [
        {
        type: 'input',
        name: 'site_name',
        message: "What's your website's name >"
        },
        {
            type: 'list',
            name: 'site_theme',
            message: "Choose the theme you would like to use >",
            choices: themes
        }
    ];

    // valAndBuildFiles();
    logger.log('Welcome to GitPres static site generator. Follow the instruction to build your website.');
    inquirer.prompt(questions).then((answers) => {
        confContent = JSON.stringify(answers, null, '  ')
        rw.write(config, confContent);
    });
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