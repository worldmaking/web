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
        this._filePath = path.join(appRoot.path,`gp-content/gp-themes/${templateName}/header.html`);
        this._writePath = path.join(appRoot.path,`gp-templates/header.html`);
        this.content = rw.read(this._filePath);
    }
    generate(metaData = [['description', 'wdnaodnoa'], ['authors', ['graham']], ['keywords', ['dawda','dwada']]]) {
        
        let header = this.constructHeader(metaData);
        
        this.content = this.content.replace(pointer, header);
        
       rw.write(this._writePath, this.content);
    }
    // getMeta(metaName) {
    //     let dom1 = new dom.JSDOM(this.content);

    //     const metas = dom1.window.document.getElementsByTagName('meta');
    //     for (let i = 0; i < metas.length; i++) {
    //         if (metas[i].getAttribute('name')) {
    //          console.log(metas[i].getAttribute('content'));
    //         }
    //     }
      
    //     return '';
    //   }
    constructHeader(references){
        let header = '';
        for (let index of references){
            header = header.concat(`
            <meta name="${index[0]}" content="${index[1]}">`)
        }
        return header;
    }
}

console.log('HEADER');
var item = new this.item();
var x = item.generate();