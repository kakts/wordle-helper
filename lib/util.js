const CHAR_SMALL_A = 97;
const CHAR_SMALL_Z = 122;

module.exports.initializeCharUsedMap = function() {
    const charUsedMap = {}
    for (let i = CHAR_SMALL_A; i <= CHAR_SMALL_Z; i++) {
        const char = String.fromCharCode(i);
        charUsedMap[char] = {
            isCandidate: true, // If character was not used for answer, set false.
            candidatePosition: [true, true, true, true, true]
        }
    }
    return charUsedMap
}


