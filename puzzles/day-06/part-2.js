const InputReader = require('../../helpers/input-reader')

function getAnswerCount (answers) {
  let answerCount = 0
  let currentAnswerGroup = {}
  let currentGroupCount = 0

  for (let i = 0; i < answers.length; i++) {
    // end of credential fields or EOF
    if (answers[i] === '') {
      Object.values(currentAnswerGroup).forEach((count) => {
        if (count === currentGroupCount) {
          answerCount = answerCount + 1
        }
      })

      currentAnswerGroup = {}
      currentGroupCount = 0
      continue
    }

    currentGroupCount = currentGroupCount + 1

    for (let j = 0; j < answers[i].length; j++) {
      currentAnswerGroup[answers[i][j]] = currentAnswerGroup[answers[i][j]] ? currentAnswerGroup[answers[i][j]] + 1 : 1
    }
  }

  return answerCount
}

const input = InputReader.getDayReader('6').read()

console.log(getAnswerCount(input))
