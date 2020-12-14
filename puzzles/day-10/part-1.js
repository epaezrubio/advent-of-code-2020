const InputReader = require('../../helpers/input-reader')

function getJoltageIncrementsProduct (joltages) {
  const sortedJoltages = [...joltages].sort((a, b) => a - b)
  const increments = {
    1: 0,
    3: 0
  }

  // manually include last adapter with +3 joltage
  sortedJoltages.push(sortedJoltages[sortedJoltages.length - 1] + 3)

  sortedJoltages.forEach((val, i) => {
    const difference = val - (sortedJoltages[i - 1] || 0)
    increments[`${difference}`] = increments[`${difference}`] + 1
  })

  return increments[1] * increments[3]
}

const input = InputReader.getDayReader('10').read((n) => parseInt(n))

console.log(getJoltageIncrementsProduct(input))
