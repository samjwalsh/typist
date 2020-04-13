const fs = require('fs');

let words = JSON.parse(fs.readFileSync(`${__dirname}/wordList.json`, 'utf-8')).english;

console.log(typeof words);

const capWords = (words, min, max) => {
    let result = new Array();
    console.log(words);
    words.forEach((element) => {
        if (element.length >= min && element.length <= max) {
            result.push(element);
        }
    });
    return result;
};

let newWords = JSON.stringify(capWords(words, 3, 8));

console.log(newWords.length);

fs.writeFileSync(`${__dirname}/wordListNew.json`, newWords);
