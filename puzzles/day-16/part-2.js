const InputReader = require('../../helpers/input-reader')

function parseRule (rule) {
  const [name, validations] = rule.split(': ')
  const ranges = validations.split(' or ').map((validation) => {
    const [min, max] = validation.split('-')

    return {
      min: parseInt(min),
      max: parseInt(max)
    }
  })

  return {
    name,
    ranges
  }
}

function parseTicket (ticket) {
  return ticket.split(',').map((v) => parseInt(v))
}

function parseNotes (notes) {
  const parsedNotes = {
    rules: {},
    myTicket: [],
    nearbyTickets: []
  }

  let currentParse = 'rules'

  for (let i = 0; i < notes.length; i++) {
    if (notes[i] === '') {
      continue
    }

    if (notes[i] === 'your ticket:') {
      currentParse = 'myTicket'
      continue
    }

    if (notes[i] === 'nearby tickets:') {
      currentParse = 'nearbyTickets'
      continue
    }

    if (currentParse === 'rules') {
      const parsedRule = parseRule(notes[i])

      parsedNotes.rules[parsedRule.name] = parsedRule.ranges
    } else if (currentParse === 'myTicket') {
      const parsedTicket = parseTicket(notes[i])

      parsedNotes.myTicket = parsedTicket
    } else if (currentParse === 'nearbyTickets') {
      const parsedTicket = parseTicket(notes[i])

      parsedNotes.nearbyTickets.push(parsedTicket)
    }
  }

  return parsedNotes
}

function isValidField (rules, field) {
  for (const fieldRule in rules) {
    for (const rule of rules[fieldRule]) {
      if (field >= rule.min && field <= rule.max) {
        return true
      }
    }
  }

  return false
}

function getInvalidFieldsRate (rules, ticket) {
  const invalidFields = []

  ticket.forEach((field) => {
    if (!isValidField(rules, field)) {
      invalidFields.push(field)
    }
  })

  return invalidFields.reduce((acc, cur) => {
    return acc + cur
  }, 0)
}

function getInvalidTicketsRate (notes) {
  const { rules, nearbyTickets } = parseNotes(notes)

  return nearbyTickets.reduce((acc, cur) => {
    return acc + getInvalidFieldsRate(rules, cur)
  }, 0)
}

const input = InputReader.getDayReader('16').read()

console.log(getInvalidTicketsRate(input))
