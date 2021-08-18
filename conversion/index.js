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

const log = m => console.log(m);

fs.readdir(postsDir, (err, filenames) => {
    if (err) {
        console.log('Error reading file directory: ' + filenames);
        console.log(err);
        return;
    }

    console.log('Starting to read files...');

    filenames.forEach(filename => {

        fs.readFile(postsDir + filename, 'utf-8', (err, content) => {

            if (err) {
                console.log(`Error reading file: ${filename}`);
                console.log(err);
                return;
            }

            // manipulate the dom (if need be)
            $ = cheerio.load(content);
            let $body = $('body');

            // get date to reference file name
            let timestamp = $('#timestamp').html().trim();
            let formattedDate = formatDate(timestamp);

            // now that we have the date remove it from the markup
            $('#footer').remove();

            // need the title for the post hard
            const title = $('h1').html().trim();

            // don't need the header in the body anymore, so remove it
            $('h1').remove();

            // remove blank lines to clean things up a bit.
            // and remove extra space on each line
            html = $body.html().replace(/(^[ \t]*\n)/gm, "")
                .split("\n")
                .map(line => line.trim())
                .join('');

            // write YAML header
            const header = `---
                extends: _layouts.post
                section: content
                title: ${title}
                date: ${formattedDate}
                ---
            `.split("\n")
            .map(line => line.trim())
            .join("\n");

            // convert html to markdown
            turndownService = new TurndownService();
            let markdown = turndownService.turndown(html);

            markdown = markdown.replace(formattedDate, '')
            markdown = header + "\n" + markdown;

            // write file with title as name and with .md extenstion
            let markDownFilename = title.split(' ')
                .map(word => word.toLowerCase())
                .join('-')
                .replace("'", '')
                + '.md';

            fs.writeFileSync(`${outputDir}${markDownFilename}`, markdown);
            console.log(`File writtern - ${markDownFilename}`);
        });
    });
});
