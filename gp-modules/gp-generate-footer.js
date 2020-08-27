/**
 * GLOBAL REQUIREMENT
 * To import do var gp-gen-post = require(path);
 */

// Imports
const logger = require('./gp-logger');
var appRoot = require('app-root-path');
const path = require('path');
const rw = require('./gp-read-write');
const DOM = require('jsdom')

//const pointer = '<!-- update -->';

class A {
    constructor(templateName = 'worldmaking'){
        this.init(templateName);
    }
    async init(templateName) {
        this._filePath = path.join('gp-content/gp-themes/worldmaking/header.html');
        this._writePath = path.join(`gp-templates/main.html`);
        this.content = rw.read(this._filePath).then(console.log("finished ", this.content));
    }

    async generate(data = ["test"]) {
        let footer = this.constructFooter(data);
        let dom = new DOM.JSDOM(this.content);
        console.log(dom.serialize());
        // this.content = dom.window.document.getElementById("test").insertAdjacentHTML("afterbegin", footer);
        console.log(this.content);
        rw.write(this._writePath, "A" );
    }

    constructFooter(references){
        let footer = '';
        for (let index of references){
           //to be filled in
           footer = footer.concat(`
            <div class="test"> CONTENT </div>
            `)
        }
        return footer;
    }
}

async function main() {
    console.log('FOOTER');
    var item = await new A();
    var x = item.generate();
}

main();
