const InputReader = require('../../helpers/input-reader')

function rangeValidator (min, max) {
  return (val) => {
    const nVal = parseInt(val)
    return !isNaN(nVal) && nVal >= min && nVal <= max
  }
}

function choiceValidator (values) {
  return (val) => {
    return values.includes(val)
  }
}

function regexValidator (regex) {
  return (val) => {
    return val.match(regex) !== null
  }
}

function unitValidator (units) {
  const valueRegex = /(\d+)(cm|in)/
  const unitValidators = Object.fromEntries(Object.entries(units).map(([unit, [min, max]]) => {
    return [unit, rangeValidator(min, max)]
  }))

  return (val) => {
    const match = val.match(valueRegex)

    if (match) {
      return unitValidators[match[2]](parseInt(match[1]))
    }
  }
}

const validators = {
  byr: rangeValidator(1920, 2002),
  iyr: rangeValidator(2010, 2020),
  eyr: rangeValidator(2020, 2030),
  hgt: unitValidator({ cm: [150, 193], in: [59, 76] }),
  hcl: regexValidator(/^#[0-9a-f]{6}$/),
  ecl: choiceValidator(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']),
  pid: regexValidator(/^\d{9}$/)
}

function isValidCredential (requiredFields, credential) {
  // returns false if any required field is not a key in credential or the validation fails
  return !requiredFields.some((field) => {
    return !(field in credential && validators[field](credential[field]))
  })
}

function countValidCredentials (requiredFields, credentials) {
  let validCredentials = 0
  let currentCredential = {}

  for (let i = 0; i < credentials.length; i++) {
    // end of credential fields or EOF
    if (credentials[i] === '') {
      if (isValidCredential(requiredFields, currentCredential)) {
        validCredentials = validCredentials + 1
      }

      currentCredential = {}
      continue
    }

    credentials[i].split(' ').forEach((field) => {
      const [key, value] = field.split(':')

      currentCredential[key] = value
    })
  }

  return validCredentials
}

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const input = InputReader.getDayReader('4').read()

console.log(countValidCredentials(REQUIRED_FIELDS, input))
