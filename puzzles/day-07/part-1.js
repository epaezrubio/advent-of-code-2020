const InputReader = require('../../helpers/input-reader')

function getOrSet (object, key) {
  if (!(key in object)) {
    object[key] = new Set()
  }

  return object[key]
}

function parseRule (rule) {
  const objectRegex = new RegExp('\\d+ (\\w+ \\w+) bags?')
  const [subject, object] = rule.split(' contain ')

  const color = subject.substring(0, subject.length - 5) // removes 'bags' at the end
  const objects = object.substring(0, object.length - 1).split(', ') // removes trailing dot and split by comma
  const children = new Set()

  // extract color key for each bag after 'contain'
  objects.forEach((object) => {
    const match = object.match(objectRegex)

    if (match && match[1]) {
      children.add(match[1])
    }
  })

  return {
    color,
    children
  }
}

function getBagDependencies (bag, dependenciesSet) {
  bag.forEach((dependency) => {
    dependenciesSet.add(dependency)

    getBagDependencies(dependency, dependenciesSet)
  })

  return dependenciesSet
}

function getDistinctOutermostBags (target, rules) {
  const bagDependencies = {}

  rules.forEach((rule) => {
    const parsedRule = parseRule(rule)
    const colorSet = getOrSet(bagDependencies, parsedRule.color)

    parsedRule.children.forEach((child) => {
      getOrSet(bagDependencies, child).add(colorSet)
    })
  })

  return getBagDependencies(bagDependencies[target], new Set()).size
}

const TARGET = 'shiny gold'
const input = InputReader.getDayReader('7').read()

console.log(getDistinctOutermostBags(TARGET, input))
