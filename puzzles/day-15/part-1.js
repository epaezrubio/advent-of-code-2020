const InputReader = require('../../helpers/input-reader')

function getNumberPrediction ([initialNumbers], n) {
  const numberTurnsMap = {}

  initialNumbers.forEach((number, i) => {
    numberTurnsMap[number] = [i + 1]
  })

  const currentTurn = initialNumbers.length
  let lastNumber = initialNumbers[initialNumbers.length - 1]

  for (let i = currentTurn; i < n; i++) {
    let newNumber

    if (lastNumber in numberTurnsMap && numberTurnsMap[lastNumber].length > 1) {
      newNumber = numberTurnsMap[lastNumber][0] - numberTurnsMap[lastNumber][1]
    } else {
      newNumber = 0
    }

    numberTurnsMap[newNumber] = numberTurnsMap[newNumber] || []
    numberTurnsMap[newNumber].unshift(i + 1)

    lastNumber = newNumber
  }

  return lastNumber
}

const PREDICTION_NUMBER = 2020
const input = InputReader.getDayReader('15').read((n) => n.split(',').map(m => parseInt(m)))

console.log(getNumberPrediction(input, PREDICTION_NUMBER))
