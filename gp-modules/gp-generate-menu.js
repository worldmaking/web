/**
 * GLOBAL REQUIREMENT
 * To import do var gp-gen-post = require(path);
 */

// Imports
const logger = require('./gp-logger');
var appRoot = require('app-root-path');
const path = require('path');
const rw = require('./gp-read-write');

const pointer = '<!-- update -->';
const pointerMobile = '<!-- update mobile -->';

exports.item = class {
    constructor(templateName = 'worldmaking'){
        this._filePath = path.join(appRoot.path,`gp-content/gp-themes/${templateName}/menu.html`);
        this._writePath = path.join(appRoot.path,`gp-temp/menu.html`);
        this.content = rw.read(this._filePath);
    }
    generate(pages = [['home' , 'index.html'], ['contact us', 'contact.html'], ['about us', 'about.html']]) {
        let nav = this.constructNav(pages);

        this.content = this.content.replace(pointer, nav);
        this.content = this.content.replace(pointer, nav);
        
        rw.write(this._writePath, this.content);
    }

    constructNav(references){
        let nav = '';
        for (let index of references){
            nav = nav.concat(`
            <li class="menu-item">
                <a href="${index[1]}">${index[0]}</a>
            </li>`)
        }
        return nav;
    }
}

// 1. Reads an HTML file.

console.log('HOLA');
var item = new this.item();
var x = item.generate();