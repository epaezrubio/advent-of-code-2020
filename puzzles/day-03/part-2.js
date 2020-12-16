const InputReader = require('../../helpers/input-reader')

function countTreeEncounters (right, bottom, treeGrid) {
  const treeEncounters = bottom.map(() => 0)

  for (let i = 0; i < treeGrid.length; i++) {
    for (let j = 0; j < bottom.length; j++) {
      if (i % bottom[j] === 0) {
        const rightModulo = (right[j] * i / bottom[j]) % treeGrid[i].length

        if (treeGrid[i][rightModulo] === '#') {
          treeEncounters[j] = treeEncounters[j] + 1
        }
      }
    }
  }

  return treeEncounters.reduce((acc, cur) => {
    return acc * cur
  }, 1)
}

const RIGHT = [1, 3, 5, 7, 1]
const BOTTOM = [1, 1, 1, 1, 2]
const input = InputReader.getDayReader('3').read()

console.log(countTreeEncounters(RIGHT, BOTTOM, input))
