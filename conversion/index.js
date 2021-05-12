const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown')

const postsDir = '../posts/html/';
const outputDir = '../posts/markdown/';
let $ = null;

fs.readdir(postsDir, (err, filenames) => {
    if (err) {
        console.log('Error reading file directory: ' + filenames);
        console.log(err);
        return;
    }

    filenames.forEach(filename => {
        fs.readFile(postsDir + filename, 'utf-8', function(err, content) {
            if (err) {
                console.log('Error reading file:' + filename);
                console.log(err);
                return;
            }

            // manipulate the dom (if need be)
            $ = cheerio.load(content);
            let html = $('body').html();

            // remove blank lines to clean things up a bit.
            // and remove extra space on each line
            html = html.replace(/(^[ \t]*\n)/gm, "")
                .split("\n")
                .map(line => line.trim())
                .join('');

            // convert html to markdown
            turndownService = new TurndownService();
            let markdown = turndownService.turndown(html);

            // write file with .md extenstion
            let markDownFilename = filename.replace('html', 'md');
            fs.writeFileSync(outputDir + markDownFilename, markdown);
        });
    });
});
