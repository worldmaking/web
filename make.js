#!/usr/bin/env node

/*

Turn a formatted markdown into HTML.

*/

const fs = require("fs"),
	path = require("path");
const marked = require("marked");

const buildpath = "./";	
const contentpath = "content";

// this is going to need a few passes. 
// first pass parses all the files (pages, posts, tables) & collects their metadata etc.
// so that navigation/menu stuff can be generated.
// second pass actually generates the html pages.

fs.readdirSync(contentpath).forEach((filename, i)=>{
	const filepath = path.join(contentpath, filename);
	const stat = fs.lstatSync(filepath);
	if (!stat.isDirectory()) {
		const ext = path.extname(filename);
		if (ext == ".md") {
			const basename = path.basename(filename, ext);
			const src = fs.readFileSync(filepath, "utf8");
			const outpath = path.join(buildpath, basename + ".html");

			// here we convert markdown into html:
			// see https://github.com/markedjs/marked
			const html = marked(src);

			// probably this needs to be embedded into some kind of template

			console.log("writing", outpath);
			fs.writeFileSync(outpath, html);
		}	
	}
})