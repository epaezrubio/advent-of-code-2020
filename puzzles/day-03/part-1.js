const InputReader = require('../../helpers/input-reader')

function countTreeEncounters (right, bottom, treeGrid) {
  let treeEncounters = 0

  for (let i = 0; i < treeGrid.length; i = i + bottom) {
    const rightModulo = (right * i) % treeGrid[i].length

    if (treeGrid[i][rightModulo] === '#') {
      treeEncounters = treeEncounters + 1
    }
  }

  return treeEncounters
}

const RIGHT = 3
const BOTTOM = 1
const input = InputReader.getDayReader('3').read()

console.log(countTreeEncounters(RIGHT, BOTTOM, input))
