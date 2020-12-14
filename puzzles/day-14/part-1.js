const InputReader = require('../../helpers/input-reader')

function toBinary (val) {
  return val.toString(2)
}

function maskValue (value, mask) {
  if (mask === 'X') {
    return value
  }

  return mask
}

function writeMemValue (memory, mask, value) {
  const newMemory = memory.slice()
  const binaryValue = toBinary(value)

  // copy mask until first passed value bit
  for (let i = 0; i < mask.length - binaryValue.length; i++) {
    newMemory[i] = maskValue(memory[i], mask[i])
  }

  // copy passed value bits
  for (let i = mask.length - binaryValue.length; i < mask.length; i++) {
    newMemory[i] = maskValue(binaryValue[i - mask.length + binaryValue.length], mask[i])
  }

  return newMemory
}

function sumMemoryValues (values) {
  return Object.values(values).reduce((acc, cur) => {
    const decimalValue = parseInt(cur.join(''), 2)

    return acc + decimalValue
  }, 0)
}

function parseInstruction (instruction) {
  const instructionRegex = new RegExp('((\\w+)(\\[(\\d+)\\])?) = (.*)')
  const match = instruction.match(instructionRegex)

  if (match[1] === 'mask') {
    return [match[1], null, match[5]]
  }

  return [match[2], parseInt(match[4]), parseInt(match[5])]
}

function getDockingData (instructions) {
  let currentMask = null
  const memoryValues = {}

  instructions.forEach((instruction, i) => {
    const [command, argument, value] = parseInstruction(instruction)

    if (command === 'mask') {
      // create new mask
      currentMask = value
    } else {
      const zero = Array.from({ length: currentMask.length }, () => '0')

      memoryValues[argument] = writeMemValue(zero, currentMask, value)
    }
  })

  return sumMemoryValues(memoryValues)
}

const input = InputReader.getDayReader('14').read()

console.log(getDockingData(input))
