const InputReader = require('../../helpers/input-reader')

function getCell (seats, x, y) {
  // check if it's out of bounds
  if (x < 0 || y < 0 || x >= seats[0].length || y >= seats.length) {
    return null
  }

  return seats[y][x]
}

function countSurroundingCells (seats, x, y) {
  const surroundingCounters = {
    L: 0,
    '#': 0,
    '.': 0
  }

  // loop the slice of the matrix of surrounding cells
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // skip self
      if (i === 0 && j === 0) {
        continue
      }

      const neighbourCell = getCell(seats, x + j, y + i)

      if (!neighbourCell) {
        continue
      }

      surroundingCounters[neighbourCell] = surroundingCounters[neighbourCell] + 1
    }
  }

  return surroundingCounters
}

function getNextSeatIteration (seats) {
  const newSeats = []

  seats.forEach((row, j) => {
    const seatsList = row.split('')
    const newSeatsRow = []

    seatsList.forEach((seat, i) => {
      let newState = seat

      if (seat === '.') {
        newState = '.'
      } else {
        const surroundingSeatsCounts = countSurroundingCells(seats, i, j)

        if (seat === 'L' && surroundingSeatsCounts['#'] === 0) {
          newState = '#'
        } else if (seat === '#' && surroundingSeatsCounts['#'] >= 4) {
          newState = 'L'
        }
      }

      newSeatsRow.push(newState)
    })

    newSeats.push(newSeatsRow.join(''))
  })

  return newSeats
}

function isUnchangedState (oldState, newState) {
  return JSON.stringify(oldState) === JSON.stringify(newState)
}

function getOccupiedSeatsChangesIterations (seats) {
  let lastState = null
  let newState = seats
  let iterations = 0

  do {
    lastState = newState
    newState = getNextSeatIteration(lastState)
    iterations = iterations + 1
  } while (iterations < 200 && !isUnchangedState(lastState, newState))

  // count occupied seats
  return newState.reduce((acc, cur) => {
    return acc + cur.split('').reduce((acc2, cur2) => {
      if (cur2 === '#') {
        return acc2 + 1
      }

      return acc2
    }, 0)
  }, 0)
}

const input = InputReader.getDayReader('11').read()

console.log(getOccupiedSeatsChangesIterations(input))
