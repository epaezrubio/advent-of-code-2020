const InputReader = require('../../helpers/input-reader')

const orientations = 'ESWN'
const translationComponents = {
  E: { x: 1, y: 0 },
  N: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
  S: { x: 0, y: 1 }
}

function transposeOrientation (current, direction, rotation) {
  const directionIncement = (direction === 'R' ? 1 : -1) * rotation / 90
  const nextDirection = orientations.indexOf(current) + directionIncement

  return orientations[(nextDirection + orientations.length) % orientations.length]
}

function getShipTravelDistance (instructions) {
  let x = 0
  let y = 0
  let orientation = 'E'

  instructions.forEach(([instruction, value]) => {
    if (instruction === 'L' || instruction === 'R') {
      // rotation
      orientation = transposeOrientation(orientation, instruction, value)
      return
    }

    let xIncrement = 0
    let yIncrement = 0

    if (instruction === 'F') {
      // forward translation
      const increment = translationComponents[orientation]

      xIncrement = increment.x * value
      yIncrement = increment.y * value
    } else {
      // polar translation
      xIncrement = translationComponents[instruction].x * value
      yIncrement = translationComponents[instruction].y * value
    }

    x = x + xIncrement
    y = y + yIncrement
  })

  return x + y
}

const input = InputReader.getDayReader('12').read((instruction) => {
  return [instruction[0], parseInt(instruction.substring(1))]
})

console.log(getShipTravelDistance(input))
