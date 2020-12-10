const InputReader = require('../../helpers/input-reader');

function getJoltageIncrementsProduct (joltages) {
    let sortedJoltages = [...joltages].sort((a, b) => a - b)
    let increments = {
        '1': 0,
        '3': 0
    }

    // manually include last adapter with +3 joltage
    sortedJoltages.push(sortedJoltages[sortedJoltages.length - 1] + 3)

    sortedJoltages.forEach((val, i) => {
        let difference = val - (sortedJoltages[i - 1] || 0)
        increments[`${difference}`] = increments[`${difference}`] + 1
    })

    return increments[1] * increments[3]
}

const input = InputReader.getDayReader('10').read((n) => parseInt(n))

console.log(getJoltageIncrementsProduct(input))