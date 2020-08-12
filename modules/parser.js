// Create reference instance
const marked = require('marked');

// Set options
// `highlight` example uses `highlight.js`
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
      const hljs = require('highlight.js');
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      return hljs.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });
  
  // Compile

  const fs = require("fs"),
  path = require("path");

exports.parseFile = function(content='no-content-found'){
    return marked(content);
}