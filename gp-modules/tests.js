let fs = require("fs"),
  path = require("path"),
  appRoot = require("app-root-path"),
  database = require("./gp-database"),
  rw = require("./gp-read-write"),
  specials = require("./gp-specials-converter");

async function main() {
  // let DataStructure = new database();
  // await DataStructure.init();
  // console.log(DataStructure.data);
  // DataStructure.addEntry("Post 1");
  // DataStructure.addEntry("Post 2");
  // DataStructure.addEntry("Post 3");
  // DataStructure.removeEntry("Post 3");
  // //DataStructure.showProps();
  // //console.log(DataStructure.getAllEntries());
  // console.log(DataStructure.getEntry("Post 1"));
  // console.log(DataStructure.searchEntries("Post"));
  // //console.log(DataStructure.data);
  // // console.log(rw.read(`gp-content/gp-themes/worldmaking/header.html`));

  let special = new specials();
  let parsed = special.parseSpecials(await rw.read("./gp-modules/test.md"));
  rw.write("./gp-modules/test.html", parsed);
}

main();
