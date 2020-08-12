// IMPORTS
const fs = require('fs');

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

exports.exists = function (path){
    try {
        if(fs.existsSync(path))
            return true;
        else
            return false
      } catch(err) {
        return false;
      }
}

exports.write = function (path, content){
    console.log(path);
    try{
        fs.writeFileSync(path, content);
    } catch (e) {
        throw Error(e);
    }
}

exports.create = function (path, content){
    console.log(path);
    fs.writeFile(path, content, function (e) {
        if (e) throw e;
    });
}