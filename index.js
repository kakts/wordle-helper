const readline = require('readline');
const { stdin, stdout} = require('process');

const util = require('./lib/util');
const {checkStrLength, checkAnswerList} = require('./lib/checker');

const { exec } = require('child_process');

let tryCount = 0;

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

function getCandidatesWords(condition) {
    const execStr = `cat /usr/share/dict/words | grep ${condition} | awk '{ if(length($0) == 5) print $0}'`
    console.log(`exec: ${execStr}`)
    // For MacOS
    exec(execStr, (err, stdout, stderr) => {
        if (err) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        return stdout
    });
}

async function main() {
    for (let i = 1; i <= 5; i++) {
        let isValid = false
        while (!isValid) {
            const ans = await ask(`TRY ${i}: please input your answer.`);
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
                contiune;
            }
            // TODO 文字列がアルファベットのみ(a-z)を使っているかをチェック

            // 検索条件
            const grepConditionStr = makeGrepCondition(ans, hitList);
            // TODO 辞書を検索
            const a = getCandidatesWords(grepConditionStr);
            console.log(a);

            isValid = true;
        }
        console.log("----finish: ", i);
        // 完了後、結果を表示させる
    
    }
}
main()
