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

function buildRegex(specialsObj) {
  let reg = "";
  let i = 0;
  for (key in specialsObj) {
    i++;
    reg += "(?<" + key + ">\\[" + key + "(.*?)\\](.*?)\\[\\/" + key + "\\])";
    if (i < Object.keys(specialsObj).length) {
      reg += "|";
    }
  }
  return new RegExp(reg, "g");
}

exports.parseSpecialElements = function () {
  var input =
    "Lorem ipsum dolor sit amet,[div] booto [/div] consectetur adipiscing elit, sed [image] gross [/image] do eiusmod tempor incididunt ut" +
    "labore et dolore magna aliqua. [flipcard color:blue] [button text:orange]This is a card [/button] [/flipcard] Praesent tristique magna sit amet purus. [button] This is a button 2 [/button] ";

  let specialsObj = {
    flipcard: "flipcard",
    button: "button",
    slider: "slider",
    image: "image",
    embed: "embed",
    column: "column",
    div: "div",
  };
  let reg = buildRegex(specialsObj);

  let matches;
  while ((matches = reg.exec(input)) !== null) {
    let i = 0;
    for (const [key, value] of Object.entries(matches.groups)) {
      i++;
      if (value !== undefined) {
        input = input.replace(value, () => {
          let innerText = "";
          //this is any inner elements in a special like [slider color: blue] gets "color: blue"
          if (matches[i * 3 - 1] !== undefined) {
            innerText = matches[i * 3 - 1];
          }
          return (
            "<" + key + ">" + innerText + matches[i * 3] + "</" + key + ">"
          );
        });
      }
    }
    reg.lastIndex = 0;
  }

  input = "<div>" + input + "</div>";
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
