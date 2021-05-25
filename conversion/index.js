const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const postsDir = '../posts/html/';
const outputDir = '../posts/markdown/';
let $ = null;

const formatDate = date => {
    let parts = date.split(' ');

    let months = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
    let monthNumber = months.indexOf(parts[0]);

    let dayNumber = parts[1].slice(0, -3);

    let year = parts[2];
    let month = (monthNumber < 10) ? `0${monthNumber}` : monthNumber.toString();
    let day = (dayNumber < 10) ? `0${dayNumber}` : dayNumber.toString();

    return `${year}-${month}-${day}`;
};

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
            let $timestamp = $('#timestamp').html().trim();
            let formattedDate = formatDate($timestamp);

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

            fs.writeFileSync(`${outputDir}${formattedDate}_${markDownFilename}`, markdown);
            console.log(`File writtern - ${markDownFilename}`);
        });
    });
});
