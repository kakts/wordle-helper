const assert = require('power-assert')

const {checkAnswerList, checkStrLength} = require('../lib/checker')

describe('checkStrLength', function() {
    it("should true when answer.length equal 5", () => {
        const answer = 'dummy'
        assert.ok(answer.length === 5);
        const result = checkStrLength(answer)
        assert.equal(result, true)
    });

    it("should false when answer.length not equal 5", () => {
        const answer = 'dummya'
        assert.notEqual(answer.length, 5);

        const result = checkStrLength(answer)
        assert.equal(result, false);
    })
})

describe('checkAnswerList', function() {
    it("should return true if passed +++++", () => {
        const answerList = '+++++'
        const result = checkAnswerList(answerList)
        assert.equal(result, true)
    });

    it("should return true if passed -----", () => {
        const answerList = '-----'
        const result = checkAnswerList(answerList)
        assert.equal(result, true)
    });

    it("should return true if passed .....", () => {
        const answerList = '.....'
        const result = checkAnswerList(answerList)
        assert.equal(result, true)
    });

    it("should return true if passed .+-+.", () => {
        const answerList = '.+-+.'
        const result = checkAnswerList(answerList)
        assert.equal(result, true)
    });

    it("should false if answerList.length is not 5", () => {
        const answerList = '-----+' // 6 characters
        const result = checkAnswerList(answerList)
        assert.equal(result, false)
    });

    it("should false if passed alphabet character", () => {
        const answerList = '++-a.';
        const result = checkAnswerList(answerList)
        assert.equal(result, false)
    });

})