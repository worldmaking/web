const rw = require('./rw');
path = require('path'),    
file_path = path.join(__dirname, '/data/data.json'),

// Syncs the json file
exports.module = class {
    constructor(){
        this._file_path = file_path;
        console.log(rw.exists(this._file_path));
        if (rw.exists(this._file_path))
            this._data = JSON.parse(rw.read(this._file_path));
        else{ 
            rw.create(this._file_path, '');
            this._data = {};
        }
    }
}

let DataStructure = new this.module();