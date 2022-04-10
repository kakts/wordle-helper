'use strict';
const { execSync } = require('child_process');


function makeGrepCondition(answer, hitList) {
    let grepConditionStr = '';
    for (let i = 0, len = hitList.length; i < len; i++) {
        if (hitList[i] === '+') {
            grepConditionStr += answer[i];
        } else {
            grepConditionStr += '.'
        }
    }
    console.log(`grepConditionStr is : ${grepConditionStr}`);
    return grepConditionStr
}

/**
 * search words from dicionary and select candidates words.
 */
function getCandidatesWords(condition, charUsedMap) {
    const execStr = `cat /usr/share/dict/words | grep ${condition} | awk '{ if(length($0) == 5) print $0}'`
    console.debug(`exec: ${execStr}`)

    const execResult = execSync(execStr).toString();
    const resultWordsList = execResult.split(/\n/);
    console.log("---candidate.length", resultWordsList.length);

    const candidateWords = [];
    // remove words using wrong character.
    for (let i = 0, len = resultWordsList.length; i < len; i++) {
        const word = resultWordsList[i];
        let isCandidateWord = true
        for (let j = 0, wordLen = word.length; j < wordLen; j++) {
            const char = word[j];
            if (!charUsedMap[char]) {
                console.log(`removed: ${word}`)
                // if wrong character is used, the word is removed from candidate list.
                isCandidateWord = false
                break;
            }
        }
        if (isCandidateWord) {
            candidateWords.push(word)
        }
    }

    // For MacOS
    return candidateWords;
}

module.exports = {
    makeGrepCondition,
    getCandidatesWords
};