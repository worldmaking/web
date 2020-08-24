/**
 * GLOBAL REQUIREMENT
 * To import do var gp-gen-post = require(path);
 */

// Imports
const logger = require('./gp-logger');
var appRoot = require('app-root-path');
const path = require('path');

exports.item = class {
    constructor(fileName){
        this._savePath = path.join(appRoot.path, "/public_html");
    }
    generate() {
        logger.log("Creating a page");
    }
}



var club = new this.item();
console.log();