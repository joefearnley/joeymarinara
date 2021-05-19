const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const date = require('date-and-time');

const postsDir = '../posts/html/';
const outputDir = '../posts/markdown/';
let $ = null;

fs.readdir(postsDir, (err, filenames) => {
    if (err) {
        console.log('Error reading file directory: ' + filenames);
        console.log(err);
        return;
    }

    console.log('Starting to read files...');

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

            // get date to reference file name
            let $timestamp = $('#timestamp').html();
            console.log($timestamp);

            const pattern = date.compile('MMM DDD, YYYY H:ma');
            let formattedDate = date.parse($timestamp, pattern);

            // const pattern = date.compile('YYYY-MM-DD h:m:s A');
            // let formattedDate = date.parse('Mar 22 2019 2:54:21 PM', pattern);

            console.log(formattedDate);

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

            fs.writeFileSync(`${outputDir}  ${formattedDate}_${markDownFilename}`, markdown);
            console.log('File writtern.');
        });
    });
});
