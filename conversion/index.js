const fs = require('fs');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const dateTime = require('date-and-time');
const ordinal = require('date-and-time/plugin/ordinal');
const meridiem = require('date-and-time/plugin/meridiem');

dateTime.plugin(ordinal);
dateTime.plugin(meridiem);

const postsDir = '../posts/html/';
const outputDir = '../posts/markdown/';
let $ = null;

const formatDate = date => {
    let parts = date.split(' ');

    console.log(parts);
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
            // console.log(formatDate($timestamp));

            //const pattern = dateTime.compile('MMMM DDD, YYYY h:mma');
            //const pattern = dateTime.compile('YYYY-MM-DD');
            let formattedDate = dateTime.parse($timestamp, 'MMMM DDD, YYYY h:mma');

            //console.log(dateTime.parse('November 22nd, 2010 12:57pm', pattern));

            const pattern = dateTime.compile('MMMM DDD, YYYY h:mma');
            console.log(dateTime.parse('November 22nd, 2010 12:57pm', pattern));

            // console.log(dateTime.parse('2015/01/02 23:14:05', 'YYYY/MM/DD HH:mm:ss'));
            // console.log(dateTime.parse('02-01-2015', 'DD-MM-YYYY'));

            // const pattern = dateTime.compile('YYYY-MM-DD h:m:s A');
            // let formattedDate = date.parse('Mar 22 2019 2:54:21 PM', pattern);

            // console.log(formattedDate);
            console.log('');


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
            console.log('File writtern.');
        });
    });
});
