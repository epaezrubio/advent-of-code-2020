const InputReader = require('../../helpers/input-reader')

function getBusWaitingTimeScore ([departure, busIds]) {
  let minWaitingTime = Infinity
  let minWaitingBusId = null

  busIds.forEach((busId) => {
    const lastDeparture = (departure / busId) >> 0
    const nextDeparture = (lastDeparture + 1) * busId
    const waitingTime = nextDeparture - departure

    if (waitingTime < minWaitingTime) {
      minWaitingTime = waitingTime
      minWaitingBusId = busId
    }
  })

  return minWaitingTime * minWaitingBusId
}

const input = InputReader.getDayReader('13').read((val, i) => {
  if (i === 0) {
    return parseInt(val)
  }

  // remove bus ids 'x' and use integers
  return val.split(',').filter((id) => {
    return id !== 'x'
  }).map((id) => {
    return parseInt(id)
  })
})

console.log(getBusWaitingTimeScore(input))
