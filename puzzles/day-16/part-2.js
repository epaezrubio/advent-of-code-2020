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

function isValidRuleRange (range, field) {
  return field >= range.min && field <= range.max
}

function isValidRule (rule, field) {
  for (const range of rule) {
    if (isValidRuleRange(range, field)) {
      return true
    }
  }
}

function isValidField (rules, field) {
  for (const fieldRule in rules) {
    if (isValidRule(rules[fieldRule], field)) {
      return true
    }
  }

  return false
}

function getValidTickets (rules, tickets) {
  return tickets.filter((ticket) => {
    for (let i = 0; i < ticket.length; i++) {
      if (!isValidField(rules, ticket[i])) {
        return false
      }
    }

    return true
  })
}

function getRulesIndexes (rules, length) {
  // get an array of booleans that represents in which indexes this rule is valid
  const indexes = Array.from({ length }, (v, n) => true)
  const rulesIndexes = {}

  for (const rule in rules) {
    rulesIndexes[rule] = indexes.slice()
  }

  return rulesIndexes
}

function computeValidRulesIndexes (rules, rulesIndexes, tickets) {
  // iterate over each ticket
  tickets.forEach((ticket) => {
    // iterate over each field
    ticket.forEach((field, n) => {
      // check if field is valid for each rule
      for (const ruleKey in rules) {
        // if it's invalid, mark it as invalid
        if (!isValidRule(rules[ruleKey], field)) {
          rulesIndexes[ruleKey][n] = false
        }
      }
    })
  })

  return rulesIndexes
}

function recursiveDeduceRulesIndexes (rulesIndexes) {
  let needsFurtherDeduction = false

  for (const ruleKey in rulesIndexes) {
    // find for how many fields this rule is valid
    const validIndexes = rulesIndexes[ruleKey].reduce((acc, cur) => {
      return acc + cur
    }, 0)

    // valid only for 1 rule, set the rest to false
    if (validIndexes === 1) {
      const validIndexPosition = rulesIndexes[ruleKey].indexOf(true)

      for (const invalidRuleKey in rulesIndexes) {
        // dont set itself to invalid
        if (invalidRuleKey === ruleKey) {
          continue
        }

        rulesIndexes[invalidRuleKey][validIndexPosition] = false
      }
    } else {
      needsFurtherDeduction = true
    }
  }

  if (needsFurtherDeduction) {
    recursiveDeduceRulesIndexes(rulesIndexes)
  }

  return rulesIndexes
}

function getValidTicketsCalculation (notes) {
  const { rules, myTicket, nearbyTickets } = parseNotes(notes)

  const validTickets = getValidTickets(rules, nearbyTickets)
  const rulesIndexes = getRulesIndexes(rules, validTickets[0].length)
  const validRulesIndexes = computeValidRulesIndexes(rules, rulesIndexes, validTickets)
  const deducedValidRules = recursiveDeduceRulesIndexes(validRulesIndexes)

  return Object.entries(deducedValidRules).reduce((acc, [key, validRules]) => {
    if (!key.startsWith('departure')) {
      return acc
    }

    const validRuleIndex = validRules.indexOf(true)

    return acc * myTicket[validRuleIndex]
  }, 1)
}

const input = InputReader.getDayReader('16').read()

console.log(getValidTicketsCalculation(input))
