const InputReader = require('../../helpers/input-reader')

function getAddingTripeMultiplication (target, input = []) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === target) {
          return input[i] * input[j] * input[k]
        }
      }
    }
  }
}

const TARGET = 2020
const input = InputReader.getDayReader('1').read(parseInt)

console.log(getAddingTripeMultiplication(TARGET, input))
