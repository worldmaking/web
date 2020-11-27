let fs = require("fs"),
  path = require("path"),
  appRoot = require("app-root-path"),
  database = require("./gp-database"),
  rw = require("./gp-read-write"),
  specials = require("./gp-specials-converter"),
  mdreader = require("./gp-md-reader");

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

  let special = new specials({ yummy: { conversion: "div", class: "yummy" } });
  let file = await rw.read("./gp-modules/test.md");

  let parsed = special.parseSpecials(file);
  parsed = mdreader.parseFile(parsed);
  //parsed = special.reparse(parsed);

  // let parsed = mdreader.parseFile(file);
  // parsed = special.parseSpecials(parsed);
  rw.write("./gp-modules/test.html", parsed);
}

main();
