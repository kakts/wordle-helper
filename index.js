'use strict';

const readline = require('readline');
const { stdin, stdout} = require('process');

const util = require('./lib/util');
const {checkStrLength, checkAnswerList} = require('./lib/checker');

const { makeGrepCondition, getCandidatesWords } = require('./lib/search');

let tryCount = 0;

const correctAnswerArr = [];


function ask(query) {
    // Create readline interface each time.
    const rl = readline.createInterface({ input: stdin, output: stdout, terminal: true});
    return new Promise(resolve => rl.question(query, (ans) => {
        rl.close();
        resolve(ans);
    }))
}
const charUsedMap = util.initializeCharUsedMap();
console.log(charUsedMap)
console.log('============================');
console.log('Wordle Solver!.');
console.log('============================\n');

function setCharUsedMap(answer, hitList, charUsedMap, correctAnswerArr) {
    const duplicateCharMap = {}
    for (let i = 0, len = hitList.length; i < len; i++) {
        const hitChar = hitList[i];
        const answerChar = answer[i];
        const usedMap = charUsedMap[answerChar];
        duplicateCharMap[answer[i]] = duplicateCharMap[answerChar] || {
            isUsedForAnswer: false // set true if hitListChar is + or -
        }
        // set false to the UsedFlag.
        switch (hitChar) {
            case '.':
                // set false because this character is not used for answer.
                usedMap.isCandidate = false;
                break;
            case '-':
                // set false to candidatePosition index i.
                usedMap.candidatePosition[i] = false;
                duplicateCharMap[answerChar].isUsedForAnswer = true;

                break;
            case '+':
                correctAnswerArr[i] = answerChar
                duplicateCharMap[answerChar].isUsedForAnswer = true;
                break;
        }
    }
    console.log("---", charUsedMap)
    for (let key in duplicateCharMap) {
        console.log("----", key, charUsedMap[key])
        charUsedMap[key].isCandidate = duplicateCharMap[key].isUsedForAnswer;
    }
    console.debug(charUsedMap);
    console.log(correctAnswerArr)
}

async function main() {
    for (let i = 1; i <= 6; i++) {
        let isValid = false
        while (!isValid) {
            const ans = await ask(`TRY ${i}: please input your answer.\nanswer: `);
            if (!checkStrLength(ans)) {
                console.log("Answer validation failed. answer length should be 5.")
                continue;
            }
            // TODO 文字列がアルファベットのみ(a-z)を使っているかをチェック
            
            // wordleからの答えを入力
            const hitList = await ask(`Please input hit list. +-. e.g ANSWER(diary). YOUR_INPUT(dieyl) -> input ++.-.`);
            console.log(checkAnswerList(hitList))
            if (!checkAnswerList(hitList)) {
                console.error(`[checkAnswerList] hitList is invalid. ${hitList}`);
                continue;
            }
            // TODO 文字列がアルファベットのみ(a-z)を使っているかをチェック

            setCharUsedMap(ans, hitList, charUsedMap, correctAnswerArr);
            console.log()
            // 検索条件
            const grepConditionStr = makeGrepCondition(ans, hitList);
            // TODO 辞書を検索
            const candidateWordList = getCandidatesWords(grepConditionStr, charUsedMap, correctAnswerArr);
            console.log(`words: ${candidateWordList}`);


            isValid = true;
        }
        console.log("----finish: ", i);
        // TODO Showing output.
    
    }
}
main()
