
const cheerio = require('cheerio');
const TurndownService = require('turndown')

const $ = cheerio.load('');


let turndownService = new TurndownService()
let markdown = turndownService.turndown('');


// read in files

// for each file :

// manipulate the dom (if need be)

// convert html to markdown

// write file with .md extenstion
