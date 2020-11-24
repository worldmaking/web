// Create reference instance
const marked = require("marked");
const fs = require("fs");
const path = require("path");
const filepath = path.join(__dirname, "../gp-content");

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    const hljs = require("highlight.js");
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

// Compile

exports.parseFile = function (content = "no-content-found") {
  return marked(content);
};

exports.readMetadata = function () {};

exports.parseSpecialElements = function () {
  var input =
    "Lorem ipsum dolor sit amet,[div] booto [/div] consectetur adipiscing elit, sed [image] gross [/image] do eiusmod tempor incididunt ut" +
    "labore et dolore magna aliqua. [flipcard] This is a card [/flipcard] Praesent tristique magna sit amet purus. [button] This is a button 2 [/button] ";

  let regex = /\[flipcard.*?\](.*?)\[\/flipcard\]/g;
  let specials = ["flipcard", "button"];
  let specialsObj = {
    flipcard: "flipcard",
    button: "button",
    slider: "slider",
    image: "image",
    embed: "embed",
    column: "column",
    div: "div",
  };
  let reg = new RegExp(
    "\\[(" +
      Object.keys(specialsObj).join(".*?|") +
      ".*?)\\](.*?)\\[\\/(" +
      Object.keys(specialsObj).join("|") +
      ")\\]",
    "g"
  );
  /*
      /\[flipcard.*?\](.*?)\[\/flipcard\]/g
      /\[slider.*?\](.*?)\[\/slider\]/g
      /\[button.*?\](.*?)\[\/button\]/g
      /\[image.*?\](.*?)\[\/image\]/g
      /\[embed.*?\](.*?)\[\/embed\]/g
      /\[column.*?\](.*?)\[\/column\]/g
      /\[div.*?\](.*?)\[\/div\]/g
  */

  var matches,
    output = [];
  while ((matches = reg.exec(input))) {
    console.log(matches);
    input = input.replace(matches[0], () => {
      return "<" + matches[1] + ">" + matches[2] + "</" + matches[1] + ">";
    });
  }

  return input;
};

exports.getAllFiles = function (dirPath = filepath, arrayOfFiles = []) {
  let files = fs.readdirSync(dirPath);
  var self = this;
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "\\" + file).isDirectory()) {
      arrayOfFiles = self.getAllFiles(dirPath + "\\" + file, arrayOfFiles);
    } else {
      if (path.extname(file) == ".md") {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
};

// TEST
let array = this.getAllFiles();
console.log(array);

let special = this.parseSpecialElements();
console.log(special);
