/**
 * GLOBAL REQUIREMENT
 * To import do var gp-gen-post = require(path);
 */

// Imports
const logger = require('./gp-logger');

module.exports = class {
    generate() {
        logger.log("Creating a post");
    }
}