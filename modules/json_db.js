const rw = require('./rw');
const path = require('path');

/**
 * JSON Data File Module.
 * The key of every object is post_type's name
 * @constructor Takes required fields and syncs it across all existing entries
 * @data Returns JSON string of all entries
 * @addProp Creates new field and syncs it across all entries
 * @addEntry Creates new entry
 * @getEntry returns an entry (by name)
 * @getAllEntries returns all entries
 * @searchEntry returns a list of all entries containing given string
 * @showProps shows the property of the object
 * @syncEntryProp syncs fields of given entry
 * @sync writes JSON output file
 *  */
exports.module = class {
    constructor(...args){
        this._dataProps = [];
        for (let item of args){
            this._dataProps.push(`post_${item}`);
        }
        this._file_path = path.join(__dirname, '/data/data.json');

        if (rw.exists(this._file_path)){
            this._data = JSON.parse(rw.read(this._file_path));
        }
        else{ 
            rw.create(this._file_path, "{}");
            this._data = {};
        }

        let first = Object.keys(this._data)[0];
        for (let k in this._data[first]){
            k = k.toString().replace('post_', '');
            this.addProp(k);
        }
    }

    get data (){
        return this._data;
    }

    addProp(propName){
        if(!this._dataProps.includes(`post_${propName}`)){
            console.log(`Not detected post_${propName}`)
            this._dataProps.push(`post_${propName}`);
            this[`set_${propName}`] = function(obj, val){
                this._data[`${obj}`][`post_${propName}`] = val;
            };
            for (let k in this._data){
                if(!this._data[k].hasOwnProperty(`post_${propName}`)){
                    this._data[k][`post_${propName}`] = '';
                }
            }
            this.sync();  
        }
    }

    addEntry(entry){
        if(!this._data.hasOwnProperty(entry)){
            console.log(`New ${entry} added.`);
            for (let prop of this._dataProps){
                this._data[entry] = {}
                this.syncEntryProp(entry);
                this.sync();
            }
                
        }
        else{
            console.log(`${entry} existed.`);
        }
        
    }

    getEntry (entry){
        return this._data[entry];
    }

    getAllEntries(){
        let ret = [];
        for (let entry in this._data){
            ret.push(`${entry}`);
        }
        return ret;
    }

    searchEntries(query){
        let ret = [];
        for (let entry in this._data){
            if (`${entry}`.includes(query))
            ret.push(`${entry}`);
        }
        return ret;
    }

    showProps() {
        var result = ``;
        console.log('running show-prop')
        for (var i in this) {
            console.log(`DataType.${i}`,this[i]);
        }
        return result;
    }

    syncEntryProp(entry){
        for (let prop of this._dataProps){
            if(!this._data[entry].hasOwnProperty(prop)){
                this._data[entry][`${prop}`] = '';
            }
        }
    }

    sync(){
        rw.write(this._file_path, JSON.stringify(this._data));
    }

}

// TEST CASES

// let DataStructure = new this.module("author");
// console.log(DataStructure.data);
// DataStructure.addEntry("Post 1");
// DataStructure.addEntry("Post 2");
// DataStructure.addEntry("Post 3");
// DataStructure.showProps();
// console.log(DataStructure.getAllEntries());
// console.log(DataStructure.getEntry('Post 1'));
// console.log(DataStructure.searchEntries('Post'));
