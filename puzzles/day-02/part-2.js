const InputReader = require('../../helpers/input-reader')

function isValidPassword (requiredLetter, min, max, password) {
  return (password[min - 1] === requiredLetter || password[max - 1] === requiredLetter) &&
    !(password[min - 1] === requiredLetter && password[max - 1] === requiredLetter)
}

function countValidPasswords (input) {
  return input.reduce((acc, [letter, min, max, password]) => {
    if (isValidPassword(letter, min, max, password)) {
      return acc + 1
    }

    return acc
  }, 0)
}

const input = InputReader.getDayReader('2').read((val) => {
  const [range, letter, password] = val.split(' ')
  const [min, max] = range.split('-')

  return [letter[0], parseInt(min), parseInt(max), password]
})

console.log(countValidPasswords(input))
