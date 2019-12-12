const path = require('path');
const folderPath = path.join(__dirname, 'file/');
const finalfilePath = path.join(__dirname, 'finalResult/final.txt')
const fs = require('fs');

fs.readdirSync(folderPath).forEach(file => {
    var fileName = file;
    if (fileName !== 'data.txt') {
        fs.readFile(path.join(__dirname, `file/${fileName}`), 'utf8', function(err, data) {  
            if (err) throw err;
            var strippedHtml = data.replace(/<(?:.|\n)*?>/gm, '');
            fs.appendFile(finalfilePath, strippedHtml.trim(), function (err) {
                if (err) throw err;
            });
        });
    }
});
