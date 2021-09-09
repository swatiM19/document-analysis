const API_KEY='dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9';
const fetch = require("node-fetch");
const request = require("request-promise");
const _ = require('lodash');


async function getWordInfoFromDict(wordElement) {
    try {
        return request('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + API_KEY + '&lang=en-en&text=' + wordElement);

    } catch (error) {
        console.log(error);
    }
};

async function getDataFromURL() {
    // read text from document
    const url = 'http://norvig.com/big.txt';
    try {
        const response = await fetch(url);
        const responseText = await response.text();
        await processData(responseText);
    }
    catch(error) {
        console.log(error);
    }
};

function getWordCountHelper(array) {
    let map = {};
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        map[item] = (map[item] + 1) || 1;
    }
    return map;
}

function sortAndSlice(data) {
    let sortedWords =  Object.keys(data).sort(function (a, b) {
        return  data[b] - data[a] ;
    });
    return sortedWords.slice(0, 10);
}

async function processData(data) {
    try {
        let words = data.split(/[ \.\?!,\*'"]+/);
        let wordsWithCount = getWordCountHelper(words);  // count of each word
        let newArr = sortAndSlice(wordsWithCount); // sort and send only top 10.

        let result = [];
        for (let word of newArr) {
            let wordInfo = await getWordInfoFromDict(word); // get synom, pos , mean of word from API
            wordInfo = JSON.parse(wordInfo);
            let obj = {
                "count": wordsWithCount[word]   // format the data and put it in object.
            };
            if (!_.isEmpty(wordInfo.def[0])) {
                if (_.has(wordInfo.def[0] , 'pos')) {
                    obj.pos = wordInfo.def[0].pos;
                } else {
                    obj.pos = "-";
                }
                if (_.has(wordInfo.def[0] , 'syn')) {
                    obj.synonyms = wordInfo.def[0].syn;
                } else {
                    if (_.has(wordInfo.def[0] , 'mean')) {
                        obj.synonyms = wordInfo.def[0].mean;
                    } else {
                        obj.synonyms = "-";
                    }
                }
            } else {
                obj.synonyms = "-";
                obj.pos = "-";
            }
            result.push({
                'word': word,
                'output': obj,
            });

        }
        console.log('result: ', JSON.stringify(result)); // formatted result
    } catch (error) {

    }
}

getDataFromURL();
