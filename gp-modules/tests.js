let fs = require('fs'),
    path = require('path'),
    appRoot = require('app-root-path'),
    database = require('./gp-database');

async function main () {
    let DataStructure = new database();
    await DataStructure.init();
    console.log(DataStructure.data);
    DataStructure.addEntry("Post 1");
    // DataStructure.addEntry("Post 2");
    // DataStructure.addEntry("Post 3");
    // DataStructure.showProps();
    // console.log(DataStructure.getAllEntries());
    // console.log(DataStructure.getEntry('Post 1'));
    // console.log(DataStructure.searchEntries('Post'));
}

main();