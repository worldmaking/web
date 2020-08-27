// IMPORTS
let fs = require('fs'),
    path = require('path'),
    appRoot = require('app-root-path');
const { stringify } = require('querystring');

module.exports = {
    read: read,
    exists: exists,
    delete: remove,
    write: write,
    create: create,
    listFiles: listFiles,
}

/**
 * Throws error if file not found
 * @param {*} path 
 */
function read (filePath){
    return new Promise((resolve) => {
        console.log('read ' + path.join(appRoot.path, filePath));
        resolve(fs.readFileSync(path.join(appRoot.path, filePath), 'utf8'));
    });
}

function exists (filePath){
    return new Promise((resolve) => {
        console.log('exists ' + path.join(appRoot.path, filePath));
            resolve(fs.existsSync(path.join(appRoot.path, filePath)));


    });
}


function remove (path){
    return new Promise((resolve) => {
        try{
            fs.unlinkSync(path)
            resolve(true);
        } catch {
            resolve(false);
        }
    });
}

function write (path, content){
    return new Promise((resolve) => {
        try{
            fs.writeFileSync(path, content);
            resolve(true);
        } catch {
            resolve(false);
        }
    });
}

function create (filePath, content){
    //console.log(path);
    return new Promise((resolve) => {
        resolve(fs.writeFileSync(path.join(appRoot.path, filePath), content) == undefined);
    });
    
}

function listFiles (target){
    return new Promise((resolve) => {
        resolve(fs.readdirSync(path.join(appRoot.path, target)));
    });
};
