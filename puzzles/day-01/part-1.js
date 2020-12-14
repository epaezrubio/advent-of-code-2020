const InputReader = require('../../helpers/input-reader')

function getAddingTupleMultiplication (target, input = []) {
  const inverseAdditionMap = {}

  for (let i = 0; i < input.length; i++) {
    const n = input[i]

    if (inverseAdditionMap[n]) {
      return n * inverseAdditionMap[n]
    }

    // Add the pre-calculated matching number to the map
    inverseAdditionMap[TARGET - n] = n
  }
}

const TARGET = 2020
const input = InputReader.getDayReader('1').read(parseInt)

console.log(getAddingTupleMultiplication(TARGET, input))
