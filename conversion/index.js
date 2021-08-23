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

            // clear html by removing all of the white space and store all of the
            // lines in an array - this makes it easier to work with going forward
            let bodyArray = $body.html().replace(/(^[ \t]*\n)/gm, "")
                .split("\n")
                .map(line => line.trim());

            // replace the pizza image with the one in the assets folder
            // first we need to find the line with the rating on it
            let rating = 0;
            bodyArray.forEach(line => {
                if (line.includes('Final Rating')) {
                    // found the line - now parse it and find the number
                    line.split('').forEach(c => {
                        if (!isNaN(parseInt(c))) {
                            // found the number - set the rating.
                            rating = parseInt(c);
                        }
                    });
                }
            });

            // if there is no rating, this not not an actual published post, 
            // so ignore and move on the the next one
            if (rating === 0) {
                return;
            }

            // next remove the last two lines of the file, this *almost* always contains the 
            // the image reference to either tumblr's CDN or in the assets folder of the downloaded files
            // plus an extra new line
            bodyArray = bodyArray.slice(0, -2);

            let ratingFilename = `/assets/img/pizza${rating}_sm.jpg`;

            // add the last line with is the pizza image
            bodyArray.push(`<p><img src="${ratingFilename}" alt="Rating: ${rating} Slices" /></p>`);


            // finally, build the html string
            let html = bodyArray.join('');

            // write YAML header
            const header = `---
                extends: _layouts.post
                section: content
                title: ${title}
                date: ${formattedDate}
                rating: ${rating}
                ---
            `.split("\n")
            .map(line => line.trim())
            .join("\n");

            // convert html to markdown
            turndownService = new TurndownService();
            let markdown = turndownService.turndown(html);

            markdown = markdown.replace(formattedDate, '')
            markdown = header + "\n" + markdown;

            // write file with title as name and with .md extenstion (along with 
            // removing ampersand and single quotes)
            let markDownFilename = title.split(' ')
                .map(word => word.toLowerCase())
                .join('-')
                .replace("'", '')
                .replace('-&amp;-', '-')
                + '.md';

            // add the date to the front of the file name (this is how jigsaw orders them)
            markDownFilename = `${formattedDate}-${markDownFilename}`;

            fs.writeFileSync(`${outputDir}${markDownFilename}`, markdown);
            console.log(`File writtern - ${markDownFilename}`);
        });
    });
});
