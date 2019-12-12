const fs = require('fs');
const path = require('path');
const readLine = require('readline');
const filePath = path.join(__dirname, 'file/data.txt');
const request = require('request');
const ids = [];

var rd = readLine.createInterface({
    input: fs.createReadStream(filePath),
    console: false
});

rd.on('line', function(line) {
    if (ids.indexOf(line) < 0) {
        ids.push(line);
    };
});

rd.on('close', () => {
    var i = 0;
    ids.forEach((val) => {
        setTimeout(()=> {
            request(`${val}`, { json: true }, (err, res, body) => {
                if (err) { 
                    return console.log(err); 
                } else {
                   var startIndex = body.indexOf('<h1>'),
                       endIndex = body.indexOf('<div class="galeria" id="galeria-fabricante">');
                    var sb = body.substr(startIndex, endIndex);
                    i++;
                    if (sb.length > 0) {
                        fs.writeFile(`file/result${i}.txt`, sb, function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });
                    }
                }
            });
        }, 600);
    });
})
