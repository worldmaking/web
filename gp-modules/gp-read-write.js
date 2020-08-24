// IMPORTS
let fs = require('fs'),
    path = require('path'),
    appRoot = require('app-root-path');

/**
 * Throws error if file not found
 * @param {*} path 
 */
exports.read = function (path){
    var content;
    try{
        content = fs.readFileSync(path, 'utf8');
    } catch (e) {
        throw Error(e);
    }
    return content;
};

exports.exists = function (target){
    try {
        if(fs.existsSync(path.join(appRoot.path, target))){
            return true;
        } else
            return false;
      } catch(err) {
        return false;
      }
}

exports.delete = function(path){
    try {
        fs.unlinkSync(path);
    } catch (err) {
        throw Error(err);
    }
}

exports.write = function (path, content){
    //console.log(path);
    try{
        fs.writeFileSync(path, content);
        // fs.closeSync();
    } catch (e) {
        throw Error(e);
    }
}

exports.create = function (path, content){
    //console.log(path);
    fs.writeFile(path, content, function (e) {
        if (e) throw e;
    });
}

exports.listFiles = function (target){
    let ret = fs.readdirSync(path.join(appRoot.path, target));
    return ret;
};