/**
 * Answer checker for wordle
 */
const {WORD_LENGTH} = require('./const/const.js');

const answerListCharSet = new Set(['+', '-', '.']);

/**
 * 答えの文字列の長さをチェック
 */
function checkStrLength(str) {
    return str.length === WORD_LENGTH;
}

/**
 * 正解リストが正しいものか判定します。
 */
function checkAnswerList(answerList) {
    if (!checkStrLength(answerList)) {
        return false;
    }
    for (let i = 0; i < answerList.length; i++) {
        if (!answerListCharSet.has(answerList[i])) {
            return false;
        }
    }
    return true;
}

/**
 * wordleの答えの文字列が指定した文字数か判定する
 * @return true 正しい文字列の場合
 */
module.exports = {
    checkStrLength,
    checkAnswerList
}