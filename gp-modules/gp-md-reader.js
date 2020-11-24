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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut" +
    "labore et dolore magna aliqua. [flipcard] This is a card [/flipcard] Praesent tristique magna sit amet purus. [flipcard] This is a card 2 [/flipcard] ";

  let regex = /\[flipcard\](.*?)\[\/flipcard\]/g;

  /*
      /\[flipcard\](.*?)\[\/flipcard\]/g
      /\[slider\](.*?)\[\/slider\]/g
      /\[button\](.*?)\[\/button\]/g
      /\[image\](.*?)\[\/image\]/g
      /\[embed\](.*?)\[\/embed\]/g
      /\[column\](.*?)\[\/column\]/g
      /\[div\](.*?)\[\/div\]/g
  */

  var matches,
    output = [];
  while ((matches = regex.exec(input))) {
    output.push(matches[1]);
  }
  return output;
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
