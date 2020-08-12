const rw = require('./rw');
const path = require('path');
const file_path = path.join(__dirname, '/data/data.json');

// Syncs the json file
exports.module = class {
    constructor(){
        this._file_path = file_path;
        if (rw.exists(this._file_path)){
            this._data = JSON.parse(rw.read(this._file_path));
        }
        else{ 
            rw.create(this._file_path, "{}");
            this._data = {};
        }
    }

    get data (){
        return this._data;
    }

    sync(){
        rw.write(file_path, JSON.stringify(this.data));
    }


    addProp (name = "", tags = [], authors = [], date = "", rel = ".", content = ""){
        let temp = {}
        temp.post_name = name;
        temp.post_tags = tags;
        temp.post_authors = authors;
        temp.post_rel = rel
        temp.post_content = content;
        this._data[name] = temp;
        this.sync();
    }

    remProp (post_name = ""){
        if (true){

        } else return false;
    }

    getPostByKey (ki, val){
        let ret = [];
        let temp = [];
        for (let outer in this._data){
            let data = this._data[outer][ki];
            if (Array.isArray(data)){
                if (data.includes(val))
                    ret.push(outer);
            } else
                if (data == val)
                    ret.push(outer);
        }
        return ret;
    }


}

let DataStructure = new this.module();
console.log(DataStructure._data);
console.log(DataStructure.getPostByKey("post_tags", "1"));