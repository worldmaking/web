/**
 * GLOBAL REQUIREMENT
 * To import do var gp-gen-post = require(path);
 */

// Imports
const logger = require('./gp-logger');
var appRoot = require('app-root-path');
const path = require('path');
const rw = require('./gp-read-write');
//const dom = require('jsdom')

const pointer = '<!-- update -->';

exports.item = class {
    constructor(templateName = 'worldmaking'){
        this._filePath = path.join(appRoot.path,`gp-content/gp-themes/${templateName}/footer.html`);
        this._writePath = path.join(appRoot.path,`gp-templates/footer.html`);
        this.content = rw.read(this._filePath);
    }
    generate() {
        
        let footer = this.constructFooter();
        
        this.content = this.content.replace(pointer, footer);
        
       rw.write(this._writePath, this.content);
    }
    constructFooter(references){
        let footer = '';
        for (let index of references){
           //to be filled in
           footer = footer.concat(`
            
            `)
        }
        return footer;
    }
}

console.log('FOOTER');
var item = new this.item();
var x = item.generate();