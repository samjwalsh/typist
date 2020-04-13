const fs = require('fs');

let words = JSON.parse(fs.readFileSync(`${__dirname}/wordListNew.json`, 'utf-8')).english;

let totalChars = 0;

let averageLength;

let totalWords = words.length;

words.forEach((element) => {
    totalChars = totalChars + element.length;
});

console.log(totalChars);

console.log(totalWords);

averageLength = totalChars / totalWords;

console.log(averageLength);
