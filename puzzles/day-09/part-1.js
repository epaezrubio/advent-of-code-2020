const InputReader = require('../../helpers/input-reader');

function isSumOfTwo (preamble, target) {
    const inverseAdditionMap = {}

    for (let i = 0; i < preamble.length; i++) {
        let n = preamble[i]

        if (inverseAdditionMap[n]) {
            return true
        }

        // check for number duplication
        if (target / 2 === n) {
            continue
        }

        // Add the pre-calculated matching number to the map
        inverseAdditionMap[target - n] = n
    }

    return false
}

function findWeakNumber (numbers, preambleLength) {
    let preambleStart = 0
    let currentNumber;

    do {
        currentNumber = numbers[preambleStart + preambleLength]
        preamble = numbers.slice(preambleStart, preambleStart + preambleLength)

        preambleStart = preambleStart + 1
    } while (isSumOfTwo(preamble, currentNumber))

    return currentNumber
}

const PREAMBLE_LENGTH = 25
const input = InputReader.getDayReader('9').read((n) => parseInt(n))

console.log(findWeakNumber(input, PREAMBLE_LENGTH))